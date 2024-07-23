const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: true,
    },
    supplierSalesEmail: {
      type: String,
      required: true,
    },
    supplierSalesPhone: {
      type: String,
      required: true,
    },
    supplierAddress: {
      type: String,
      required: true,
    },
    supplierCity: {
      type: String,
      required: true,
    },
    supplierState: {
      type: String,
      required: true,
    },
    supplierPostcode: {
      type: String,
      required: true,
    },
    supplierCountry: {
      type: String,
      required: true,
    },
    supplierBillingEmail: {
      type: String,
      required: true,
    },
    supplierBillingPhone: {
      type: String,
      required: false,
    },
    ctlCreditAccount: {
      type: String,
      required: false,
    },
    supplierABN: {
      type: String,
      required: false,
    },
    editeHistroys: [
        {
          operator: {
            type: String,
            required: false,
          },
          editedAt: {
            type: Date,
            required: false,
          },
          function: {
            type: String,
            required: false,
          },
        },
      ],

  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;