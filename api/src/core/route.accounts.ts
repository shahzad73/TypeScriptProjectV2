import { bckendDataRouter } from "../api/accounts/backend.router";
import { othersDataRouter } from "../api/accounts/others.router";
import { companyDataRouter } from "../api/accounts/company.router";
import { tokenDataRouter } from "../api/accounts/token.router";

var jwt = require('jsonwebtoken');


module.exports = function(app: any){
    app.use("/accounts/backend", securityAccount,  bckendDataRouter);    
    app.use("/accounts/others", securityAccount,  othersDataRouter);   
    app.use("/accounts/company", securityAccount,  companyDataRouter);       
    app.use("/accounts/token", securityAccount,  tokenDataRouter);           
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