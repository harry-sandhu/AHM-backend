const Consignment = require("../models/Consignment");

exports.saveConsignor = async (req, res) => {
  try {
    const { name } = req.body;

    // Find the first document or create a new one if none exists
    let consignment = await Consignment.findOne();
    if (!consignment) {
      consignment = new Consignment({ consignors: [], consignees: [] });
    }

    // Check if the consignor name already exists
    if (consignment.consignors.includes(name)) {
      return res
        .status(400)
        .json({ message: "Consignor name already exists." });
    }

    // Add the new consignor name
    consignment.consignors.push(name);
    await consignment.save();

    res.status(201).json({ message: "Consignor name saved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.saveConsignee = async (req, res) => {
  try {
    const { name } = req.body;

    // Find the first document or create a new one if none exists
    let consignment = await Consignment.findOne();
    if (!consignment) {
      consignment = new Consignment({ consignors: [], consignees: [] });
    }

    // Check if the consignee name already exists
    if (consignment.consignees.includes(name)) {
      return res
        .status(400)
        .json({ message: "Consignee name already exists." });
    }

    // Add the new consignee name
    consignment.consignees.push(name);
    await consignment.save();

    res.status(201).json({ message: "Consignee name saved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.getConsignors = async (req, res) => {
  try {
    const consignment = await Consignment.findOne();
    if (!consignment) {
      return res.status(404).json({ message: "No consignors found." });
    }

    res.status(200).json(consignment.consignors);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

exports.getConsignees = async (req, res) => {
  try {
    const consignment = await Consignment.findOne();
    if (!consignment) {
      return res.status(404).json({ message: "No consignees found." });
    }

    res.status(200).json(consignment.consignees);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};
