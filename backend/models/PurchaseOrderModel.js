const mongoose = require("mongoose");
const Product = require("./ProductModel");
const Supplier = require("./SupplierModel");

const purchaseOrderSchema = mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Supplier,
    },
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
    ctlCreditAccount: {
      type: String,
      required: true,
    },
    supplierABN: {
      type: String,
      required: true,
    },
    poNumber: {
      type: String,
      required: true,
    },
    poDate: {
      type: Date,
      required: true,
    },
    orderTotal: {
      itemsCount: { type: Number, required: true },
      cartSubtotal: { type: Number, required: true },
      taxAmount: { type: Number, required: false },
    },
    backOrderStatus: {
      type: Boolean,
      required: false,
      default: false,
    },
    deliveryMethod: {
      type: String,
      required: true,
    },
    poSent: {
      type: Boolean,
      required: true,
      default: false,
    },
    poSentAt: {
      type: Date,
      required: false,
    },
    poHasSent: {
      type: Number,
      required: false,
    },
    poCompleted: {
      type: Boolean,
      required: false,
    },
    poCartItems: [
      {
        productId: { type: String, required: false },
        name: { type: String, required: true },
        image: { type: String, required: true },
        saleunit: {
          type: Number,
          required: true,
        },
        poCartProducts: [
          {
            attrs: { type: String, required: true },
            uom: { type: String, required: true },
            purchaseprice: { type: Number, required: true },
            quantity: { type: Number, required: true },
            receivedQty: { type: Number, required: false },
            backOrderQty: { type: Number, required: false },
            ctlsku: { type: String, required: true },
            suppliersku: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

module.exports = PurchaseOrder;
