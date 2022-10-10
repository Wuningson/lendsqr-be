import knex, { Knex } from 'knex';
import config from './knexfile';

const environment = process.env.NODE_ENV || 'development'

const env_config = config[environment]

// const dbClient = dev['client']
// const dbConn = dev['connection']

const db =  knex(env_config)

export default db