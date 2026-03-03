import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware.js';
import * as bookingService from './bookings.service.js';

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { startTime, endTime } = req.body;
    const booking = await bookingService.createBooking(req.user!.userId, startTime, endTime);
    res.status(201).json({
        message: "Booking created successfully",
        data: booking
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllBookings = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const data = await bookingService.getAllBookings(page, limit);
    res.json({
        message: "Bookings retrieved successfully",
        data: data
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await bookingService.updateBooking(
      req.params.id.toString(), 
      req.user!.userId, 
      req.user!.role, 
      req.body
    );
    res.json({
        message: "Booking updated successfully",
        data: booking
    });
  } catch (error: any) {
    const statusCode = error.message.includes('permission') ? 403 : 400;
    res.status(statusCode).json({ error: error.message });
  }
};

export const deleteBooking = async (req: AuthRequest, res: Response) => {
  try {
    await bookingService.deleteBooking(req.params.id.toString(), req.user!.userId, req.user!.role);
    res.json({
        message: "Booking deleted successfully"
    });
  } catch (error: any) {
    res.status(403).json({ error: error.message });
  }
};