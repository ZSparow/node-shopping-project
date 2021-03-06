import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity} from "typeorm";

import {User} from "./User"
import { InvoiceItem } from './InvoiceItem';
@Entity("invoices")
export class Invoice extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: number;


    @Column()
    total: number;

    @Column()
    address: string;

    @Column()
    orderDate: string;

    @Column()
    method: string;

    @Column()
    long: string;

    @Column()
    lat: string;


    @ManyToOne((type)=> User, user=> user.invoices)
    user: User;

    @OneToMany((type)=> InvoiceItem, item => item.invoice)
    items: InvoiceItem[];
}
