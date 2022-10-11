/**
 * Create the auth middleware
 * Create the idempotency handler
 */

import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import db from '../database/knex';
import { getUser } from '../database/queries';

export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) {
      throw new Error('authentication failed');
    }

    const { id } = jwt.verify(token, 'testPrivateKey') as { id: string };
    const user = await getUser({ db, id });
    if (!user) {
      throw new Error('authentication failed');
    }

    req.userId = user.id;
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * I want the user object to look have
 */
