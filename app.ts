import fs from 'fs';

import express, { Request, Response } from 'express';
import morgan from 'morgan';

import { StatusCode } from './src/types/enums';
import { TourSimple } from './src/types/types';

import 'dotenv/config';

const app = express();

// 1. Middlewares

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
) as TourSimple[];

// 2. Route handlers

const getAllTours = (req: Request, res: Response) => {
  const r = req as Request & { requestTime: string };

  res.status(StatusCode.SUCCESS).json({
    status: 'success',
    requestedAt: r.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tour = tours.find((tourEl) => tourEl.id === id);

  if (!tour) {
    res.status(StatusCode.NOT_FOUND).json({
      status: 'fail',
      error: {
        message: 'Invalid ID',
      },
    });
    return;
  }

  res.status(StatusCode.SUCCESS).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req: Request, res: Response) => {
  const lastTourId = tours.at(-1)?.id;
  const newId = lastTourId ? lastTourId + 1 : 0;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);
  const updatedTours = JSON.stringify(tours, null, 2);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    updatedTours,
    (err) => {
      console.log(err);

      res.status(StatusCode.CREATED).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

const updateTour = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const toUpdateTour = tours.find((tourEl) => tourEl.id === id);

  if (!toUpdateTour) {
    res.status(StatusCode.NOT_FOUND).json({
      status: 'fail',
      error: {
        message: 'Invalid ID',
      },
    });
    return;
  }

  const updateData = req.body;
  const updatedTour = { ...toUpdateTour, ...updateData };

  const newTours = tours.filter((tourData) => tourData.id !== id);
  newTours.push(updatedTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours, null, 2),
    () => {
      res.status(StatusCode.SUCCESS).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    },
  );
};

const deleteTour = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tour = tours.find((tourEl) => tourEl.id === id);

  if (!tour) {
    res.status(StatusCode.NOT_FOUND).json({
      status: 'fail',
      error: {
        message: 'Invalid ID',
      },
    });
    return;
  }

  const newTours = tours.filter((tourData) => tourData.id !== id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours, null, 2),
    () => {
      res.status(StatusCode.NO_CONTENT).json({
        status: 'success',
        data: null,
      });
    },
  );
};

const getAllUsers = (_req: Request, res: Response) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'The user route is not yet implemented! 🙂',
  });
};

const getUser = (_req: Request, res: Response) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'The user route is not yet implemented! 🙂',
  });
};

const createUser = (_req: Request, res: Response) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'The user route is not yet implemented! 🙂',
  });
};

const updateUser = (_req: Request, res: Response) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'The user route is not yet implemented! 🙂',
  });
};

const deleteUser = (_req: Request, res: Response) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'The user route is not yet implemented! 🙂',
  });
};

// 3. Routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter).use('/api/v1/users', userRouter);

// 4. Start server

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
