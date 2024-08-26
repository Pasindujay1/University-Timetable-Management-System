import mongoose from "mongoose";

const StudentEnrollmentModel = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UniStudent",
      required: true,
    },
    joinedAt: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }
  },
  { timestamps: true }
);

const StudentEnrollment = mongoose.model("StudentEnrollment", StudentEnrollmentModel);

export default StudentEnrollment;
