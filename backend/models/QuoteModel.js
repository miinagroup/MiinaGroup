const mongoose = require("mongoose");
const Product = require("./ProductModel");
const User = require("./UserModel");

const imageSchema = mongoose.Schema({
  path: { type: String, required: false },
});

const quoteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    // user part
    name: {
      type: String
    },
    userDescription: {
      type: String
    },
    clientImages: [imageSchema],
    quoteType: {
      type: String
    },
    quantity: {
      type: Number
    },
    // admin part
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: Product,
    },
    ctlsku: {
      type: String,
      required: false,
    },
    existingProduct: {
      type: Boolean,
      required: true,
    },
    expireDate: {
      type: Date
    },
    submittedAt: {
      type: Date
    },
    status: {
      // Received/ Processing / Completed
      type: String
    },
    accepted: {
      type: Boolean
    },
    purchased: {
      type: Boolean
    },
    repeatPurchase: [{
      isPurchased: {
        type: Boolean,
        required: false
      },
      purchasedDate: {
        type: Date,
        required: false,
      },
    }],
    reason: {
      // price / no more needed / other
      type: String
    },
    requested: {
      // after download official quote PDFs
      type: Boolean
    },
    quoteNumber: {
      // price / no more needed / other
      type: String
    },
    display: {
      required: false,
      type: Boolean,
      default: true
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
  {
    timestamps: true,
  }
);

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;
