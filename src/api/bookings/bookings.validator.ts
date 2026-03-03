import { body,query, param } from 'express-validator';
import { validateResult } from '../../middleware/validator.middleware.js';

export const createBookingValidator = [
  body('startTime')
    .isISO8601()
    .withMessage('Start time must be a valid ISO8601 date'),
  body('endTime')
    .isISO8601()
    .withMessage('End time must be a valid ISO8601 date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startTime)) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  validateResult
];

export const bookingIdValidator = [
  param('id').isUUID().withMessage('Invalid Booking ID format'),
  validateResult
];

export const updateBookingValidator = [
  param('id').isUUID().withMessage('Invalid Booking ID format'),
  body('startTime').optional().isISO8601().withMessage('Invalid start time'),
  body('endTime').optional().isISO8601().withMessage('Invalid end time')
    .custom((value, { req }) => {
      if (value && req.body.startTime && new Date(value) <= new Date(req.body.startTime)) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  validateResult
];

export const paginationValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  validateResult
];

export const summaryFilterValidator = [
  query('startDate').optional().isISO8601().withMessage('Invalid start date format'),
  query('endDate').optional().isISO8601().withMessage('Invalid end date format'),
  validateResult
];