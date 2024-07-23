const poCart = require("../models/POCartModel");

const getPOCart = async (req, res) => {
  try {
    const cart = await poCart
      .findOne({ userId: req.user._id })
      .populate("poCartItems");

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to retrieve cart",
    });
  }
};

const addToPOCart = async (req, res) => {
  try {

    const { poCartItems } = req.body;
    const userId = req.user._id;

    const cart = await poCart.findOne({ userId });
    if (cart) {
      for (let i = 0; i < poCartItems?.length; i++) {
        let poCartProduct = cart.poCartItems.find(
          (p) =>
            p.poCartProducts[0].ctlsku == poCartItems[i].poCartProducts[0].ctlsku
        );
        if (poCartProduct) {
          poCartProduct.poCartProducts[0].quantity +=
            poCartItems[i].poCartProducts[0].quantity;
        } else {
          cart.poCartItems.push(poCartItems[i]);
        }
      }

      await cart.save();

    } else {
      const cart = new poCart({
        userId,
        poCartItems,
      });

      await cart.save();

    }
    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteItemFromPOCart = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const userId = req.user._id;
    const cart = await poCart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart not found",
      });
    }

    let itemIndex = -1;
    cart.poCartItems.forEach((item, i) => {
      if (item._id.toString() === itemId) {
        itemIndex = i;
      }
    });
    
    if (itemIndex !== -1) {
      cart.poCartItems.splice(itemIndex, 1); 
      await cart.save();
      res.status(200).json({
        status: "success",
        message: "Item removed from POCart",
        data: {
          cart,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Item not found in cart",
      });
    }
  } catch (error) {
    console.error('Error removing item from PO cart:', error);
    res.status(500).json({
      status: "error",
      message: "Internal server error: " + error.message
    });
  }
};

const removeAllItems = async (req, res) => {
  const userId = req.user._id;
  try {
    let cart = await poCart.findOne({ userId });
    await cart.remove();
    res.status(200).json({
      status: "success",
      message: "All items removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to remove all items from cart",
    });
  }
};

const updateItemFromPOCart = async (req, res) => {
  try {
    const qty = req.body.quantity;

    const itemId = req.params.itemId;

    const cart = await poCart.findOne({ userId: req.user._id });

    let productIndex = -1;
    let itemIndex = -1;

    cart.poCartItems.forEach((item, i) => {
      item.poCartProducts.forEach((product, j) => {
        if (product._id.toString() === itemId) {
          itemIndex = i;
          productIndex = j;
        }
      });
    });

    if (itemIndex === -1 || productIndex === -1) {
      throw new Error("Item not found");
    }

    if (qty) {
      cart.poCartItems[itemIndex].poCartProducts[productIndex].quantity =
      qty;
    }

    await cart.save();

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to update item in cart",
    });
  }
};

const removePurchasedItems = async (req, res) => {
  try {
    const userId = req.user._id;
    const supplier = req.body.supplierName;
    let cart = await poCart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart not found",
      });
    }

    cart.poCartItems = cart.poCartItems.filter(item => item.supplier !== supplier);

    await cart.save();

    res.json({
      status: "success",
      message: "Purchased items removed successfully",
      data: cart
    });
    
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to remove purchased items from cart",
      error: error.message
    });
  }
};



module.exports = {
  getPOCart,
  addToPOCart,
  deleteItemFromPOCart,
  removeAllItems,
  updateItemFromPOCart,
  removePurchasedItems
};
