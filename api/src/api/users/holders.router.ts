import express, { Request, Response } from "express";
import { getConnection, getManager } from "typeorm"; 
import {users} from "../../entity/users";
import {user_issuer} from "../../entity/user_issuer";
import { findMany, findOne } from "../../core/mysql";
import { validate } from "class-validator";

export const holderRouter = express.Router();

holderRouter.get("/getHolders", async (req: Request, res: Response) => {

    const size: number = parseInt(req.query.size as string, 10);
    const page: number = parseInt(req.query.page as string, 10) * size;

    /*const [result, total] = await users.findAndCount(
        {
            where: { }, order: { ID: "ASC" },
            select: ['ID', 'firstname', 'lastname', 'email'],            
            take: size,
            skip: page * size
        }
    );*/

    const result = await findMany(`
        select u.ID, u.firstname, u.lastname, u.email, i.issuerCanEditProfile, c.country
        from users u, user_issuer i, country c where 
        i.userID = u.id and 
        i.issuerID = ? and
        c.id = u.countryid
        limit ? offset ?`, 
        [req.userid, size.toString(), page.toString()]
    );


    const resultCount = await findOne(`select count(*) as count from user_issuer where issuerID = ?`, [req.userid]);
    
    res.json( {
        data: result,
        count: resultCount.count
    } );

});

holderRouter.post("/saveNewHolders", async (req: Request, res: Response) => {

    const manager = getManager();
    const newUpdates = manager.create(users, req.body);    
    const errors = await validate(newUpdates, { skipMissingProperties: true });

    if (errors.length > 0) {
        res.json({status: -1, error: errors});
    } else {

        const rec1 = await users.findOne ({where: {
            email: req.body.email
        }});

        if(rec1 != null) {
            res.json({ "status": 2 });
            return;
        }

        req.body.password = "random password";
        req.body.secret = "random secret"
        const data = await users.insert(req.body);

        console.log(data.generatedMaps[0].ID);
        
        user_issuer.insert({
            userID : data.generatedMaps[0].ID,
            issuerID: req.userid,
            issuerCanEditProfile: 1
        })

        res.json({ "status": 1 })
    }


});

