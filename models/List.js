/* "Create a new schema for a List."

The first line creates a new mongoose schema. The rest line creates a new schema for a List.

*/
const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
