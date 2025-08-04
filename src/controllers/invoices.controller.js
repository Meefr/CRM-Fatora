const {TripForm} = require("../models/tripForm.model");
const QRCode = require("qrcode");

// POST: Create a new invoice (TripForm)
const create_invoice = async (req, res) => {
  try {
    const invoiceData = req.body;

    // Create a new invoice document
    const newInvoice = new TripForm(invoiceData);
    
    // Save to MongoDB
    const savedInvoice = await newInvoice.save();

    res.status(201).json(savedInvoice);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// GET: Get invoice by ID
const get_invoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const invoice = await TripForm.findById(invoiceId).exec();

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.json(invoice);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid invoice ID" });
  }
};

const get_invoices = async (req, res) => {
  try {
    const invoice = await TripForm.find();

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.json(invoice);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ error: "Internal Server Error - Database may not connected!" });
  }
};

const generateQRcode = async (req, res) => {
  const { url } = req.body;

  try {
    const qrDataUrl = await QRCode.toDataURL(url); // Generate QR code as Data URL
    res.json({
      qrImageTag: qrDataUrl,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};
module.exports = { get_invoice, create_invoice, get_invoices, generateQRcode };
