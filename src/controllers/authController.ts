import { Request, Response } from 'express';
const authService = require('../services/authService');

const register = (req: Request, res: Response) => {
  const { email, name, password, confirmPassword } = req.body;

  const newUser = {
    email,
    name,
    password,
    confirmPassword,
  };

  if (!email || !name || !password || !confirmPassword) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: 'All fields are required' },
    });
    return;
  }

  try {
    if (password === confirmPassword) {
      authService.register(newUser);
      res.send({ status: 'OK', data: { email, name } });
    } else {
      res.status(400).send({
        status: 'FAILED',
        data: { error: 'Passwords do not match' },
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = {
    email,
    password,
  };

  if (!email || !password) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: 'All fields are required' },
    });
    return;
  }

  try {
    const loggedInUser = authService.login(user);
    res.send({ status: 'OK', data: loggedInUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

module.exports = { register, login };
