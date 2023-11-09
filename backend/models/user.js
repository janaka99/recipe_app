const { Schema, models, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: true,
  }
);

const User = models.User || model("User", UserSchema);

module.exports = User;
