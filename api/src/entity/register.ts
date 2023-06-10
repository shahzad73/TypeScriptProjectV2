import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";

@Entity('register') 
export class register extends BaseEntity {   

   @PrimaryGeneratedColumn()
   ID!: number; 
   
   @Column()
   @Length(5, 100)
   password!: string; 

   @Column()
   @Length(2, 200)
   firstname!: string; 

   @Column()
   @Length(2, 200)
   lastname!: string; 
   
   @Column()
   @Length(5, 200)
   email!: string; 

   @Column()
   secret!: string; 

}
