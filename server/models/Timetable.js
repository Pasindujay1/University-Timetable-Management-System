import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User required"],
    },
    lectureSession: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LectureSession",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
