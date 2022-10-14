import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, BaseEntity, CreateDateColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity('user')
@Unique(['username', 'email'])
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    @Column()
    username!: string

    @Column()
    password!: string

    @Column()
    email!: string

    @Column({
        type: "numeric",
        default: 0.0
    })
    balance: number | undefined

    @OneToMany(
        () => Transaction,
        (transaction) => transaction.user
    )
    transactions: Transaction[] | undefined;

    @CreateDateColumn()
    joined!: Date

}