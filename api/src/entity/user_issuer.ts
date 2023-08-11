import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";


@Entity('user_issuer') 
export class user_issuer extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   userID!: number; 

   @Column() 
   issuerID!: number;    

   @Column() 
   issuerCanEditProfile!: number;

}
