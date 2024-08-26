import mongoose from "mongoose";

const lectureSessionSchema = new mongoose.Schema(
  {
    dayOfTheWeek: {
      type: String,
      required: true,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  { timestamps: true }
);

const LectureSession = mongoose.model("LectureSession", lectureSessionSchema);

export default LectureSession;
