import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('user_token') 
export class user_token extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   userid!: number; 

   @Column() 
   tokenid!: number;    

   @Column() 
   @Length(5, 1000)
   admin_details!: string; 

   @Column() 
   kycSubmitted!: number;  

   @Column() 
   iskYC!: number;     
}