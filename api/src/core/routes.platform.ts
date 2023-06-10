import { bckendDataRouter } from "../api/platform/backend.router";
import { bckOtherRouters } from "../api/platform/others.routes";

var jwt = require('jsonwebtoken');

module.exports = function(app: any){
    app.use("/platform/backend", securityPlatform, bckendDataRouter);  
    app.use("/platform/others", securityPlatform, bckOtherRouters);      
}


const securityPlatform = function (req: any, res: any, next: any) {
    const tok = req.headers.authorization.split(' ')[1];

    jwt.verify(tok, process.env.JWT_SECRET, function(err: any, decoded: any) {
            if (err) {
                console.log("error . . ..  " + err)
            } else { 
                if(decoded.role == "platform") {
                    next();
                } else 
                    console.log("not correct tole")
            }
      });
}