import mongoose from "mongoose";
import { Schema } from "mongoose";

const challengeSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  challengeType: {
    type: Number,
    enum: [30, 60, 100],
    required: true,
  },
  journal: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["active", "completed", "Cancelled", "Given Up"],
    default: "active",
  },
  dateStarted: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  // endDate: {
  // type: Date,
  // required: true;
  // }
});

export default mongoose.model("Challenge", challengeSchema);
