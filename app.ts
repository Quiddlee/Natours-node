import express from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Hello from the server side!',
    app: 'Natours',
  });
});

app.post('/', (_req, res) => {
  res.send('You can post to this endpoint...');
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
