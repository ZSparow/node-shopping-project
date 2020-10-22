import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import { Invoice } from './Invoice';
import { Product } from "./Product";

@Entity("InvoiceItems")
export class InvoiceItem extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    invoiceId: number;

    @Column()
    productId: number;

    @Column()
    status: boolean;

    @Column()
    quantity: number;
    @Column()
    subtotal: number;

    //------------------- Relations ----------------


    @ManyToOne(type => Invoice, invoice=> invoice.items)
    invoice: Invoice;

    @ManyToOne(type => Product, product=> product.items)
    product: Product;
}
