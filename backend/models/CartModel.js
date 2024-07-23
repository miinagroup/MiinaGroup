const mongoose = require("mongoose");

const clientSkuSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required: true }
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    uniformUserId: {
      type: String,
      required: false,
    },
    uniformUserName: {
      type: String,
      required: false,
    },
    cartItems: [
      {
        productId: { type: String, required: false },
        quoteId: { type: String, required: false },
        name: { type: String, required: true },
        image: { type: String, required: true },
        saleunit: {
          type: Number,
          required: true,
        },
        cartProducts: [
          {
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            count: { type: Number, required: false },
            ctlsku: { type: String, required: false },
            suppliersku: { type: String, required: false },
            attrs: { type: String, required: false },
            slrsku: { type: String, required: false },
            slrRandallsSku: { type: String, required: false },
            slrDaisyMilanoSku: { type: String, required: false },
            slrMaxwellsSku: { type: String, required: false },
            fmlCGOSku: { type: String, required: false },
            fmlTMHCSku: { type: String, required: false },
            evnMungariSku: { type: String, required: false },
            category: { type: String, required: false },
            size: { type: String, required: false },
            color: { type: String, required: false },
            clientsSku: { type: [clientSkuSchema], required: false},
            currentClientSku: {
              name: { type: String, required: false, unique: true },
              number: { type: String, required: false }
            }
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
