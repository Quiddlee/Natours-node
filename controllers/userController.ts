import { Request, Response } from 'express';

import { StatusCode } from '../src/types/enums';

export const getAllUsers = (_req: Request, res: Response) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'The user route is not yet implemented! 🙂',
  });
};

export const getUser = (_req: Request, res: Response) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'The user route is not yet implemented! 🙂',
  });
};

export const createUser = (_req: Request, res: Response) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'The user route is not yet implemented! 🙂',
  });
};

export const updateUser = (_req: Request, res: Response) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'The user route is not yet implemented! 🙂',
  });
};

export const deleteUser = (_req: Request, res: Response) => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'The user route is not yet implemented! 🙂',
  });
};
