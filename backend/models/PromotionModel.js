const mongoose = require("mongoose");

const promotionSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    rotateDays: {
      type: Number,
      required: false,
    },
    detail: [
      {
        image: {
          type: String,
          required: true,
        },
        redirectURL: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
