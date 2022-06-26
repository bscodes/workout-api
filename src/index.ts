export {};
const express = require('express');

const v1WorkoutRouter = require('./v1/routes/workoutRoutes');
const v1AuthRouter = require('./v1/routes/authRoutes');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine(
  'handlebars',
  engine({
    extname: '.hbs',
  })
);
app.set('view engine', 'handlebars');
app.use('/api/v1/workouts', v1WorkoutRouter);
app.use('/api/v1/auth', v1AuthRouter);

app.listen(port);
