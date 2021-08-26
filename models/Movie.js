const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    desc: { type: String },
    image: { type: String },
    imageTitle: { type: String },
    imageSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.export = mongoose.model("Movie", MovieSchema);
