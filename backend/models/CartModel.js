const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
            purchaseprice: { type: Number, required: false },
            quantity: { type: Number, required: true },
            count: { type: Number, required: false },
            mnasku: { type: String, required: false },
            suppliersku: { type: String, required: false },
            attrs: { type: String, required: false },
            category: { type: String, required: false },
            size: { type: String, required: false },
            color: { type: String, required: false }
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
