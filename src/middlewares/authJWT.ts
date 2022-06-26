import { NextFunction, Response } from 'express';
import { VerifyErrors } from 'jsonwebtoken';

export {};
const jwt = require('jsonwebtoken');
const DB = require('../database/db.json');

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.API_SECRET,
      (error: VerifyErrors, decode: any) => {
        const foundUser = DB.users.find((user: any) => user.id === decode.id);

        /* if (error) {
          res.status(401).send({
            status: 'FAILED',
            data: { error: error?.message || error },
          });
        } */

        if (!foundUser) {
          res.status(401).send({
            status: 'FAILED',
            data: { error: 'User not found' },
          });
        }

        try {
          req.user = foundUser;
          next();
        } catch (error) {
          res.status(500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
          });
        }
      }
    );
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;
