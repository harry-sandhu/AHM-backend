const mongoose = require("mongoose");

const ConsignmentSchema = new mongoose.Schema({
  consignors: {
    type: [String],
    default: [],
  },
  consignees: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Consignment", ConsignmentSchema);
