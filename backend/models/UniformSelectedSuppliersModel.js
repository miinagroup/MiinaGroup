const mongoose = require("mongoose");
const uniformSelectedSuppliersSchema = mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        companySite: {
            type: String,
            required: false,
        },
        stock: [
            {
                item: {
                    type: String,
                    required: true,
                },
                supplierName: {
                    type: String,
                    required: true,
                },

            }
        ]
    }
);

const UniformSelectedSuppliers = mongoose.model("UniformSelectedSupplier", uniformSelectedSuppliersSchema);
module.exports = UniformSelectedSuppliers;