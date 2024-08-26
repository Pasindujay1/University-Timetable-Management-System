import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
  },
  purpose: {
    type: String,
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

bookingSchema.pre('save', async function (next) {
  try {
    if (!this.bookingId) {
      let count = await this.constructor.countDocuments({});

      let id = `ACHP${(count + 1).toString().padStart(5, '10000')}`;

      let duplicate = true;

      //   Check if id already exists in the database
      while (duplicate) {
        const existingBooking = await this.constructor.findOne({
          bookingId: id,
        });

        if (!existingBooking) {
          duplicate = false;
        } else {
          count++;

          id = `ACHP${(count + 1).toString().padStart(5, '10000')}`;
        }
      }

      this.bookingId = id;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
