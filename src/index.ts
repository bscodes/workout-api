export {};
const express = require('express');

const v1WorkoutRouter = require('./v1/routes/workoutRoutes');
const bodyParser = require('body-parser');
const app = express();

const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

app.use(bodyParser.json());
app.use('/api/v1/workouts', v1WorkoutRouter);

app.listen(port);
