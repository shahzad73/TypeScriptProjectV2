import express, { Request, Response } from "express";
import { getConnection, getManager } from "typeorm"; 
import { validate } from "class-validator";
import { users } from "../../entity/users";
import { company } from "../../entity/company";
import {contacts_types} from "../../entity/contact_types";
import { findMany } from "../../core/mysql";
import { paragraphs } from "../../entity/paragraphs";
import { contacts } from "../../entity/contacts";
export const companyDataRouter = express.Router();


companyDataRouter.get("/companies", async (req: Request, res: Response) => {

    const size: number = parseInt(req.query.size as string, 10);
    const page: number = parseInt(req.query.page as string, 10);

    const [result, total] = await company.findAndCount(
        {
            where: { userid: req.userid }, order: { id: "ASC" },
            take: size,
            skip: page * size
        }
    );

    res.json( {
        data: result,
        count: total
    } );

})

companyDataRouter.post("/createcompany", async (req: Request, res: Response) => {
    req.body.userid = req.userid;

    const manager = getManager();
    const newUpdates = manager.create(company, req.body);    

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        const data = await company.insert ( newUpdates );
        res.json( {status: 1} );
    }
})

companyDataRouter.post("/updatecompanydetails", async (req: Request, res: Response) => {
    const id = req.body.id;

    const manager = getManager();
    const newUpdates = manager.create(company, req.body);    

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        await getConnection()
        .createQueryBuilder()
        .update(company)
        .set(req.body)
        .where("id = :id and userid = :userid", {  id: id,  userid: req.userid })
        .execute();

        const cmp = await getConnection()
        .createQueryBuilder()
        .select(["*"])
        .from(company, "company")
        .where("id = :id", { id: req.body.id })
        .execute();    
    
        res.json( cmp[0] );
    }
})



companyDataRouter.get("/getcompanyparagraphs", async (req: Request, res: Response) => {
    const para = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(paragraphs, "paragraphs")
    .where("recordID = :id and type = :type", { id: req.query.id, type: req.query.type })
    .execute();    
    
    res.json( para );
});

companyDataRouter.get("/getParaData", async (req: Request, res: Response) => {
    const cmp = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(paragraphs, "paragraphs")
    .where("id = :id", { id: req.query.id })
    .execute();    

    res.json( cmp[0] );
});

companyDataRouter.post("/addParamgraph", async (req: Request, res: Response) => {
    const manager = getManager();
    const newUpdates = manager.create(paragraphs, req.body);    

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        await paragraphs.insert ( newUpdates );

        const para = await getConnection()
        .createQueryBuilder()
        .select(["*"])
        .from(paragraphs, "paragraphs")
        .where("recordID = :id and type = :type", { id: newUpdates.recordID, type: req.body.type })
        .execute();    
        
        res.json( para );

    }
});

companyDataRouter.post("/updateParamgraph", async (req: Request, res: Response) => {
    //req.body.userid = req.userid;
    var id = req.body.id;
    delete ( req.body.id );

    const manager = getManager();
    const newUpdates = manager.create(paragraphs, req.body);    

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        await getConnection()
        .createQueryBuilder()
        .update(paragraphs)
        .set(req.body)
        .where("id = :id", {  id: id })
        .execute();

        const para = await getConnection()
        .createQueryBuilder()
        .select(["*"])
        .from(paragraphs, "paragraphs")
        .where("recordID = :id and type = :type", { id: req.body.recordID, type: req.body.type })
        .execute();    
        
        res.json( para );
    }
});

companyDataRouter.get("/deleteParagraph", async (req: Request, res: Response) => {

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(paragraphs)
    .where("id = :id and recordID = :recordID", { id: req.query.id, recordID: req.query.recordID })
    .execute();

    const para = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(paragraphs, "paragraphs")
    .where("recordID = :id", { id: req.query.recordID })
    .execute();    
    
    res.json( para );

});





companyDataRouter.get("/getdetails", async (req: Request, res: Response) => {
    const id: number = parseInt(req.query.id as string, 10);
    const type: string = req.query.type ? String(req.query.type) : '';

    const data = await getCompanyContacts( id, type );
    res.json( data );
});

companyDataRouter.get("/getcompanydetails", async (req: Request, res: Response) => {
    const cmp = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(company, "company")
    .where("id = :id", { id: req.query.id })
    .execute();    

    res.json( cmp[0] );
});

companyDataRouter.post("/deleteContact", async (req: Request, res: Response) => {
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(contacts)
    .where("id = :id and recordID = :recordID", { id: req.body.id, recordID: req.body.recordID })
    .execute();

    res.json(   await getCompanyContacts(req.body.recordID, req.body.type)  );
});

companyDataRouter.post("/addContact", async (req: Request, res: Response) => {

    const manager = getManager();
    const newUpdates = manager.create(contacts, req.body);    

    const errors = await validate(newUpdates);

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        const data = await contacts.insert ( newUpdates );
        res.json(   await getCompanyContacts(parseInt(req.body.recordID), req.body.type)  );
    }

});

companyDataRouter.get("/getCompanyContact", async (req: Request, res: Response) => {
    const cmp = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(contacts, "contacts")
    .where("id = :id and recordID = :recordID", { id: req.query.id, recordID: req.query.recordID })
    .execute();    

    res.json( cmp[0] );
});

companyDataRouter.post("/editCompanyContact", async (req: Request, res: Response) => {
    const manager = getManager();
    const newUpdates = manager.create(contacts, req.body);    

    const recordID = req.body.recordID;
    const id = req.body.id;
    delete( req.body.recordID );
    delete ( req.body.id );

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        await getConnection()
        .createQueryBuilder()
        .update(contacts)
        .set(req.body)
        .where("id = :id and recordID = :recordID", {  id: id, recordID: recordID })
        .execute();

        res.json(   await getCompanyContacts(recordID, req.body.type)  );
    }
});




async function getCompanyContacts(recordID: number, type: string) {

    const typ1 = await getConnection()
    .createQueryBuilder()
    .select(["*"])
    .from(contacts_types, "contacts_types")
    .where("type = :id", { id: 1 })
    .execute();


    const usrContacts = await findMany(`select u.id, u.contact, u.nameOfPerson, c.title 
        from contacts_types c, contacts u 
        where u.contactTypeID = c.id and u.recordID = ? and u.type = ?`, [recordID, type])

    return {
        mobileTypes: typ1,
        userContacts: usrContacts
    }

}


