import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, BaseEntity, CreateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('transaction')
export class Transaction extends BaseEntity{

    @PrimaryGeneratedColumn()
    transaction_id!: number

    @Column(
        {
            type: "text"
        }
    )
    transaction_type!: string

    @Column({
        type: "numeric"
    })
    transaction_amount!: number

    @Column()
    user_id!: bigint

    @ManyToOne(
        () => User,
        (user) => user.transactions
    )
    @JoinColumn()
    account_id!: User

    @CreateDateColumn()
    created_at!: Date
    
}