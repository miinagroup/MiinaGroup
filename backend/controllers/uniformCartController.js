const UniformCart = require("../models/UniformCartModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const pdfValidate = require("../utils/pdfValidate");
const cron = require("node-cron");
const moment = require("moment-timezone");

const getUniformCart = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.find({}).sort({ userId: "asc" }).orFail();
        res.json(uniformCart);
    } catch (err) {
        next(err)
    }
};
const getUniformCartByCompany = async (req, res, next) => {
    try {
        const userCompany = req.params.userCompany
        const uniformCart = await UniformCart.find({ userCompany: userCompany }).sort({ userId: "asc" }).orFail();
        res.json(uniformCart);
    } catch (err) {
        next(err)
    }
};


const getUniformCartById = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findById(req.params.id).orFail();
        res.json(uniformCart);
    } catch (err) {
        next(err)
    }
};

const getUniformCartGetOne = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findOne({ userId: req.params.userId }).orFail();
        res.json(uniformCart);
    } catch (err) {
        next(err)
    }
};

const updateUniformCart = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findById(req.params.id).orFail();
        const { purchaseData } = req.body;
        if (uniformCart) {
            uniformCart.stock.map((item) => {
                if (purchaseData.itemName === item.itemName) {
                    item.itemName = purchaseData.itemName;
                    item.cartCount = purchaseData.cartCount;
                    item.purchaseCount = purchaseData.purchaseCount;
                    item.purchaseLimit = purchaseData.purchaseLimit;

                    if (item.cartProducts !== null) {
                        let itemExists = false
                        item.cartProducts.map((cartItem, idx) => {
                            if (cartItem?._id.toString() === purchaseData?.cartProducts[0]._id) {
                                cartItem.attrs = purchaseData?.cartProducts[0].attrs;
                                cartItem.size = purchaseData?.cartProducts[0].size;
                                cartItem.color = purchaseData?.cartProducts[0].color;
                                cartItem.price = purchaseData?.cartProducts[0].price;
                                cartItem.purchasePrice = purchaseData?.cartProducts[0].purchasePrice;
                                cartItem.category = purchaseData?.cartProducts[0].category;
                                cartItem.quantity += purchaseData?.cartProducts[0].quantity;
                                itemExists = true;
                            }
                        })
                        if (!itemExists) {
                            item.cartProducts.push({
                                "_id": purchaseData?.cartProducts[0]._id,
                                "attrs": purchaseData?.cartProducts[0].attrs,
                                "size": purchaseData?.cartProducts[0].size,
                                "color": purchaseData?.cartProducts[0].color,
                                "price": purchaseData?.cartProducts[0].price,
                                "purchasePrice": purchaseData?.cartProducts[0].purchasePrice,
                                "category": purchaseData?.cartProducts[0].category,
                                "quantity": purchaseData?.cartProducts[0].quantity,
                            })
                        }
                    } else {
                        console.log("No cartProducts");
                    }
                }
            })
            await uniformCart.save();
        }
        res.json({
            message: "UniformCart updated"
        });
    } catch (err) {
        next(err);
    }
};
const updateUniformCartByUser = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findOne({ userId: req.params.id }).orFail();
        const { purchaseData } = req.body;
        if (uniformCart) {
            uniformCart.stock.map((item) => {
                if (purchaseData.itemName === item.itemName) {
                    item.itemName = purchaseData.itemName;
                    if (item.cartCount !== 0) {
                        item.purchaseCount += item.cartCount;
                    }
                    item.cartCount = purchaseData.cartCount;

                    if (item.cartProducts !== null) {
                        let itemExists = false
                        item.cartProducts.map((cartItem, idx) => {
                            if (cartItem?._id.toString() === purchaseData?.cartProducts[0]._id) {
                                cartItem.attrs = purchaseData?.cartProducts[0].attrs;
                                cartItem.size = purchaseData?.cartProducts[0].size;
                                cartItem.color = purchaseData?.cartProducts[0].color;
                                cartItem.price = purchaseData?.cartProducts[0].price;
                                cartItem.category = purchaseData?.cartProducts[0].category;
                                itemExists = true;
                            }
                        })
                        if (!itemExists) {
                            item.cartProducts.push({
                                "_id": purchaseData?.cartProducts[0]._id,
                                "attrs": purchaseData?.cartProducts[0].attrs,
                                "size": purchaseData?.cartProducts[0].size,
                                "color": purchaseData?.cartProducts[0].color,
                                "price": purchaseData?.cartProducts[0].price,
                                "category": purchaseData?.cartProducts[0].category,
                                "quantity": purchaseData?.cartProducts[0].quantity,
                            })
                        }
                    } else {
                        console.log("No cartProducts");
                    }
                }
            })
            await uniformCart.save();
        }
        res.json({
            message: "UniformCart updated"
        });
    } catch (err) {
        next(err);
    }
};
const updateUniformCartLimit = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findById(req.params.id).orFail();
        const { purchaseData } = req.body;
        uniformCart.stock.map((item) => {
            purchaseData.map((data) => {
                if (data.itemName === item.itemName) {
                    item.purchaseLimit = data.purchaseLimit;
                }
            })
        })

        await uniformCart.save();
        res.json({
            message: "UniformCart updated"
        });
    } catch (err) {
        next(err);
    }
};

