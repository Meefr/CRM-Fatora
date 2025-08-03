const mongoose = require("mongoose");
const { MemberSchema } = require("./member.model");
const { ServiceSchema } = require("./service.model");

const TripFormSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
      index: true,
    },
    customerName: String,
    phone: String,
    date: Date,
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    admin: String,
    program3DayMakkahMadinah: Boolean,
    program4DayMakkahMadinah: Boolean,
    program3DayMakkah: Boolean,
    programOneWayMakkah: Boolean,
    programReturnDammam: Boolean,
    members: [MemberSchema], // embed schema, not model
    services: [ServiceSchema], // embed schema, not model
    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "Card",
        "RajhiNetwork",
        "HalNetwork",
        "STC",
        "RajhiBank",
        "HalBank",
        "STCPay",
        "Other",
      ],
    },
    otherPaymentMethod: String,
    totalBeforeTax: Number,
    valueAddedTax: Number,
    totalAfterTax: Number,
    customerSignature: String,
    branchManagerSignature: String,
  },
  { timestamps: true }
);

// Function to generate invoice number, e.g. INV-20250803-0001
async function generateInvoiceNumber(doc) {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD

  // Count existing invoices created today to sequence number
  const count = await mongoose.model("TripForm").countDocuments({
    createdAt: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      $lte: new Date(new Date().setHours(23, 59, 59, 999)),
    },
  });

  // Increment by 1 for next invoice number
  const sequence = (count + 1).toString().padStart(4, "0");

  return `INV-${datePart}-${sequence}`;
}

TripFormSchema.pre("save", async function (next) {
  if (this.totalBeforeTax + this.valueAddedTax !== this.totalAfterTax) {
    return next(
      new Error(
        "Validation failed: totalAfterTax must equal totalBeforeTax + valueAddedTax"
      )
    );
  }

  // Enforce exactly one Active member and set customerId
  const activeMembers = this.members.filter((m) => m.member === "Active");
  if (activeMembers.length === 0) {
    return next(new Error("There must be exactly one Active member"));
  }
  if (activeMembers.length > 1) {
    return next(new Error("There can be only one Active member"));
  }

  this.customerId = activeMembers[0]._id;

  // Set all other members to Affiliate
  this.members.forEach((m) => {
    if (!m._id.equals(this.customerId)) {
      m.member = "Affiliate";
    }
  });

  // Generate invoiceNumber only if not set (new documents)
  if (!this.invoiceNumber) {
    try {
      this.invoiceNumber = await generateInvoiceNumber(this);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const TripForm = mongoose.model("TripForm", TripFormSchema);

module.exports = TripForm;
