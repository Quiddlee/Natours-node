import fs from 'fs';

import express from 'express';

import { StatusCode } from './src/types/enums';
import { TourSimple } from './src/types/types';

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

app.post('/api/v1/tours', (req, res) => {
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
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
