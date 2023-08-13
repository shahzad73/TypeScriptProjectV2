import express, { Request, Response } from "express";
import { getConnection, getManager } from "typeorm"; 
import {validate} from "class-validator";
import {users} from "../../entity/users";
import {country} from "../../entity/country";
import {contacts_types} from "../../entity/contact_types";
import {user_contacts} from "../../entity/user_contacts";
import {addresses} from "../../entity/addresses";
import { findMany } from "../../core/mysql";
import { update } from "../../core/mysql";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { s3UploadFile } from '../../common/s3';
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import { deleteFileFromuploadedLocation } from '../../common/commons';
import { documents } from "../../entity/documents";
import Public_Enums_Constants from "../../common/Public_Enums_Constants";

const uploadFile = require("../../common/fileupload");

export const bckendDataRouter = express.Router();





bckendDataRouter.get("/getProfilePersonal", async (req: Request, res: Response) => {
    res.json(  await getUsrProfile(req.userid)  );
});

bckendDataRouter.post("/setProfile", async (req: Request, res: Response) => {

    const manager = getManager();
    const newUpdates = manager.create(users, req.body);    
    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        await getConnection()
        .createQueryBuilder()
        .update(users)
        .set(req.body)
        .where("id = :id", { id: req.userid })
        .execute();

        res.json(  await getUsrProfile(req.userid)  );
    }

});


bckendDataRouter.post("/updateProfileImage", async (req: Request, res: Response) => {

    await getConnection()
    .createQueryBuilder()
    .update(users)
    .set({ "pic": req.body.pic })
    .where("id = :id", { id: req.userid })
    .execute();

    res.json(  {status: 1}  );

});



bckendDataRouter.get("/getProfileContacts", async (req: Request, res: Response) => {
    res.json( await getUserContacts(req.userid) )
});

bckendDataRouter.post("/addContact", async (req: Request, res: Response) => {
    req.body.userid = req.userid;

    const manager = getManager();
    const newUpdates = manager.create(user_contacts, req.body);    

    const errors = await validate(newUpdates);

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        await user_contacts.insert ( newUpdates );
        const usr = await getUserContacts(req.userid);
        res.json(  usr  ); 
    }
});

bckendDataRouter.post("/editContact", async (req: Request, res: Response) => {
    const id = req.body.id;
    delete req.body.id;
    delete req.body.userid;

    const manager = getManager();
    const newUpdates = manager.create(user_contacts, req.body);    

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        await getConnection()
        .createQueryBuilder()
        .update(user_contacts)
        .set(req.body)
        .where("id = :id and userid = :userid", {  id: id,  userid: req.userid })
        .execute();

        res.json(  await getUserContacts(req.userid)  ); 
    }
});


bckendDataRouter.get("/getContactRecord", async (req: Request, res: Response) => {

    const id: number = parseInt(req.query.id as string, 10);

    if (isNaN(id)) {
        // Handle the case when 'id' is not present or not a valid number
        res.status(400).json({ error: 'Invalid or missing id' });
        return;
    }

    const data = await user_contacts.findOne ({where: {
        id: id,
        userid: req.userid
    }});

    res.json( data );

});

bckendDataRouter.post("/deleteContact", async (req: Request, res: Response) => {
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(user_contacts)
    .where("id = :id and userid = :userid", { id: req.body.id, userid: req.userid })
    .execute();

    const usr = await getUserContacts(req.userid);
    res.json(  usr  );
});




bckendDataRouter.get("/getProfileAddress", async (req: Request, res: Response) => {
    var recordID: number = 0;

    if(req.query.recordID == "-1")
        recordID = req.userid;
    else 
        recordID = parseInt(req.query.recordID as string, 10);
    
    const usr = await getUserAddresses(recordID, req.query.type as string);

    res.json(  usr  );
});

bckendDataRouter.post("/deleteAddress", async (req: Request, res: Response) => {
    var recordID = 0;
    if(req.body.recordID == "-1")
        recordID = req.userid;
    else
        recordID = req.body.recordID;

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(addresses)
    .where("id = :id and recordID = :recordID", { id: req.body.id, recordID: recordID })
    .execute();

    const usr = await getUserAddresses(recordID, req.body.type as string);
    res.json(  usr  );
});

