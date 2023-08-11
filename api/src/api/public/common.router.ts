import express, { Request, Response } from "express";
import { createConnection, Connection } from "typeorm"; 
import { getConnection, getManager } from "typeorm"; 
import { country } from "../../entity/country"; 	

export const commonRouter = express.Router();

commonRouter.get("/getCountries" , async (req: Request, res: Response) => { 

    res.json(  await country.find(
        {
            where: { }, order: { id: "ASC" },
            select: ['id', 'country'],            
        }
    ) );

})

