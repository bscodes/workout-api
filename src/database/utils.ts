import { Response } from 'express';

export {};
const fs = require('fs');

const saveToDatabase = (DB: any) => {
  fs.writeFileSync('./src/database/db.json', JSON.stringify(DB, null, 2), {
    encoding: 'utf-8',
  });
};

const checkUser = (req: any, res: Response) => {
  if (!req.user) {
    res.status(403).send({
      status: 'FAILED',
      data: { error: 'You must be logged in to access this resource' },
    });
    return;
  }
};

module.exports = { saveToDatabase, checkUser };
