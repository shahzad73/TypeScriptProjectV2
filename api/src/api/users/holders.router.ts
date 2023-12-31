import express, { Request, Response } from "express";
import { getConnection, getManager } from "typeorm"; 
import { users } from "../../entity/users";
import { token } from "../../entity/token";
import { user_token } from "../../entity/user_token";
import { findMany, findOne } from "../../core/mysql";
import { validate } from "class-validator";
import { user_issuer } from "../../entity/user_issuer";


export const holderRouter = express.Router();


interface queryParams {
    page: number,
    size: number,
    searchParameters: {
      txtFirstNameSearch: string,
      txtLastNameSearch: string,
      countryIDSearch: string
    }  
};


holderRouter.get("/getHolders", async (req: Request<any, any, any, queryParams>, res: Response) => {
    var sql = ``;

    if(req.query.searchParameters.txtFirstNameSearch !== null && req.query.searchParameters.txtFirstNameSearch !== '') 
        sql = ` and firstname like '%` + req.query.searchParameters.txtFirstNameSearch + `%'`;

    if(req.query.searchParameters.txtLastNameSearch !== null && req.query.searchParameters.txtLastNameSearch !== '') 
        sql = sql + ` and lastname like '%` + req.query.searchParameters.txtLastNameSearch + `%'`;

    if(req.query.searchParameters.countryIDSearch !== "-1" ) 
        sql = sql + ` and countryid = ` + req.query.searchParameters.countryIDSearch;

    const result = await findMany(`select u.ID, u.firstname, u.lastname, u.email, i.issuerCanEditProfile, c.country
                                    from users u, user_issuer i, country c where 
                                    i.userID = u.id and i.issuerID = ? 
                                    and c.id = u.countryid ${sql} limit ? offset ?`, 
                                    [ req.userid, req.query.size, req.query.page ] );


    const resultCount = await findOne(`select count(*) as count from users u, user_issuer i, country c where 
                                        i.userID = u.id and i.issuerID = ? 
                                        and c.id = u.countryid ${sql}`, [req.userid]);

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


        user_issuer.insert({
            userID : data.generatedMaps[0].ID,
            issuerID: req.userid,
            issuerCanEditProfile: 1
        })

        res.json({ "status": 1 })
    }


});

holderRouter.get("/getInvestor", async (req: Request, res: Response) => {

    const result = await findOne (`select u.ID, u.firstname, u.lastname, u.email, u.PassportNumber, 
            u.NationalID, u.DOB, u.MaritalStatus, u.Occupation, u.countryid, 
            c.country, i.issuerCanEditProfile
            from users u, user_issuer i, country c where 
            i.userID = u.id and 
            i.issuerID = ? and
            c.id = u.countryid and 
            i.userid = ?`, 
        [req.userid, req.query.id]
    );

    res.json( {
        data: result
    } );

});
 
holderRouter.post("/updateHolders", async (req: Request, res: Response) => {

    const id = req.body.ID;
    delete req.body.ID;


    const issuerRec = await user_issuer.findOne ({ 
        "where": { userID: id, issuerID: req.userid } }
    );

    if( issuerRec == null )
        res.json( {status: 2} );
    else {
     
        if( issuerRec.issuerCanEditProfile === 1 ) {

                const manager = getManager();
                const newUpdates = manager.create(users, req.body);    

                const errors = await validate(newUpdates, { skipMissingProperties: true });

                if (errors.length > 0) {
                    res.json( {status: -1, error: errors} );
                } else {
                    await getConnection()
                    .createQueryBuilder()
                    .update(users)
                    .set(req.body)
                    .where("id = :id", {  id: id  })
                    .execute();

                    res.json( {status: 1} );
                }

        } else 
            res.json( {status: 2} );

    }

});

holderRouter.get("/getInvestorTokensList", async (req: Request, res: Response) => {

    const tokenNotHolder =  await findMany(`select id, title from token where id not in
                                (select tokenid from user_token where userid = ${req.query.userid} )`)

    const tokenHolder =  await findMany(`select id, title from token where id in
                                (select tokenid from user_token where userid = ${req.query.userid} )`)

    res.json({
        tokenNotHolder: tokenNotHolder,
        tokenHolder: tokenHolder
    });

});

holderRouter.post("/setHolderToken", async (req: Request, res: Response) => {
    try {
        const data = req.body;

        data.admin_details = ""
        data.kycSubmitted = 1;
        data.iskYC = 1;

        await user_token.insert ( data );

        res.json({status: 1})
    } catch {
        console.log("err")
    }
})

