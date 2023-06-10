import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('documents') 
export class documents extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   recordID!: number; 

   @Column() 
   @Length(5, 1000)
   document!: string; 

   @Column() 
   @Length(5, 1000)
   title!: string; 

   @Column() 
   @Length(5, 4000)
   description!: string; 

   @Column() 
   destination!: number; 

   @Column() 
   type!: number; 

}
