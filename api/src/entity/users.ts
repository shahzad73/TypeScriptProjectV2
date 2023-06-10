import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsNotEmpty, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('users') 
export class users extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   "ID": number; 

   @Column() 
   @Length(5, 100)
   password!: string; 

   @Column() 
   @Length(4, 200)
   firstname!: string; 

   @Column() 
   @Length(4, 200)
   lastname!: string; 
   
   @Column() 
   @Length(5, 200)
   email!: string; 

   @Column() 
   secret!: string; 

   @Column() 
   @Length(0, 100)
   "PassportNumber": string; 

   @Column() 
   @Length(0, 100)
   "NationalID": string; 

   @Column() 
   "DOB": Date; 

   @Column() 
   @Length(0, 100)
   "MaritalStatus": string; 

   @Column() 
   @Length(0, 100)
   "Occupation": string; 

}

