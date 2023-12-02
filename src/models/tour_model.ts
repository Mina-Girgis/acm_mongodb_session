import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  ratingsAverage: {
    type: Number,
  },
  ratingsQuantity: {
    type: Number,
  },
  images: {
    type: [String],
  },
  startDates: {
    type: [Date],
  },
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
  maxGroupSize: {
    type: Number,
  },
  difficulty: {
    type: String,
    // input MUST be one of the 3 choices;
    enum: ["easy", "medium", "hard"],
  },
  guides: {
    // mongoose has its own datatype for ID
    // we use ObjectId when we need to store mongoose in our databse
    // its type it not string anymore but its type is ObjectId
    type: [mongoose.Schema.Types.ObjectId],
  },
  price: {
    type: Number,
  },
  summary: {
    type: String,
  },
  description: {
    type: String,
  },
  imageCover: {
    type: String,
  },
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
