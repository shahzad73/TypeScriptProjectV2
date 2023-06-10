import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('platformuser') 
export class platformusers extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   ID: number; 
   
   @Column() 
   @Length(10, 45)
   username: string; 

   @Column() 
   @Length(10, 45)
   password: string; 

   @Column() 
   @Length(10, 200)
   firstname: string; 

   @Column() 
   @Length(10, 200)
   lastname: string; 
   
   @Column() 
   @Length(10, 200)
   email: string; 

}
