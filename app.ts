import express from 'express';
import morgan from 'morgan';

import tourRouter from './routes/tourRoutes';
import userRouter from './routes/userRoutes';

import 'dotenv/config';

const app = express();

app
  .use(morgan('dev'))
  .use(express.json())
  .use((_req, _res, next) => {
    console.log('Hello from the middleware 👋');
    next();
  })
  .use((req, _res, next) => {
    Object.defineProperty(req, 'requestTime', {
      value: new Date().toISOString(),
    });
    next();
  });

app.use('/api/v1/tours', tourRouter).use('/api/v1/users', userRouter);

export default app;
