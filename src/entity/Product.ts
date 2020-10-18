import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Category } from "./Category";
import { InvoiceItem } from './InvoiceItem';


@Entity("products")
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: "float"})
    price: number;

    @Column()
    image: string;

    @Column()
    dec: string;

    @Column()
    active: boolean;

        //------------------- Relations ----------------


    @ManyToOne((type)=> Category, category=> category.products)
    category: Category;

    @OneToMany(type => InvoiceItem, item=> item.product)
    items: InvoiceItem[];


}
