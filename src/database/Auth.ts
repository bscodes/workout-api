export {};
import { IUser } from '../services/authService';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const generateAuthToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.API_SECRET,
    {
      expiresIn: 86400,
    }
  );
};

const login = (data: { email: string; password: string }) => {
  const { email, password } = data;
  const dbUser: IUser = DB.users.find((user: IUser) => user.email === email);

  if (!dbUser) {
    throw {
      status: 400,
      message: `User with the email '${email}' does not exist`,
    };
  }

  const passwordIsValid = bcrypt.compareSync(password, dbUser.password);

  if (!passwordIsValid) {
    throw {
      status: 401,
      message: `Wrong password`,
    };
  }

  try {
    const authToken = generateAuthToken(dbUser);

    return {
      user: { id: dbUser.id, name: dbUser.name, email: dbUser.email },
      authToken,
      message: 'Login successful',
    };
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

module.exports = { register, login };
