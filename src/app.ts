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

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes)
app.use('/api/bookings', bookingRoutes);

export default app;