export {};
const { v4: uuid } = require('uuid');
const Auth = require('../database/Auth');
const bcrypt = require('bcrypt');

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  displayName: string;
}

const getHashedPassword = (password: string) => {
  const hash = bcrypt.hashSync(password, 8);
  return hash;
};

const register = (user: IUser) => {
  const hashedPassword = getHashedPassword(user.password);

  const userToInsert = {
    ...user,
    displayName: user.name,
    password: hashedPassword,
    id: uuid(),
    createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
  };

  try {
    const createdUser = Auth.register(userToInsert);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const login = (user: { email: string; password: string }) => {
  const { email, password } = user;

  try {
    const user = Auth.login({ email, password: password });

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { register, login };
