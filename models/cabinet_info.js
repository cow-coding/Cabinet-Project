const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cabinetSchema = new Schema({
  studentID: { type: Number, unique: true, required: true },
  cabinet: { type: String, required: true },
});

module.exports = mongoose.model("Cabinet", userSchema);
