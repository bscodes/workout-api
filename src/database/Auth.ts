import { IUser } from '../services/authService';

export {};

const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const register = (user: IUser) => {
  const isAlreadyRegistered = DB.users.find(
    (newUser: IUser) => user.email === newUser.email
  );

  if (isAlreadyRegistered) {
    throw {
      status: 400,
      message: `User with the email '${user.email}' already exists`,
    };
  }

  try {
    DB.users.push(user);
    saveToDatabase(DB);
    return user;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

module.exports = { register };
