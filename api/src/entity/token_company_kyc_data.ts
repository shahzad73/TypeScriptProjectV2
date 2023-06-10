import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('token_company_kyc_data') 
export class token_company_kyc_data extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   userid!: number; 

   @Column() 
   token_company_kyc_id!: number;    

   @Column() 
   @Length(5, 8000)
   value!: string; 
   
}
