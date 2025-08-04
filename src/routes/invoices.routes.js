const express = require("express");
const router = express.Router();
const controller = require("../controllers/invoices.controller");

router.post("/", controller.create_invoice);
router.get("/:id", controller.get_invoice);
router.get("/", controller.get_invoices);
router.post("/generate-qr", controller.generateQRcode);

module.exports = router;
