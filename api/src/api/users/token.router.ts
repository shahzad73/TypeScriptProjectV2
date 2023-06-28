import express, { Request, Response } from "express";
import { createQueryBuilder, getConnection, getManager } from "typeorm"; 
import { company } from "../../entity/company";
import { token } from "../../entity/token";
import {validate} from "class-validator";


export const tokenDataRouter = express.Router();

tokenDataRouter.get("/token", async (req: Request, res: Response) => {
    res.json( 
        await( getCompanyContacts(req.userid, req.query.size,  (req.query.page * req.query.size) ) ) 
    );
});

tokenDataRouter.post("/addtoken", async (req: Request, res: Response) => {

    const manager = getManager();
    const newUpdates = manager.create(token, req.body);    
    newUpdates.userID = req.userid;

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        await token.insert ( newUpdates );

        res.json( 
            await( getCompanyContacts(req.userid, req.query.size, 0) ) 
        );
    }

});

tokenDataRouter.get("/gettoken", async (req: Request, res: Response) => {
    var tok = await getConnection()
    .createQueryBuilder()
    .select([
        'Title',
        'Details',
        'isdeloyed'
    ])
    .from(token)
    .where("id = :id", { id: req.query.id })
    .execute();

    res.json( tok[0] )
});

async function getCompanyContacts(userid: number, size: number, skipRecord: number) {

    var comp = await getConnection()
    .createQueryBuilder()
    .select([
        'id',
        'Title'
    ])
    .from(company)
    .where("userID = :id", { id: userid })
    .execute();

    const [tok, total] = await token.findAndCount(
        {
            where: { userID: userid }, order: { id: "ASC" },
            take: size,
            skip: skipRecord
        }
    );

 
    return({
        company: comp,
        token: tok,
        tokenRecordCount: total
    });

}

