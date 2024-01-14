import fs from 'fs';

import express, { Request, Response } from 'express';

import { StatusCode } from './src/types/enums';
import { TourSimple } from './src/types/types';

import 'dotenv/config';

const app = express();

app
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

// Optional way 🫡

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Preferred way 👍

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
