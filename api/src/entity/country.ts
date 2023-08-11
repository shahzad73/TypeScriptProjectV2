import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('country') 
export class country extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   @Length(5, 400)
   country!: string; 

   @Column() 
   @Length(5, 45)
   short!: string; 

   @Column() 
   @Length(5, 100)
   currency!: string; 

   @Column() 
   @Length(5, 45)
   currencyAbbreviation!: string; 

   @Column() 
   @Length(5, 45)
   currencySymbol!: string; 

}
