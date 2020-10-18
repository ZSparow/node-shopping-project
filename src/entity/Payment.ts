import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Users {

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
