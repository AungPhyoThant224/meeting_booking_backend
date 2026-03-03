import { Router } from 'express';
import * as bookingController from './bookings.controller.js';
import * as summaryController from './bookings.summary.controller.js';
import { authorize } from '../../middleware/auth.middleware.js';
import { paginationValidator ,createBookingValidator, bookingIdValidator, updateBookingValidator } from './bookings.validator.js';

const router = Router();

router.use(authorize(['USER', 'OWNER', 'ADMIN']));

router.get('/', paginationValidator,bookingController.getAllBookings);
router.post('/', createBookingValidator, bookingController.createBooking);
router.get('/summary', authorize(['OWNER', 'ADMIN']), summaryController.getSummary);
router.put('/:id', updateBookingValidator, bookingController.updateBooking);
router.delete('/:id', bookingIdValidator, bookingController.deleteBooking);

export default router;