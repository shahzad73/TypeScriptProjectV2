import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDateString, IsDate, Min, Max} from "class-validator";
import {contacts_types} from "./contact_types"

@Entity('user_contacts') 
export class user_contacts extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   userid!: number; 

   @Column() 
   contactTypeID!: number; 

   @Column() 
   @Length(5, 100)
   contact!: string; 

   @OneToMany(() => contacts_types, (contactstypes) => contactstypes.id)
   "contactstypes": contacts_types[];   

}
