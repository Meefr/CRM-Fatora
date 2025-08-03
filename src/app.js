const express = require("express");
const app = express();
const cors = require("cors");

const invoiceRoutes = require("./routes/invoices.routes");
app.use(cors());
app.use(express.json());

app.use(invoiceRoutes);

module.exports = app;
