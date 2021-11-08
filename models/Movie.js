const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    desc: { type: String, required: true },
    image: { type: String },
    imageSm: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: Array },
    language: { type: String },
    rating: { type: Number },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
