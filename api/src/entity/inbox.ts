import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('inbox') 
export class inbox extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   ID!: number; 
   
   @Column() 
   @IsInt()
   UserID!: number; 

   @Column() 
   @Length(5, 256)
   Title!: string; 

   @Column() 
   @IsDate()
   DateEmail!: Date; 

   @Column() 
   @Length(5, 4000)
   Details!: string; 
   
   @Column() 
   @IsInt()
   isResponded!: number; 
 
   @Column() 
   @Length(0, 4000)
   Response!: string; 
   
   @Column() 
   @IsDate()
   ResponseDate!: Date; 

}
