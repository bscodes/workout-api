const DB = require('./db.json');

export interface Record {
  id: string;
  workout: string;
  record: string;
}

const getRecordForWorkout = (workoutId: string) => {
  try {
    const record = DB.records.filter(
      (record: Record) => record.workout === workoutId
    );
    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};
module.exports = { getRecordForWorkout };
