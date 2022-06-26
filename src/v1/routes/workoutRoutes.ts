import { NextFunction, Response } from 'express';

export {};
const express = require('express');
const apicache = require('apicache');
const workoutController = require('../../controllers/workoutController');
const recordController = require('../../controllers/recordController');
const router = express.Router();
const verifyToken = require('../../middlewares/authJWT');

const cache = apicache.middleware;
router.get('/:workoutId/records', recordController.getRecordForWorkout);

router.get(
  '/',
  cache('2 minutes'),
  verifyToken,
  workoutController.getAllWorkouts
);

router.get('/:workoutId', verifyToken, workoutController.getOneWorkout);

router.post('/', verifyToken, workoutController.createNewWorkout);

router.patch('/:workoutId', verifyToken, workoutController.updateOneWorkout);

router.delete('/:workoutId', verifyToken, workoutController.deleteOneWorkout);

module.exports = router;
