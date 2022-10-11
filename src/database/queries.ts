import { Knex } from 'knex';
import db from './models';
import { get_fee } from '../utils/get_fee';

// export function depositTransaction(transaction: Transaction)

export function getAmount(db: Knex, user_id: any): any {
  return db('account')
    .where({
      user_id: user_id
    })
    .select('amount');
}

export function createUserQuery(db: Knex, user: any) {
  db('user').insert({
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username
  });
}

export function createUserAccount(db: Knex, user_id: string) {
  db('account').insert({
    user_id,
    balance: 0
  });
}

export function depositQuery(db: Knex, user_id: string, amount: number) {
  db('account')
    .where('user_id', '=', Number(user_id))
    .increment('balance', amount);
}

export function withdrawQuery(db: Knex, user_id: string, amount: number) {
  db('account')
    .where('user_id', '=', Number(user_id))
    .decrement('balance', amount);
}

export function transferQuery(
  db: Knex,
  sender: string,
  receipient: string,
  amount: number
) {
  // first check if balance is sufficinet
  const total = amount + get_fee(amount);
  let sender_balance = getAmount(db, sender);
  let receiver_balance = getAmount(db, receipient);
  if (sender_balance < total) {
    return { error: 'insufficient balance for transaction' };
  } else {
    // reduce sender balance
    sender_balance = sender_balance - total;

    // increase receiver balance
    receiver_balance = receiver_balance + amount;

    // update sender amount in db
    db('account')
      .where('user_id', '=', sender)
      .update({ amount: sender_balance });

    // update receiver amount in db
    db('account')
      .where('user_id', '=', sender)
      .update({ amount: sender_balance });
  }
}

export async function getUser({
  db,
  username,
  id
}: {
  db: Knex;
  username?: string;
  id?: string;
}) {
  return (
    await db('user')
      .where({ ...(username && { username }), ...(id && { id }) })
      .select('id first_name last')
  )[0];
}
