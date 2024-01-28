import { NextFunction, Request, Response } from 'express';

import Tour from '../models/tourModel';
import { StatusCode } from '../src/types/enums';
import ApiFeatures from '../utils/apiFeatures';

export const aliasTopTours = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(StatusCode.SUCCESS).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (e) {
    res.status(StatusCode.NOT_FOUND).json({
      status: 'fail',
      message: e,
    });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(StatusCode.SUCCESS).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (e) {
    res.status(StatusCode.NOT_FOUND).json({
      status: 'fail',
      message: e,
    });
  }
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
      message: e,
    });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(StatusCode.CREATED).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (e) {
    res.status(StatusCode.BAD_REQUEST).json({
      status: 'fail',
      message: e,
    });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(StatusCode.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (e) {
    res.status(StatusCode.BAD_REQUEST).json({
      status: 'fail',
      message: e,
    });
  }
};
