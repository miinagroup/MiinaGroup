const mongoose = require("mongoose");

const poCartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
        supplier: {
          type: String,
          required: true,
        },
        poCartProducts: [
          {
            purchaseprice: { type: Number, required: true },
            quantity: { type: Number, required: true },
            ctlsku: { type: String, required: false },
            suppliersku: { type: String, required: false },
            attrs: { type: String, required: false },
            uom: { type: String, required: false },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const POCart = mongoose.model("POCart", poCartSchema);

module.exports = POCart;
