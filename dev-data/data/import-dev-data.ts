/* eslint-disable no-console */

import * as fs from 'fs';
import * as path from 'node:path';

import mongoose from 'mongoose';

import app from '../../app';
import Tour from '../../models/tourModel';

import 'dotenv/config';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) =>
    console.log(`DB connection error is ${(err as Error).message}`),
  );

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});

// Read json file
const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'tours-simple.json'), 'utf-8'),
);

// import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (e) {
    console.error(e);
  } finally {
    process.exit();
  }
};

// delete all from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (e) {
    console.error(e);
  } finally {
    process.exit();
  }
};

if (process.argv.at(2) === '--import') importData();
else if (process.argv.at(2) === '--delete') deleteData();
