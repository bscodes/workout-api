import type { Request, Response } from 'express';

const recordService = require('../services/recordService');

const getRecordForWorkout = (req: Request, res: Response) => {
  const { workoutId } = req.params;
  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }
  try {
    const record = recordService.getRecordForWorkout(workoutId);
    res.send({ status: 'OK', data: record });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

module.exports = { getRecordForWorkout };
