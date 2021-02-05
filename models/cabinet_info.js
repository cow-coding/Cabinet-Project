const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cabinetSchema = new Schema({
  cabinetNumber: { type: Number, unique: true, required: true },
  studentID: { type: Number, default: 00000000 },
  floor: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
});

module.exports = mongoose.model("cabinet", cabinetSchema);
