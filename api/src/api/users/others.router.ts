import express, { Request, Response } from "express";
import { getConnection, getManager } from "typeorm"; 
import {inbox} from "../../entity/inbox"; 	
import {validate} from "class-validator";
import { now } from "moment";


export const othersDataRouter = express.Router();

othersDataRouter.get("/inbox", async (req: Request, res: Response) => {

    var email = await getConnection()
    .createQueryBuilder()
    .select([
        'ID',
        'Title',
        'Details',
        'DateEmail',
        'isResponded',
        'Response',  
        'ResponseDate'
    ])
    .from(inbox, "i")
    .where("userID = :id", { id: req.userid })
    .execute();

    res.json( email );

});

othersDataRouter.post("/sendEmail", async (req: Request, res: Response) => {

    const today = new Date(now.toString());
    const dat = today.getFullYear + "-" + today.getMonth + "-" + today.getDate


    const manager = getManager();
    const newAddition = manager.create(inbox, req.body);    
    newAddition.UserID = req.userid;
    newAddition.isResponded = 0;
    newAddition.Response = "";
    newAddition.DateEmail = new Date();
    newAddition.ResponseDate = new Date();

    const errors = await validate(newAddition);

    if (errors.length > 0) {
        res.json({id: -1, error: errors});
    } else {
        const data = await inbox.insert ( newAddition );
        res.json({id: data.raw.insertId});
    }

});

othersDataRouter.get("/deleteInbox", async (req: Request, res: Response) => {

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(inbox)
    .where("id = :id", { id: req.query.id })
    .execute();

    var email = await getConnection()
    .createQueryBuilder()
    .select([
        'ID',
        'Title',
        'Details',
        'DateEmail',
        'isResponded',
        'Response',  
        'ResponseDate'
    ])
    .from(inbox, "i")
    .where("userID = :id", { id: req.userid })
    .execute();

    res.json( email );

});

othersDataRouter.get("/detailsEmail", async (req: Request, res: Response) => {

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
    .from(inbox, "i")
    .where("id = :id", { id: req.query.id })
    .execute();

    res.json( email[0] )
});

