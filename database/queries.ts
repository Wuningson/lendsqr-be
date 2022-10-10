import { Knex } from 'knex';
import db from './models';
import {get_fee} from '../utils/get_fee'

// export function depositTransaction(transaction: Transaction)

export function getAmount(db: Knex, user_id: any): any {
    return db.where({
                user_id: user_id
            }).select("amount")
}

export function createUserQuery(db: Knex, user: any) {
    db('user')
    .insert({
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username
    })
}

export function depositQuery(db: Knex, user: any, amount: number) {
    db('user')
    .insert({
        user_id: user.id,
        amount: amount
    })
}

export function transferQuery(db: Knex, sender: any, receipient: any, amount: number) {
    // first check if balance is sufficinet
    const total = amount + get_fee(amount);
    let sender_balance = getAmount(db, sender.user_id)
    let receiver_balance = getAmount(db, receipient.user_id)
    if (sender_balance < total) {
        return {"error": "insufficient balance for transaction"}
    } else {
        // reduce sender balance
        sender_balance = sender_balance - total
        
        // increase receiver balance
        receiver_balance = receiver_balance + amount

        // update sender amount in db
        db('user')
        .where('user_id', '=', sender.user_id)
        .update({amount: sender_balance})

        // update receiver amount in db
        db('user')
        .where('user_id', '=', sender.user_id)
        .update({amount: sender_balance})
    }

}