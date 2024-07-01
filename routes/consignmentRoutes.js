const express = require("express");
const router = express.Router();
const consignmentController = require("../controllers/consignmentController");

router.post("/consignor", consignmentController.saveConsignor);
router.post("/consignee", consignmentController.saveConsignee);
router.get("/consignors", consignmentController.getConsignors);
router.get("/consignees", consignmentController.getConsignees);

module.exports = router;
