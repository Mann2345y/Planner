import mongoose from "mongoose";
import User from "./User.js";
const plannerDataSchema = mongoose.Schema(
  {
    typeOfData: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isStarred: {
      type: Boolean,
    },
    sendRemind: {
      type: Boolean,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    date: { type: String, required: true, default: new Date() },
  },
  { timestamps: true }
);

const PlannerData = mongoose.model("PlannerData", plannerDataSchema);
export default PlannerData;
