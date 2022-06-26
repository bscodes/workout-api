import { NextFunction, Request, Response } from 'express';

export {};
const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
