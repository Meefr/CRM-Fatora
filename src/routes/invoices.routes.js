const express = require("express");
const router = express.Router();

const controller = require("../controllers/invoices.controller");

router.post("/api/invoices", controller.create_invoice);
router.get("/api/invoices/:id", controller.get_invoice);

module.exports = router;
