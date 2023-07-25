import { Request } from 'express';

// Delcare variables that you want injected in the Request object.   you can then access these
// variables as   req.VARIABLE_NAME      like userid can be access with   req.userid
// inject these variables in req early on in the request pipeline

declare global {
    namespace Express {
        interface Request {
          userid: number;
        }
    }
}


