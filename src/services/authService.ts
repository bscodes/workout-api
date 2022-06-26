export {};
const { v4: uuid } = require('uuid');
const Auth = require('../database/Auth');
const crypto = require('crypto');

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
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
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

module.exports = { register };
