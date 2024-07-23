const mongoose = require("mongoose");

const chartSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    baseUrl: {
      type: String,
      required: true,
    },
    chartId: {
      type: String,
      required: true,
    },
    adminUse: {
      type: Boolean,
      default: false,
      required: true,
    },

  },
  { timestamps: true }
);

const Chart = mongoose.model("Chart", chartSchema);

module.exports = Chart;
