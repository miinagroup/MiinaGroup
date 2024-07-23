const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    path: { type: String, required: true },
});

const pdfSchema = mongoose.Schema({
    path: { type: String, required: false },
});

const uniformSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: false,
        },
        brand: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: true,
        },
        supplierCode: {
            type: String,
            required: false,
        },
        saleUnit: {
            type: Number,
            required: false,
        },
        item: {
            type: String,
            required: false,
        },
        stock: [
            {
                attrs: {
                    type: String,
                    required: true,
                },
                size: {
                    type: String,
                    required: true,
                },
                ctlsku: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                color: {
                    type: String,
                    required: false,
                },
                purchasePrice: {
                    type: Number,
                    required: false,
                },
            }
        ],
        images: [imageSchema],
        pdfs: [pdfSchema]
    },
    {
        timestamps: true,
    }
);

const Uniform = mongoose.model("Uniform", uniformSchema);

module.exports = Uniform;