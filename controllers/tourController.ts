import fs from 'fs';

import { Request, Response } from 'express';

import { StatusCode } from '../src/types/enums';
import { TourSimple } from '../src/types/types';

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
) as TourSimple[];

export const getAllTours = (req: Request, res: Response) => {
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

export const getTour = (req: Request, res: Response) => {
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

export const createTour = (req: Request, res: Response) => {
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

export const updateTour = (req: Request, res: Response) => {
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

export const deleteTour = (req: Request, res: Response) => {
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
