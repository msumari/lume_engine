/* "Create a new schema for the Movie model."

The first argument is the name of the model. The second argument is the schema.

The schema defines the structure of the documents that will be stored in the database.

The timestamps option is used to automatically add createdAt and updatedAt fields to the documents.

The model is used to create documents.

The model is used to retrieve documents.

The model is used to update documents.

The model is used to delete documents.

The model is used to find documents. */

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
