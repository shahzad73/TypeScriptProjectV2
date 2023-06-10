import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('user_shares') 
export class user_shares extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   userid!: number; 

   @Column() 
   tokenid!: number;    

   @Column() 
   @Length(5, 1000)
   publicKey!: string; 

   @Column() 
   isOnBlockchain!: number;  

   @Column() 
   shares!: number;     
}
