import { Request, Response } from 'express';

import Tour from '../models/tourModel';
import { StatusCode } from '../src/types/enums';

export const getAllTours = (req: Request, res: Response) => {
  const r = req as Request & { requestTime: string };

  res.status(StatusCode.SUCCESS).json({
    status: 'success',
    requestedAt: r.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

export const getTour = (_req: Request, res: Response) => {
  // const id = Number(req.params.id);
  // const tour = tours.find((tourEl) => tourEl.id === id)!;

  res.status(StatusCode.SUCCESS).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

export const createTour = async (req: Request, res: Response) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(StatusCode.CREATED).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (e) {
    res.status(StatusCode.BAD_REQUEST).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

export const updateTour = (/* req: Request, res: Response */) => {};

export const deleteTour = (/* req: Request, res: Response */) => {};
