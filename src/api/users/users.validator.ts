import { body, query, param } from 'express-validator';
import { validateResult } from '../../middleware/validator.middleware.js';

export const createUserValidator = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  body('role').isIn(['ADMIN', 'OWNER', 'USER']).withMessage('Invalid role'),
  validateResult
];

export const paginationValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  validateResult
];

export const userIdValidator = [
  param('id').isUUID().withMessage('Invalid User ID format'),
  validateResult
];