/* “Create a new schema for the User model.”

The first argument to the Schema constructor is an object that defines the structure of the
documents that will be stored in the database.

The second argument is an object that defines options for the schema.

The timestamps option is a Mongoose plugin that adds createdAt and updatedAt fields to the schema.

The unique option is used to ensure that each user has a unique username and email.

The required option is used to ensure that each user has a username and email.

 */
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
