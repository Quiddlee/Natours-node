import fs from 'fs';

import express from 'express';

import { StatusCode } from './types/enums';
import { TourSimple } from './types/types';

import 'dotenv/config';

const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
) as TourSimple[];

app.get('/api/v1/tours', (_req, res) => {
  res.status(StatusCode.SUCCESS).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
