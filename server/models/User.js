import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: true,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["Admin", "Faculty", "Student"],
    required: true,
    // default: "Student",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
