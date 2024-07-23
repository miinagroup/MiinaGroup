const mongoose = require("mongoose");
const deliveryBookSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  emailHost: {
    type: String,
    required: true,
  },
  billingEmail: { type: String, required: true },
  companyAccount: { type: String, required: true },
  quickBooksCustomerId: { type: String, required: false },
  dueDays: {
    type: Number,
    required: false,
  },
  sites: [
    {
      name: { type: String, required: true },
      billingAddress: { type: String, required: true },
      deliveryAddress: { type: String, required: true },
      storeEmail: { type: String, required: false },
      siteSku: { type: String, required: true },
      // latLon: { type: String, required: false },
    },
  ],
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
});

const DeliveryBook = mongoose.model("DeliveryBook", deliveryBookSchema);
module.exports = DeliveryBook;
