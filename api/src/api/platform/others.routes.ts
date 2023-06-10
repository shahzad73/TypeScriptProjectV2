import express, { Request, Response } from "express";
import { sendEmail } from '../../common/mailer';
import { inbox } from "../../entity/inbox";
import { users } from "../../entity/users";
import { getConnection, getManager } from "typeorm"; 


export const bckOtherRouters = express.Router();

bckOtherRouters.post("/sendEmail", async (req: Request, res: Response) => {

    try {
        await sendEmail("Shah Aslam", "sender@hot.com", req.body.email, req.body.TITLE, req.body.details,  )

        res.json({
            "status": 1
        })
    } catch (err: any) {
        res.json({
            "status": 0, message: err.toString() + "  Error occurred in sending email "
        })
    }

});

bckOtherRouters.get("/getAllInbox", async (req: Request, res: Response) => {
    res.send ( await inbox.find({  
            skip: 0,    // page
            take: 100 })  // number of items
    );
});

bckOtherRouters.get("/deleteInbox", async (req: Request, res: Response) => {

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(inbox)
    .where("id = :id", { id: req.query.id })
    .execute();

    res.send ( await inbox.find() );
});

bckOtherRouters.get("/getInboxDetails", async (req: Request, res: Response) => {

    var email = await getConnection()
    .createQueryBuilder()
    .select([
        'ID',
        'UserID',
        'Title',
        'Details',
        'DateEmail',
        'isResponded',
        'Response',  
        'ResponseDate'         
    ])
    .from(inbox)
    .where("id = :id", { id: req.query.id })
    .execute();


    var user = await getConnection()
    .createQueryBuilder()
    .select([
        'ID',
        'email', 
        'firstname', 
        'lastname'
    ])
    .from(users)
    .where("id = :id", { id: email[0].UserID })
    .execute();


    res.send( {
        "email": email[0],
        "user": user[0]
    } );
});

bckOtherRouters.post("/respondEmail", async (req: Request, res: Response) => {

    var user = await getConnection()
    .createQueryBuilder()
    .select([
        'email', 
        'firstname', 
        'lastname'
    ])
    .from(users)
    .where("id = :id", { id: req.body.userID })
    .execute();

    try {
        await sendEmail("Shah Aslam", "sender@hot.com", user[0].email, req.body.Title, req.body.details  )

        await getConnection()
        .createQueryBuilder()
        .update(inbox)
        .set({
            "isResponded": 1,
            "Response": req.body.details
        })
        .where("id = :id", { id: req.body.ID })
        .execute();


        res.json({
            "status": 1
        })
    } catch (err: any) {
        res.json({
            "status": 0, message: err.toString() + "  Error occurred in sending email "
        })
    }

});
