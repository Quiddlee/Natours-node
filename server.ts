import mongoose from 'mongoose';

import app from './app';

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
