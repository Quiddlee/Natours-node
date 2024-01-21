import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';

import Tour, { ITour } from '../models/tourModel';
import { StatusCode } from '../src/types/enums';

const excludedFields = ['page', 'sort', 'limit', 'field'];

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const queryObj = { ...req.query };
    excludedFields.forEach((field) => delete queryObj[field]);

    const formattedQueryObj = JSON.parse(
      JSON.stringify(queryObj).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`,
      ),
    ) as FilterQuery<ITour>;

    const query = Tour.find(formattedQueryObj);

    // 👇 Another way to filter data using chaining
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    const tours = await query;

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
