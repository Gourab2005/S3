import mongoose from "mongoose";

const centerSchema = new mongoose.Schema({
  centerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { lat: Number, lng: Number }, // Geolocation
  instructors: [
    { grade: String, subject: String, count: Number }
  ],
  learners: [
    { grade: String, subject: String, count: Number }
  ]
});

export default mongoose.model("Center", centerSchema);
