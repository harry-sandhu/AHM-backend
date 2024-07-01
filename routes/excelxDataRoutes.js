// routes/excelDataRoutes.js
const express = require("express");
const router = express.Router();
const excelDataController = require("../controllers/excelDataController");

router.get("/", excelDataController.getAllData);
router.get("/:id", excelDataController.getDataById);
router.post("/", excelDataController.createData);
router.put("/:id", excelDataController.updateData);
router.delete("/:id", excelDataController.deleteData);

module.exports = router;
