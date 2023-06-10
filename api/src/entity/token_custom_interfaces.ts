import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('token_custom_interfaces') 
export class token_custom_interfaces extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   @Length(5, 1000)
   title!: string; 

   @Column() 
   tokenID!: number; 

   @Column() 
   @Length(5, 4000)
   details!: string; 

   @Column() 
   @Length(5, 100)
   interface!: string; 

   @Column() 
   @Length(5, 4000)
   currentValue!: string;    

   @Column() 
   isSecure!: number; 

   @Column() 
   type!: number; 

}