bckendDataRouter.get("/getAddressRecord", async (req: Request, res: Response) => {
    const id: number = parseInt(req.query.id as string, 10);

    const data = await addresses.findOne ({where: {
        id: id
    }});

    res.json( data );
});

bckendDataRouter.post("/editAddress", async (req: Request, res: Response) => {
    const id = req.body.id;
    delete req.body.id;
    delete req.body.userid;

    var recordID = 0;
    if(req.body.recordID == "-1")
        recordID = req.userid;
    else
        recordID = req.body.recordID;

    delete( req.body.recordID );

    const manager = getManager();
    const newUpdates = manager.create(addresses, req.body);    

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        await getConnection()
        .createQueryBuilder()
        .update(addresses)
        .set(req.body)
        .where("id = :id", {  id: id })
        .execute();

        res.json(  await getUserAddresses(recordID, req.body.type as string)  ); 
    }
})

bckendDataRouter.post("/addAddress", async (req: Request, res: Response) => {

    var recordID = 0;
    if(req.body.recordID == "-1")
        recordID = req.userid;
    else
        recordID = req.body.recordID;

    // recordID indicates user id or company id etc.
    req.body.recordID = recordID;

    const manager = getManager();
    const newUpdates = manager.create(addresses, req.body);    

    const errors = await validate(newUpdates);

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        const data = await addresses.insert ( newUpdates );
        const usr = await getUserAddresses(recordID, req.body.type as string);
        res.json(  usr  ); 
    }
});


// ............... Files management 
bckendDataRouter.post("/uploadfile", async (req: Request, res: Response) => {
    try {
        await uploadFile(req, res);

        //if (req.file == undefined) 
        //    return res.status(400).send({ message: "Please upload a file!" });

        const filname = uuidv4() + path.extname( req.file.originalname );

        fs.rename(__dirname + "/../../uploads/" + req.file.originalname, __dirname + "/../../uploads/" + filname, async function(err) {

            if(req.query.destination == "Server_Public_Folder") {
                fs.rename(__dirname + "/../../uploads/" + filname, __dirname + "/../../../public/files/" + filname, function(err) {
                    console.log("file in internal puvlic");
                    res.send({'status': 1, fileName: filname});
                });
            }  

            if(req.query.destination == "AWS_Bucket_Public" || req.query.destination == "AWS_Bucker_Private") {
                // var newPath:String = await uploadFile(req.body.fileName, __dirname + "/../../uploads");
                try {
                    var bucket = "";
                    if(req.query.destination == "AWS_Bucket_Public")
                        bucket = "inftmaker";
                    if(req.query.destination == "AWS_Bucker_Private")                    
                        bucket = "inftmakerprivate"

                    const newPath = await s3UploadFile(filname, __dirname + "/../../uploads", bucket);

                    fs.unlink(__dirname + "/../../uploads/" + filname, async function() {
                        res.send({'status': 1, fileName: filname});
                    })    
                } catch (e:any) {
                    console.log("failed to upload files to s3")
                    res.send({'status': 0});
                }
            }

            if(req.query.destination == "IPFS_Server") {
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2QjdjRDgxNTRlNkI2REI1ZDZFMjQ4N2EwNGZGNzM3NTNiYUE1MjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU0NDY5NzIxNDksIm5hbWUiOiJJTkZUTWFrZXIifQ.4nvG3j2ebgjpJkMe_23j1nebw0oElxF2ajFxQo418uE";
                const client = new Web3Storage({ token })
                
                const files = await getFilesFromPath(__dirname + "/../../uploads/" + filname)
                const cid = await client.put(files)

                fs.unlink(__dirname + "/../../uploads/" + filname, async function() {
                    res.send({'status': 1, fileName: filname});
                })
            }

        });

    } catch (err: any) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
});


bckendDataRouter.get("/getDocuments", async (req: Request, res: Response) => {
    res.json( await getDocuments(req.query.recordID as string, req.query.type as string, req.userid) );    
});

