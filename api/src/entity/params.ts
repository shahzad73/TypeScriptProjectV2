import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('params') 
export class params extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 
   
   @Column() 
   @Length(5, 200)
   param!: string; 

   @Column() 
   @IsInt()
   type!: number; 
 
   @Column() 
   @IsInt()
   intValue!: number; 

   @Column() 
   @Length(5, 3000)
   strValue!: string; 
   
}





/*
    getting params 
    
    import { params } from "../../entity/params";
    
    const data = await params.findOne ({where: {
        param: "param2"
    }});

    const data = await params.findOne ({where: { param: "AWS_API_Version" }});

*/