const updateUniformCartOnCartItemDelete = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findOne({ userId: req.params.id }).orFail();
        const { purchaseData } = req.body;
        if (uniformCart) {
            uniformCart?.stock.map((item) => {
                item.cartProducts.map((cart) => {
                    if (cart._id.toString() === purchaseData.id) {
                        cart.quantity -= purchaseData.qty;
                        item.cartCount -= purchaseData.qty;
                    }
                })
            })
            await uniformCart.save();
        }
        res.json({
            message: "UniformCart updated"
        });
    } catch (err) {
        next(err);
    }
};

const updateUniformCartOnEmptyCart = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findOne({ userId: req.params.id }).orFail();
        const { purchaseData } = req.body;
        if (uniformCart) {
            purchaseData?.deleteList?.map((data) => {
                uniformCart?.stock.map((item) => {
                    item.cartProducts.map((cart) => {
                        if (cart._id.toString() === data._id) {
                            cart.quantity = 0;
                            item.cartCount = 0;
                        }
                    })
                })
            })
            await uniformCart.save();
        }
        res.json({
            message: "UniformCart updated"
        });
    } catch (err) {
        next(err);
    }
};

const updateUniformCartOnPurchase = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findOne({ userId: req.params.id }).orFail();
        const { purchaseData } = req.body;
        if (uniformCart) {
            purchaseData?.map((data) => {
                uniformCart?.stock.map((item) => {
                    item.cartProducts.map((cart) => {
                        if (cart._id.toString() === data._id) {
                            item.cartCount = 0;
                            item.purchaseCount = item.purchaseCount + data.quantity;
                        }
                    })
                })
            })

            await uniformCart.save();
        }
        res.json({
            message: "UniformCart updated"
        });
    } catch (err) {
        next(err);
    }
};

const deleteUniformCart = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findOne({ uniformCartId: req.params.id });
        if (!uniformCart) {
            return res.status(404).json({ message: "uniformCart not found" });
        }
        // console.log(uniformCart);
        await uniformCart.deleteOne();
        res.json({ message: "uniformCart Deleted" });
    } catch (error) {
        next(error);
    }
};

/**Admin Operations */

const adminCreateUniformCart = async (req, res, next) => {
    try {
        const uniformCart = new uniformCarts();
        const { userId, shirtSKU, pantSKU, maxShirtQuantity, maxpantQuantity, extraShirtQuantity, extrapantQuantity, purchasedShirtQuantity, purchasedpantQuantity } = req.body;
        uniformCart.userId = userId;
        uniformCart.shirtSKU = shirtSKU;
        uniformCart.pantSKU = pantSKU;
        uniformCart.maxShirtQuantity = maxShirtQuantity;
        uniformCart.maxpantQuantity = maxpantQuantity;
        uniformCart.extraShirtQuantity = extraShirtQuantity;
        uniformCart.extrapantQuantity = extrapantQuantity;
        uniformCart.purchasedShirtQuantity = purchasedShirtQuantity;
        uniformCart.purchasedpantQuantity = purchasedpantQuantity;

        await uniformCart.save();
        res.json({
            message: "uniformCart created",
            uniformCartId: uniformCart._id,
        })

    } catch (err) {
        next(err);
    }
};

const adminRemoveUniformCart = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findOne({ uniformCartId: req.params.uniformCartId });
        if (!uniformCart) {
            return res.status(404).json({ message: "uniformCart not found" });
        }
        // console.log(uniformCart);
        await uniformCart.deleteOne();
        res.json({ message: "uniformCart Deleted" });
    } catch (error) {
        next(error);
    }
};

const adminUpdateUniformCart = async (req, res, next) => {
    try {
        const uniformCart = await UniformCart.findById(req.params.id).orFail();
        const { userId, shirtSKU, pantSKU, maxShirtQuantity, maxpantQuantity, extraShirtQuantity, extrapantQuantity, purchasedShirtQuantity, purchasedpantQuantity } = req.body;
        uniformCart.userId = userId || uniformCart.userId;
        uniformCart.shirtSKU = shirtSKU || uniformCart.shirtSKU;
        uniformCart.pantSKU = pantSKU || uniformCart.pantSKU;
        uniformCart.maxShirtQuantity = maxShirtQuantity || uniformCart.maxShirtQuantity;
        uniformCart.maxpantQuantity = maxpantQuantity || uniformCart.maxpantQuantity;
        uniformCart.extraShirtQuantity = extraShirtQuantity || uniformCart.extraShirtQuantity;
        uniformCart.extrapantQuantity = extrapantQuantity || uniformCart.extrapantQuantity;
        uniformCart.purchasedShirtQuantity = purchasedShirtQuantity || uniformCart.purchasedShirtQuantity;
        uniformCart.purchasedpantQuantity = purchasedpantQuantity || uniformCart.purchasedpantQuantity;

        await uniformCart.save();
        res.json({
            message: "uniformCart updated",
        });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    getUniformCart, getUniformCartByCompany, getUniformCartById, updateUniformCartByUser, updateUniformCartOnPurchase, updateUniformCartOnEmptyCart, getUniformCartGetOne, updateUniformCart, updateUniformCartLimit, updateUniformCartOnCartItemDelete, deleteUniformCart, adminRemoveUniformCart, adminUpdateUniformCart, adminCreateUniformCart,
};