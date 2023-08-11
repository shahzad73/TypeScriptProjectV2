import { loginRouter } from "../api/public/login.router";
import { commonRouter } from "../api/public/common.router";

module.exports = function (app: any) {

    app.use("/public", loginRouter);    
    app.use("/common", commonRouter);        

}
