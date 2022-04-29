'use strict';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

//config dotenv
dotenv.config({ path: './config/config.env' });

const app = express();

//Connect database
connectDB();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedDomains =
  process.env.MODE === 'DEVELOPMENT'
    ? ['http://localhost:3000']
    : ['production client url'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedDomains.includes(origin)) {
    console.log('origin included');

    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  console.log('origin', origin);

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

//to fetch images and static data
app.use('/upload', express.static('upload'));

//load routers
import userRouter from './routes/auth.route.js';

app.use('/api', userRouter);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).send(error);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
