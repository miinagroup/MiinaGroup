const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  path: { type: String, required: true },
});

const pdfSchema = mongoose.Schema({
  path: { type: String, required: false },
});

// const clientSkuSchema = new mongoose.Schema({
//   name: { type: String, required: false, unique: true },
//   number: { type: String, required: false }
// });

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: [
      {
        attrs: {
          type: String,
          required: true,
        },
        uom: {
          type: String,
          required: false,
        },
        count: {
          type: Number,
          required: true,
        },
        purchaseprice: {
          type: Number,
          required: false,
        },
        price: {
          type: Number,
          required: true,
        },
        barcode: {
          type: String,
          required: false,
        },
        suppliersku: {
          type: String,
          required: true,
        },
        mnasku: {
          type: String,
          required: true,
        },
        sales: {
          type: Number,
          default: 0,
        },
      },
    ],
    availability: [{
      local: {
        type: Number,
        required: false,
      },
      national: {
        type: Number,
        required: false,
      },
    }],
    supplier: {
      type: String,
      required: true,
    },
    RRP: {
      type: Number,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    categoryLinks: {
      type: String,
      required: false,
    },
    images: [imageSchema],
    pdfs: [pdfSchema],
    tags: { type: String, required: false },
    displayPrice: {
      type: Number,
      required: true,
    },
    saleunit: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: false,
    },
    standards: {
      type: String,
      required: false,
    },
    videoUrl: {
      type: String,
      required: false,
    },
    returnCalculator: {
      type: Boolean,
      required: false,
    },
    expireDate: {
      type: String,
      required: false,
    },
    sortOrder: {
      type: Number,
      require: false,
    },
    createdBy: {
      type: String,
      required: false,
    },
    editedBy: {
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
  {
    // 自动加时间戳
    timestamps: true,
  }
);

productSchema.index(
  {
    name: "text",
    // description: "text",
    // "stock.slrsku": "text",
    "stock.mnasku": "text",
    "stock.suppliersku": "text",
  },
  {
    name: "TextIndex",
    default_language: "english",
    weights: {
      name: 5,
      // description: 2,
      // "stock.slrsku": 1,
      "stock.mnasku": 1,
      "stock.suppliersku": 1,
    },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
