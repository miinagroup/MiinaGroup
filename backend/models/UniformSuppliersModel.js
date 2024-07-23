const mongoose = require("mongoose");
const uniformSuppliersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
        },
        stock: [
            {
                item: {
                    type: String,
                    required: true,
                },
            }
        ]
    }
);

const UniformSuppliers = mongoose.model("UniformSupplier", uniformSuppliersSchema);
module.exports = UniformSuppliers;