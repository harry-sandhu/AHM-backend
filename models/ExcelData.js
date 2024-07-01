// models/ExcelData.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const excelDataSchema = new Schema({
  serialNumber: { type: String, required: true },
  date: { type: Date, required: true },
  freight: { type: String, required: true },
  consignor: { type: String, required: true },
  consignee: { type: String, required: true },
  gstPaidBy: { type: String, required: true },
});

module.exports = mongoose.model("ExcelData", excelDataSchema);
