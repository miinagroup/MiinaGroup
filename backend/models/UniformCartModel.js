const mongoose = require("mongoose");

const uniformCartSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        userCompany: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        userRole: {
            type: String,
            required: true,
        },
        stock: [
            {
                itemName: {
                    type: String,
                    required: true,
                },
                cartCount: {
                    type: Number,
                    required: true,
                    default: 0,
                },
                purchaseCount: {
                    type: Number,
                    required: true,
                    default: 0,
                },
                purchaseLimit: {
                    type: Number,
                    required: true,
                    default: 0,
                },
                cartProducts: [
                    {
                        attrs: {
                            type: String,
                            required: true,
                        },
                        size: {
                            type: String,
                            required: true,
                        },
                        price: {
                            type: Number,
                            required: true,
                        },
                        color: {
                            type: String,
                            required: true,
                        },
                        purchasePrice: {
                            type: Number,
                            required: false,
                        },
                        quantity: {
                            type: Number,
                            required: false,
                        },
                        cartDate: {
                            type: Date,
                            required: false,
                        },
                        purchaseDate: {
                            type: Date,
                            required: false,
                        },
                    }
                ]

            }
        ],

    },
    {
        timestamps: true,
    }
);

const UniformCart = mongoose.model("UniformCart", uniformCartSchema);
module.exports = UniformCart;