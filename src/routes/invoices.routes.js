const express = require("express");
const router = express.Router();

const controller = require("../controllers/invoices.controller");

router.post("/api/invoices", controller.create_invoice);
router.get("/api/invoices/:id", controller.get_invoice);
router.get("/api/invoices", controller.get_invoices);
router.post("/api/generate-qr", controller.generateQRcode);

module.exports = router;
