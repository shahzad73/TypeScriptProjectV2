import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('company') 
export class company extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   userid!: number; 

   @Column() 
   @Length(5, 1000)
   title!: string; 

   @Column() 
   @Length(5, 100)
   mainImage!: string; 

   @Column() 
   @Length(5, 200)
   mainImageCaption!: string; 

   @Column() 
   @Length(2, 150)
   country!: string; 

   @Column() 
   @Length(5, 1000)
   details!: string; 

}
