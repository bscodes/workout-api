import { IWorkout } from '../services/workoutService';

export {};
const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const getAllWorkouts = (filterParams: { mode: string }) => {
  try {
    let workouts = DB.workouts;
    if (filterParams.mode) {
      return DB.workouts.filter((workout: IWorkout) =>
        workout.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    // Other if-statements will go here for different parameters
    return workouts || [];
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneWorkout = (workoutId: string) => {
  try {
    const workout = DB.workouts.find(
      (workout: IWorkout) => workout.id === workoutId
    );
    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    return workout || {};
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewWorkout = (newWorkout: IWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex(
      (workout: IWorkout) => workout.name === newWorkout.name
    ) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name '${newWorkout.name}' already exists`,
    };
  }
  try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneWorkout = (workoutId: string, changes: IWorkout) => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex(
        (workout: IWorkout) => workout.name === changes.name
      ) > -1;
    if (isAlreadyAdded) {
      // if the workout with the same name already exists
      throw {
        status: 400,
        message: `Workout with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.workouts.findIndex(
      (workout: IWorkout) => workout.id === workoutId
    );
    if (indexForUpdate === -1) {
      // if the workout is not found
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    };
    DB.workouts[indexForUpdate] = updatedWorkout; // find the workout and update it
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneWorkout = (workoutId: string) => {
  try {
    const indexForDeletion: number = DB.workouts.findIndex(
      (workout: IWorkout) => workout.id === workoutId
    );
    if (indexForDeletion === -1) {
      // if the workout is not found
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    DB.workouts.splice(indexForDeletion, 1); // find the workout and delete it
    saveToDatabase(DB);
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
