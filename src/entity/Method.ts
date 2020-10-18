import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("Methods")
export class Method {

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
