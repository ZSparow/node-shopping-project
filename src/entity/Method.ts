import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Methods")
export class Method extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({unique: true})
    min: string;

    @Column()
    max: string;

    @Column()
    url: string;

    @Column()
    image: string;


}
