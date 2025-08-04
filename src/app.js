const express = require("express");
const app = express();
const cors = require("cors");
const { authenticate } = require("./middlewares/authenticate");
const { authorize } = require("./middlewares/authorize");
const invoiceRoutes = require("./routes/invoices.routes");
const userRoutes = require("./routes/users.routes");
const serviceRoutes = require("./routes/service.routes");
const programRoutes = require("./routes/program.routes");

app.use(cors());
app.use(express.json());

app.use(
  "/api/invoices",
  authenticate,
  authorize("admin", "receptionist"),
  invoiceRoutes
);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/programs", programRoutes);

module.exports = app;
