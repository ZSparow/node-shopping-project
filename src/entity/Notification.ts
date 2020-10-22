import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import { User } from './User';

@Entity("notifications")
export class Notification extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    type: string;

    @Column()
    userId: number;
    
    @Column()
    active: boolean;

     //------------------- Relations ----------------


    @ManyToOne((type)=> User, user => user.notifications)
    user: User;
}
