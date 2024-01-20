import { NextFunction, Request, Response } from 'express';

import { StatusCode } from '../src/types/enums';

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const isValidBody = 'name' in body && 'price' in body;

  if (!isValidBody) {
    res.status(StatusCode.BAD_REQUEST).json({
      status: 'fail',
      message: 'The data is missing required name or price field',
    });
    return;
  }

  next();
};

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

export const createTour = (/* req: Request, res: Response */) => {};

export const updateTour = (/* req: Request, res: Response */) => {};

export const deleteTour = (/* req: Request, res: Response */) => {};
