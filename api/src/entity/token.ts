import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('token') 
export class token extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   @Length(5, 1000)
   title!: string; 

   @Column() 
   @Length(5, 4000)
   details!: string; 

   @Column() 
   userID!: number; 

   @Column() 
   blockchainID!: number; 

   @Column() 
   tokenProtocol!: number; 

   @Column() 
   type!: number; 

   @Column() 
   companyID!: number; 

   @Column() 
   isdeloyed!: number;    
}

