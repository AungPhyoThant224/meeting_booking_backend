import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './api/auth/auth.routes.js';
import userRoutes from './api/users/users.routes.js';
import bookingRoutes from './api/bookings/bookings.routes.js';

const app: Application = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes)
app.use('/api/bookings', bookingRoutes);

export default app;