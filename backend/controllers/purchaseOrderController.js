const PurchaseOrder = require("../models/PurchaseOrderModel");
const Supplier = require("../models/SupplierModel");
const Product = require("../models/ProductModel");
const poCart = require("../models/POCartModel");

const getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find();
    res.status(200).json({
      status: "success",
      data: {
        purchaseOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to retrieve purchase orders",
    });
  }
};

const getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate(
      "supplierId"
    );
    res.status(200).json({
      status: "success",
      purchaseOrder,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to retrieve purchase order",
    });
  }
};

const createPurchaseOrder = async (req, res) => {
  try {
    const {
      supplierId,
      supplierName,
      supplierSalesEmail,
      supplierSalesPhone,
      supplierAddress,
      ctlCreditAccount,
      supplierABN,
      poNumber,
      poDate,
      orderTotal,
      deliveryMethod,
      poCartItems,
    } = req.body;

    if (
      !supplierId ||
      !supplierName ||
      !supplierSalesEmail ||
      !supplierSalesPhone ||
      !supplierAddress ||
      !ctlCreditAccount ||
      !supplierABN ||
      !poNumber ||
      !poDate ||
      !orderTotal ||
      !deliveryMethod ||
      !poCartItems
    ) {
      return res.status(400).send("All inputs are required");
    }

    const purchaseOrder = new PurchaseOrder({
      supplierId: supplierId,
      supplierName: supplierName,
      supplierSalesEmail: supplierSalesEmail,
      supplierSalesPhone: supplierSalesPhone,
      supplierAddress: supplierAddress,
      ctlCreditAccount: ctlCreditAccount,
      supplierABN: supplierABN,
      poNumber: poNumber,
      poDate: poDate,
      orderTotal: orderTotal,
      deliveryMethod: deliveryMethod,
      poCartItems: poCartItems,
    });

    const createdPO = await purchaseOrder.save();

    const userId = req.user._id;
    let cart = await poCart.findOne({ userId });

    if (cart) {
      cart.poCartItems = cart.poCartItems.filter(
        (item) => item.supplier !== supplierName
      );
      await cart.save();
    }

    res.status(201).json({
      status: "success",
      message: "Purchase order created",
      data: createdPO,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to create purchase order",
    });
  }
};

const deletePurchaseOrder = async (req, res) => {
  try {
    const { isAdmin, isSuperAdmin, email } = req.user;

    const purchaseOrder = await PurchaseOrder.findById(req.params.id);

    if (!purchaseOrder) {
      return res.status(404).json({
        status: "error",
        message: "Purchase order not found",
      });
    }

    if (isAdmin && !isSuperAdmin) {
      const editHistoryEntry = {
        operator: email,
        editedAt: new Date(),
        function: "delete purchase order",
      };

      purchaseOrder.editeHistroys.push(editHistoryEntry);
      await purchaseOrder.save();

      return res
        .status(403)
        .json({ message: "You do not have permission to delete orders." });
    }

    await purchaseOrder.remove();
    res.status(200).json({
      status: "success",
      message: "Purchase order deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to delete purchase order",
    });
  }
};

const getTodayPONumber = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const largestPONumber = await PurchaseOrder.findOne({
    createdAt: {
      $gte: today,
      $lt: tomorrow,
    },
  })
    .select("poNumber")
    .sort("-poNumber");

  if (!largestPONumber) {
    return res.json({
      message: "No purchase orders found for today.",
    });
  }
  res.status(200).json({
    status: "success",
    poNumber: largestPONumber.poNumber,
  });
};

const updatePurchaseOrder = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);

    if (!purchaseOrder) {
      return res.status(404).json({
        status: "error",
        message: "Purchase order not found",
      });
    }

    let hasBackOrder = false;
    let counter = 0

    for (const item of purchaseOrder.poCartItems) {
      const updatedCartItem = cartItems.find(
        (ci) => ci.poCartProducts[0]._id.toString() === item.poCartProducts[0]._id.toString()
      );
      if (updatedCartItem) {

        for (const product of item.poCartProducts) {
          const updatedProduct = updatedCartItem.poCartProducts.find(
            (p) => p.ctlsku === product.ctlsku
          );
          if (updatedProduct) {
            const currentReceivedQty = Number(product.receivedQty) || 0;
            const additionalReceivedQty =
              Number(updatedProduct.receivingQty) || 0;

            product.receivedQty = currentReceivedQty + additionalReceivedQty;
            product.backOrderQty = product.quantity - product.receivedQty;
            if (product.quantity === product.receivedQty) {
              counter++
            }
            const productToUpdate = await Product.findOne({
              "stock.ctlsku": product.ctlsku,
            });
            if (productToUpdate) {
              const stockEntry = productToUpdate.stock.find(
                (stock) => stock.ctlsku === product.ctlsku
              );
              if (stockEntry) {
                stockEntry.count += additionalReceivedQty;
                await productToUpdate.save();
              }
            }

            if (product.receivedQty !== product.quantity) {
              hasBackOrder = true;
            }
          }
        }
      }
    }
    if (purchaseOrder.poCartItems.length === counter)
      purchaseOrder.poCompleted = true
    else
      purchaseOrder.poCompleted = false
    purchaseOrder.backOrderStatus = hasBackOrder;
    await purchaseOrder.save();

    res.status(200).json({
      status: "success",
      message: "Purchase order updated",
      data: purchaseOrder,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to update purchase order",
      error: error.message,
    });
  }
};

const updatePurchaseOrderStatus = async (req, res) => {
  try {
    const { order } = req.body;
    const purchaseOrder = await PurchaseOrder.findById(order._id);

    if (!purchaseOrder) {
      return res.status(404).json({
        status: "error",
        message: "Purchase order not found",
      });
    }
    let counter = 0
    if (purchaseOrder) {
      purchaseOrder?.poCartItems?.map((poCartItem) => {
        if (poCartItem.poCartProducts[0].quantity === poCartItem.poCartProducts[0].receivedQty)
          counter++
      })
    }
    if (purchaseOrder?.poCartItems.length === counter)
      purchaseOrder.poCompleted = true
    else
      purchaseOrder.poCompleted = false

    await purchaseOrder.save();

    res.status(200).json({
      status: "success",
      message: "Purchase order updated",
      data: purchaseOrder,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to update purchase order",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  deletePurchaseOrder,
  getTodayPONumber,
  updatePurchaseOrder,
  updatePurchaseOrderStatus
};
