const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  path: { type: String, required: true },
});

const pdfSchema = mongoose.Schema({
  path: { type: String, required: false },
});

const clientSkuSchema = new mongoose.Schema({
  name: { type: String, required: false, unique: true },
  number: { type: String, required: false }
});

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
        ctlsku: {
          type: String,
          required: true,
        },
        sales: {
          type: Number,
          default: 0,
        },
        QuickBooksItemID: {
          type: String,
          required: false,
        },
        slrsku: { type: String, required: false },
        slrRandallsSku: { type: String, required: false },
        slrDaisyMilanoSku: { type: String, required: false },
        slrMaxwellsSku: { type: String, required: false },
        fmlCGOSku: { type: String, required: false },
        fmlTMHCSku: { type: String, required: false },
        evnMungariSku: { type: String, required: false },
        clientsSku: { type: [clientSkuSchema], required: false}
      },
    ],

    // material: {
    //   type: String,
    //   required: true,
    // },
    // length: {
    //   type: String,
    //   required: true,
    // },
    // width: {
    //   type: String,
    //   required: true,
    // },
    // thickness: {
    //   type: String,
    //   required: true,
    // },
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
    images: [imageSchema],
    pdfs: [pdfSchema],
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
    "stock.slrsku": "text",
    "stock.ctlsku": "text",
    "stock.suppliersku": "text",
    "stock.slrRandallsSku": "text",
    "stock.slrDaisyMilanoSku": "text",
    "stock.slrMaxwellsSku": "text",
    "stock.fmlCGOSku": "text",
    "stock.fmlTMHCSku": "text",
    "stock.evnMungariSku": "text",
  },
  {
    name: "TextIndex",
    default_language: "english",
    weights: {
      name: 5,
      // description: 2,
      "stock.slrsku": 1,
      "stock.ctlsku": 1,
      "stock.suppliersku": 1,
    },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
