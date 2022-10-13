import { json } from 'stream/consumers';
import { DataSource } from 'typeorm';
import { get_fee } from '../utils/get_fee';
import { hashCompare } from '../utils/hash';
import { User } from './user.entity';

const transaction_type = {
  deposit: "deposit",
  withdrawal: "withdrawal",
  transfer: "transfer"
}

// export function depositTransaction(transaction: Transaction)

export async function getAmount(user_id: any): Promise<any> {

    const user = await User.find({
      select: {
        balance: true
      },
      where: {
        user_id: user_id
      }
    })

    return user
}

export async function createUserQuery(db: DataSource, user: any) {

  const new_user = User.create({
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    password: user.password,
    email: user.email
  });

  await new_user.save()
}

// export function createUserAccount(db: DataSource, user_id: string) {
//   db('account').insert({
//     user_id,
//     balance: 0
//   });
// }

export async function depositQuery(id: number, amount: number) {

  let balance = await getAmount(id)
  const update = User.upsert(
      {
        user_id: id, balance: balance + amount
      },
    ['user']
    )
}


export async function withdrawQuery(id: number, amount: number) {

  let balance = await getAmount(id)
  if (balance < amount) return "Insufficent amount"
  else {
    const update =  User.upsert(
      {
        user_id: id, balance: balance + amount
      },
    ['user']
    )
  }
}

export async function transferQuery(
  sender: number,
  receipient: string,
  amount: number
) {
  // first check if balance is sufficinet
  const total = amount + get_fee(amount);
  let sender_balance = await getAmount(sender);
  const receipientU = await getUserID(receipient)
  let receipientID = 0
  receipientU ? (receipientID = receipientU.user_id ) : null
  let receiver_balance = await getAmount(receipient);
  if (sender_balance < total) {
    return { error: 'insufficient balance for transaction' };
  } else {
    // reduce sender balance
    sender_balance = sender_balance - total;

    // increase receiver balance
    receiver_balance = receiver_balance + amount;

    // update sender amount in db
      await User.upsert(
        {
          user_id: sender, balance: sender_balance
        },
      ['user']
      )

    // update receiver amount in db
    await User.upsert(
      {
        user_id: receipientID, balance: receiver_balance
      },
    ['user']
    )
  }
}


export async function getUserID(username: string) {
  return User.findOne({
    where: {
      username: username
    }
  })
}

// For Authetication
export async function getUser(username: string, password: string) {
  return await User.findOne({
    where: {
      username: username,
      password: password
    }
  })
}
