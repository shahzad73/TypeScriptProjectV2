import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('addresses') 
export class addresses extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   recordID!: number; 

   @Column() 
   contactTypeID!: number; 

   @Column() 
   @Length(5, 2000)
   contact!: string; 

   @Column() 
   @Length(0, 20)
   zip!: string; 

   @Column() 
   @Length(0, 100)
   state!: string; 

   @Column() 
   @Length(0, 200)
   country!: string; 

   @Column() 
   type!: number; 

}
