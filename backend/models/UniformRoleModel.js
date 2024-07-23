const mongoose = require("mongoose");

const uniformRoleSchema = mongoose.Schema(
    {

        role: {
            type: String,
            required: true,
        },
        stock: [
            {
                itemName: {
                    type: String,
                    required: true,
                },
                itemLimit: {
                    type: Number,
                    required: true,
                    default: 0,
                },
            }
        ]
    },
    {
        timestamps: true,
    }
);

const UniformRole = mongoose.model("UniformRole", uniformRoleSchema);
module.exports = UniformRole;