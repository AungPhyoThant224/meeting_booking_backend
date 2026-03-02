import express, { Application } from 'express';
import morgan from 'morgan';

const app: Application = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Meeting Booking API!');
});

export default app;