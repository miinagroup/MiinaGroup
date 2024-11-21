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
const createUniformCart = async (req, res, next) => {
    try {
        const { userId, userName, userCompany, userRole, stock } = req.body.userData1;
        console.log(userId, userName, userCompany, userRole, stock);
        console.log(req.body.userData1);

        //Validate required fields
        if (!userId || !userName || !userCompany || !userRole || !stock) {
            return res.status(400).json({ message: "All fields are required for insertion." });
        }

        // Create a new document
        const newDocument = {
            userId,
            userName,
            userCompany,
            userRole,
            stock,
        };

        // Insert the single document
        const result = await UniformCart.create(newDocument);
        console.log("Single insertion success:", result);

        return res.status(200).json({ message: "Insertion succeeded.", result });
    } catch (err) {
        console.error("Error in insertion:", err);
        return res.status(500).json({ message: "Insertion failed.", error: err });
    }
};

const adminCreateBulkUniformCart = async (req, res, next) => {
    try {
        var bulk = UniformCart.collection.initializeUnorderedBulkOp();
        const roleArray = req.body.userData
        console.log("userData", req.body.userData.length);
        if (!roleArray || roleArray.length === 0) {
            return res.status(400).json({ message: "No data provided for bulk operation." });
        }
        roleArray?.forEach((role) => {
            //console.log("Processing role with userId:", role.userId, role.stock);
            bulk.find({
                userId: role.userId
            }).updateOne(
                {
                    $set: {
                        userId: role.userId,
                        userName: role.userName,
                        userCompany: role.userCompany,
                        userRole: role.userRole,
                        stock: role.stock
                    }
                },
                { upsert: true }
            );
        })

        // Execute bulk operation if there are pending operations
        if (bulk.s && bulk.s.currentBatch) {
            const result = await bulk.execute();
            console.log("Bulk operation success:", result);
            return res.status(200).json({ message: "Bulk operation succeeded.", result });
        } else {
            console.log("No operations to execute in bulk.");
            return res.status(400).json({ message: "No bulk operations to execute." });
        }

    } catch (err) {
        console.error("Error in bulk operation:", err);
        return res.status(500).json({ message: "Bulk operation failed.", error: err });
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
        const uniformCart = await UniformCart.findOne({ userId: req.params.id }).orFail();
        const { userId, userName, userCompany, userRole, stock } = req.body.userData1;
        uniformCart.userId = userId || uniformCart.userId;
        uniformCart.userName = userName || uniformCart.userName;
        uniformCart.userCompany = userCompany || uniformCart.userCompany;
        uniformCart.userRole = userRole || uniformCart.userRole;
        uniformCart.stock = stock || uniformCart.stock;
        await uniformCart.save();
        res.json({
            message: "uniformCart updated",
        });
    } catch (err) {
        next(err);
    }
};

const updateUserCartBulk = async (req, res, next) => {
    try {
        const { userData } = req.body;

        if (!userData || userData.length === 0) {
            return res.status(400).json({ message: "No users provided for bulk update." });
        }
        // Prepare bulk operations
        const bulkOperations = userData.map((user) => ({
            updateOne: {
                filter: { userId: user.userId }, // Match the user by ID
                update: { $set: { userRole: user.userRole, stock: user.stock } }, // Update the user role
            },
        }));
        // Execute bulk operation
        const result = await UniformCart.bulkWrite(bulkOperations);
        res.status(200).json({
            message: "Success",
            modifiedCount: result.modifiedCount,
        });
    } catch (error) {
        console.error("Bulk update error:", error);
        res.status(500).json({ message: "Bulk update failed.", error: error.message });
    }
};

module.exports = {
    getUniformCart, getUniformCartByCompany, getUniformCartById, updateUniformCartByUser, updateUniformCartOnPurchase, updateUniformCartOnEmptyCart, getUniformCartGetOne, updateUniformCart, updateUniformCartLimit, updateUniformCartOnCartItemDelete, deleteUniformCart, adminRemoveUniformCart, adminUpdateUniformCart, createUniformCart, adminCreateBulkUniformCart, updateUserCartBulk
};