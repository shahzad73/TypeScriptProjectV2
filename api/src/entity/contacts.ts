import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('contacts') 
export class contacts extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   recordID!: number; 

   @Column() 
   @Length(5, 100)
   nameOfPerson!: string; 

   @Column() 
   contactTypeID!: number; 

   @Column() 
   @Length(5, 100)
   contact: string; 

   @Column() 
   type!: number; 

}
