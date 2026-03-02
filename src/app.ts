import express, { Application } from 'express';
import morgan from 'morgan';
import authRoutes from './api/auth/auth.routes.js';
import userRoutes from './api/users/users.routes.js';

const app: Application = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes)

export default app;