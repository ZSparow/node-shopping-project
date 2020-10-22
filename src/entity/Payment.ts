import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Users extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    min: number;

    @Column()
    max: number;

    @Column()
    url: string;

    @Column()
    image: string;

    @Column()
    active: boolean;

}
