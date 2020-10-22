import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import { Product } from './Product';

@Entity("Categories")
export class Category extends BaseEntity{

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
