import { bckendDataRouter } from "../api/users/backend.router";
import { othersDataRouter } from "../api/users/others.router";
import { companyDataRouter } from "../api/users/company.router";
import { tokenDataRouter } from "../api/users/token.router";
import { holderRouter } from "../api/users/holders.router";

var jwt = require('jsonwebtoken');

module.exports = function(app: any){
    app.use("/accounts/backend", securityAccount,  bckendDataRouter);    
    app.use("/accounts/others", securityAccount,  othersDataRouter);   
    app.use("/accounts/company", securityAccount,  companyDataRouter);       
    app.use("/accounts/token", securityAccount,  tokenDataRouter);           
    app.use("/accounts/holders", securityAccount,  holderRouter);               
}


const securityAccount = function (req: any, res: any, next: any) {
    const tok = req.headers.authorization.split(' ')[1];

    jwt.verify(tok, process.env.JWT_SECRET, function(err: any, decoded: any) { 
            if (err) {
                console.log("error ....  " + err)
            } else { 
                if(decoded.role == "account") {
                    req.userid = decoded.id;
                    next();
                } else 
                    console.log("not correct tole")
            }
    });

}

