import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Product } from './Product';

@Entity("Categories")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    icon: string;

    @Column()
    active: string;

    @OneToMany((type)=> Product, product => product.category)
    products: Product[];

}
