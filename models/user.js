const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  studentID: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  isPay: { type: Boolean, required: true },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
