import fs from 'fs';

import express from 'express';

import { TourSimple } from './src/types/types';
import { StatusCode } from './src/types/enums';

import 'dotenv/config';

const app = express();

app.use(express.json());

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

app.post('/api/v1/tours', (req, _res) => {
  console.log(req.body);
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
