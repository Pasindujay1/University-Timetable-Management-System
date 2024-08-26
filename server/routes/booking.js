import express from 'express';
import {
  createBooking,
  deleleteBooking,
  getAllBookings,
  getBookingById,
} from '../controllers/booking.js';

const router = express.Router();

router.post('/createBooking', createBooking);
router.get('/getAllBooking', getAllBookings);
router.get('/booking/:bookingId', getBookingById);
router.delete('/booking/:bookingId', deleleteBooking);

export default router;