bckendDataRouter.post("/saveDocument", async (req: Request, res: Response) => {
    const manager = getManager();
    const newUpdates = manager.create(documents, req.body);    

    if( req.body.type == Public_Enums_Constants.DOCUMENT_TYPES.Profile_Document ) 
        newUpdates.recordID = req.userid;

    const errors = await validate(newUpdates);

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        const data = await documents.insert ( newUpdates );
        res.json( await getDocuments(req.body.recordID as string, req.body.type as string, req.userid) );
    }

});

bckendDataRouter.post("/updateDocument", async (req: Request, res: Response) => {
    const data = {
        title: "",
        description: ""
    };
    data.title = req.body.title;
    data.description = req.body.description;

    if( req.body.type == Public_Enums_Constants.DOCUMENT_TYPES.Profile_Document )
        req.body.recordID = req.userid;

    const manager = getManager();
    const newUpdates = manager.create(documents, data);

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {    
        await getConnection()
        .createQueryBuilder()
        .update(documents)
        .set(data)
        .where("id = :id and recordID = :recordID", { id: req.body.id,  recordID: req.body.recordID })
        .execute();

        res.json(  await getDocuments(req.body.recordID as string, req.body.type as string, req.userid)  ); 
    }
});

bckendDataRouter.post("/deleteUploadedfile", async (req: Request, res: Response) => {
    await deleteFileFromuploadedLocation(req.body.filename, req.body.destination);
    res.send({'status': 1});
});

bckendDataRouter.get("/deleteDocuments", async (req: Request, res: Response) => {
    const id: number = parseInt(req.query.id as string, 10);

    const data = await documents.findOne (
        { "where": { id: id } }
    );

    try {
        await deleteFileFromuploadedLocation(data.document , data.destination);    
        res.json( await getDocuments(req.query.recordID as string, req.query.type as string, req.userid) );        
    } catch (e:any) {
        console.log(e)
    }
});

bckendDataRouter.get("/getDocument", async (req: Request, res: Response) => {
    const id: number = parseInt(req.query.id as string, 10);

    const data = await documents.findOne (
        { "where": { id: id }  }
    );
    res.json( data );
});


bckendDataRouter.post("/updateImageRecord", async (req: Request, res: Response) => {
    var sql = "";

    if(req.body.targetID == 1)
        sql = "update company set mainImage = ? where id = ?"

    await update(sql, [req.body.image, req.body.id]);   
    
    res.json({"status": 1});
});


async function getUserContacts(userid: number) {
    const usrContacts = await findMany(`select u.id, u.contact, c.title 
        from contacts_types c, user_contacts u 
        where u.contactTypeID = c.id and u.userid = ?`, [userid])

    const typ1 = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(contacts_types, "contacts_types")
    .where("type = :id", { id: 1 })
    .execute();

    return {
        userContacts: usrContacts,
        mobileTypes: typ1
    }
}

async function getUserAddresses(recordID: number, type: string) {
    const typ2 = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(contacts_types, "contacts_types")
    .where("type = :id", { id: 2 })
    .execute();

    const usrAddresses = await findMany(`select u.id, c.title, u.contact, u.zip, u.state, u.country 
        from contacts_types c, addresses u 
        where u.contactTypeID = c.id and u.recordID = ? and u.type = ?`, [recordID, type])
    
    return {
        addressTypes: typ2,
        usrAddresses: usrAddresses
    };
}

async function getUsrProfile(userid: number) {
    const usr = await getConnection()
    .createQueryBuilder()
    .select([
        "ID",
        "firstname", 
        "lastname", 
        "email", 
        "PassportNumber", 
        "NationalID", 
        "MaritalStatus", 
        "Occupation",
        "DATE_FORMAT(DOB, '%M %d %Y') as DOB",
        "countryid"
    ])
    .from(users,"users")
    .where("id = :id", { id: userid })
    .execute();


    const countrydata = await country.findOne ({ 
        "where": { id: usr[0].countryid } }
    );
    

    return {
        user: usr[0],
        country: countrydata!.country
    }

}

async function getDocuments(recordID: string, type: string, userid: number) {

    if( type == Public_Enums_Constants.DOCUMENT_TYPES.Profile_Document ) 
        recordID = userid.toString();
    
    const docs = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(documents, "documents")
    .where("recordID = :id and type = :type", { id: recordID, type: type })
    .execute();

    return docs;

}

