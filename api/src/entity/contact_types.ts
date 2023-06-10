import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import {user_contacts} from "./user_contacts"

@Entity('contacts_types') 
export class contacts_types extends BaseEntity {   

   @PrimaryGeneratedColumn() 
   id!: number; 

   @Column() 
   type!: number; 

   @Column() 
   title!: string; 

   @ManyToOne(() => user_contacts, (userContacts) => userContacts.contactTypeID)
   userContacts = user_contacts;

}
