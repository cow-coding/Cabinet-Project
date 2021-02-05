const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  studentID: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isPay: { type: Boolean, required: true },
  useCabinet: { type: Number, default: 0 },
  useFloor: { type: Number, default: 0 },
});

module.exports = mongoose.model("user", userSchema);
