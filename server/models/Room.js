import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    room_code: {
      type: String,
      required: [true, "Room Code required"],
      unique: true,
    },
    room_capacity: {
      type: Number,
      required: [true, "Room Capacity required"],
    },
    room_type: {
      type: String,
      required: [true, "Room Type required"],
    },
    room_resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UniResource",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
