import { loginRouter } from "../api/public/login.router";

module.exports = function (app: any){

    app.use("/public", loginRouter);    

}
