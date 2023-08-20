import express, { Request, Response } from "express";
import { createQueryBuilder, getConnection, getManager } from "typeorm"; 
import { company } from "../../entity/company";
import { token } from "../../entity/token";
import { user_token } from "../../entity/user_token";
import {validate} from "class-validator";
import { findMany, findOne } from "../../core/mysql";


export const tokenDataRouter = express.Router();

tokenDataRouter.get("/token", async (req: Request, res: Response) => {

    const size: number = parseInt(req.query.size as string, 10);
    const page: number = parseInt(req.query.page as string, 10);


    res.json( 
        await( getCompanyContacts(req.userid, size,  (page * size) ) ) 
    );
});

tokenDataRouter.post("/addtoken", async (req: Request, res: Response) => {

    const manager = getManager();
    const newUpdates = manager.create(token, req.body);    
    newUpdates.userID = req.userid;

    const size: number = parseInt(req.query.size as string, 10);

    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {
        await token.insert ( newUpdates );

        res.json( 
            await( getCompanyContacts(req.userid, size, 0) ) 
        );
    }

});

tokenDataRouter.get("/gettoken", async (req: Request, res: Response) => {
    var tok = await getConnection()
    .createQueryBuilder()
    .select([
        'Title',
        'Details',
        'isDeployed'
    ])
    .from(token, "t")
    .where("id = :id", { id: req.query.id })
    .execute();

    res.json( tok[0] )
});

tokenDataRouter.get("/tokenholders", async (req: Request, res: Response) => {
    const size: number = parseInt(req.query.size as string, 10);
    const page: number = parseInt(req.query.page as string, 10) * size;

    const tokenHolder =  await findMany(  `select u.firstname, u.lastname from users u, user_token t 
                                           where u.id = t.userid and t.tokenid = ? limit ? offset ?`, 
                                           [req.query.tokenid, size.toString(), page.toString()]  )

    const resultCount = await findOne(  `select count(*) as count from user_token where tokenid = ?`, [req.query.tokenid]  );

    res.json( {
        tokenUserList: tokenHolder,
        tokenUserListCount: resultCount.count
    } ); 
});


async function getCompanyContacts(userid: number, size: number, skipRecord: number) {

    var comp = await getConnection()
    .createQueryBuilder()
    .select([
        'id',
        'Title'
    ])
    .from(company, "c")
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

