import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });
const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;

