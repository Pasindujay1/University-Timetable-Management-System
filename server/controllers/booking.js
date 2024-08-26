import Booking from '../models/booking.js';
import Room from '../models/Room.js';

const createBooking = async (req, res) => {
  try {
    const { roomId, date, startTime, endTime, purpose, bookedBy } = req.body;

    // Check if booking already exists
    const existingBooking = await Booking.findOne({
      roomId: roomId,
      date: date,
      $or: [
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gte: startTime } },
          ],
        },
        {
          $and: [
            { startTime: { $lte: endTime } },
            { endTime: { $gte: endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $gte: startTime } },
            { endTime: { $lte: endTime } },
          ],
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({
        message: 'Room is already booked for the given date and time',
      });
    }

    const newBooking = new Booking({
      roomId,
      date,
      startTime,
      endTime,
      purpose,
      bookedBy,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.log('Error occured while creating the booking:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate({
      path: 'roomId',
      model: Room,
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.log('Error occured while fetching the bookings:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      bookingId: bookingId,
    }).populate({
      path: 'roomId',
      model: Room,
    });

    if (!booking) {
      return res.status(400).json({
        message: 'Booking not found',
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.log('Error occured while fetching the booking:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const deleleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOneAndDelete({
      bookingId: bookingId,
    });

    if (!booking) {
      return res.status(400).json({
        message: 'Booking not found',
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.log('Error occured while deleting the booking:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export { createBooking, getAllBookings, getBookingById, deleleteBooking };
