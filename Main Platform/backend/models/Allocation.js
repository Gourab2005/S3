import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema({
  fromCenter: { type: mongoose.Schema.Types.ObjectId, ref: "Center", required: true },
  toCenter: { type: mongoose.Schema.Types.ObjectId, ref: "Center", required: true },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  transferInstructors: { type: Number, required: true },
  distance: { type: Number } // Distance between centers
});

export default mongoose.model("Allocation", allocationSchema);
