// controllers/excelDataController.js
const ExcelData = require("../models/ExcelData");

exports.getAllData = async (req, res) => {
  try {
    const data = await ExcelData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDataById = async (req, res) => {
  try {
    const data = await ExcelData.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createData = async (req, res) => {
  const data = new ExcelData({
    serialNumber: req.body.serialNumber,
    date: req.body.date,
    freight: req.body.freight,
    consignor: req.body.consignor,
    consignee: req.body.consignee,
    gstPaidBy: req.body.gstPaidBy,
  });

  try {
    const newData = await data.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateData = async (req, res) => {
  try {
    const data = await ExcelData.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data not found" });

    if (req.body.serialNumber != null)
      data.serialNumber = req.body.serialNumber;
    if (req.body.date != null) data.date = req.body.date;
    if (req.body.freight != null) data.freight = req.body.freight;
    if (req.body.consignor != null) data.consignor = req.body.consignor;
    if (req.body.consignee != null) data.consignee = req.body.consignee;
    if (req.body.gstPaidBy != null) data.gstPaidBy = req.body.gstPaidBy;

    const updatedData = await data.save();
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const data = await ExcelData.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Data not found" });

    await data.remove();
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
