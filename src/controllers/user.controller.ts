import { RequestHandler } from 'express';
import Joi from 'joi';
import db from '../database/knex';
import { createUserQuery, getUser } from '../database/queries';
import jwt from 'jsonwebtoken';

export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      last_name: Joi.string().required(),
      first_name: Joi.string().required()
    });
    const { first_name, last_name, username } = req.body;
    createUserQuery(db, { username, first_name, last_name });
    return res.status(201).json({ message: 'user created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getLoginToken: RequestHandler = async (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string().required()
    });

    const { username } = req.body;
    const user = await getUser({ db, username });
    if (!user) {
      return res.status(400).json({ message: 'invalid username' });
    }

    const token = jwt.sign({ id: user.id }, 'testPrivateKey');
    return res
      .status(200)
      .json({ data: { token }, message: 'login successful' });
  } catch (error) {
    next(error);
  }
};
