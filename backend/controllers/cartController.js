const Cart = require("../models/CartModel");


const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "cartItems"
    );

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


const addToCart = async (req, res) => {
  // const { cartItems } = req.body.product? req.body.product : req.body;
  const { cartItems } = req.body;
  const userId = req.user._id;
  // console.log("REOOOOORDER ADDD",req.body);
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Update existing cart items
      for (let i = 0; i < cartItems?.length; i++) {
        let cartProduct = cart.cartItems.find(
          (p) => p.cartProducts[0]._id == cartItems[i].cartProducts[0]._id
        );
        if (cartProduct) {
          cartProduct.cartProducts[0].quantity +=
            cartItems[i].cartProducts[0].quantity;
        } else {
          cart.cartItems.push(cartItems[i]);
        }
      }

      await cart.save();
    } else {
      // Create new cart
      cart = new Cart({
        userId,
        cartItems,
      });
      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const addToCartUniform = async (req, res) => {
  // const { cartItems } = req.body.product? req.body.product : req.body;
  const { cartItems } = req.body;
  const userId = req.user._id;
  const uniformUserId = req.body.uniformUserId
  const uniformUserName = req.body.uniformUserName
  //console.log("REOOOOORDER ADDD", cartItems, uniformUserId);
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Update existing cart items
      for (let i = 0; i < cartItems?.length; i++) {
        let cartProduct = cart.cartItems.find(
          (p) => p.cartProducts[0]._id == cartItems[i].cartProducts[0]._id
        );
        if (cartProduct) {
          cartProduct.cartProducts[0].quantity +=
            cartItems[i].cartProducts[0].quantity;
        } else {
          cart.cartItems.push(cartItems[i]);
        }
      }
      cart.uniformUserId = uniformUserId
      cart.uniformUserName = uniformUserName
      await cart.save();
    } else {
      // Create new cart
      cart = new Cart({
        userId,
        uniformUserId,
        uniformUserName,
        cartItems,
      });
      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const reOrder = async (req, res) => {
  const { reOrderProducts } = req.body;
  const userId = req.user._id;
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      for (let i = 0; i < reOrderProducts?.length; i++) {
        let cartProduct = cart.cartItems.find(
          (p) => p.cartProducts[0]._id == reOrderProducts[i].cartProducts[0]._id
        );
        if (cartProduct) {
          cartProduct.cartProducts[0].quantity += reOrderProducts[i].cartProducts[0].quantity;
        } else {
          cart.cartItems.push(reOrderProducts[i]);
        }
      }
      await cart.save();
    } else {
      cart = new Cart({
        userId,
        cartItems: reOrderProducts,
      });
      await cart.save();
    }
    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


/* const reOrder = async (req, res) => {
  const { reOrderProducts } = req.body;
  console.log("REOOOOORDER",reOrderProducts);
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Please Update here

      await cart.save();
    } else {
      // Create new cart
      cart = new Cart({
        userId,
        cartItems: reOrderProducts,
      });
      await cart.save();
    }
    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}; */



const deleteItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    // Find the index of the cart item with the matching cartProducts._id
    let itemIndex = -1;
    let productIndex = -1;
    cart.cartItems.forEach((item, i) => {
      item.cartProducts.forEach((product, j) => {
        if (product._id.toString() === req.params.itemId) {
          itemIndex = i;
          productIndex = j;
        }
      });
    });

    // Remove the cart item at the found index
    if (itemIndex !== -1) {
      cart.cartItems[itemIndex].cartProducts.splice(productIndex, 1);
      if (cart.cartItems[itemIndex].cartProducts.length === 0) {
        cart.cartItems.splice(itemIndex, 1);
      }
    }

    // Save the updated cart
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
      message: error.message,
    });
  }
};


const removeAllItems = async (req, res) => {
  const userId = req.user._id;
  try {
    let cart = await Cart.findOne({ userId });
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

const updateItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    let productIndex = -1;
    let itemIndex = -1;
    cart.cartItems.forEach((item, i) => {
      item.cartProducts.forEach((product, j) => {
        if (product._id.toString() === req.params.itemId) {
          itemIndex = i;
          productIndex = j;
        }
      });
    });

    if (itemIndex === -1 || productIndex === -1) {
      throw new Error("Item not found");
    }

    if (req.body.quantity) {
      cart.cartItems[itemIndex].cartProducts[productIndex].quantity = req.body.quantity;
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


module.exports = {
  getCart,
  addToCart,
  addToCartUniform,
  reOrder,
  deleteItem,
  removeAllItems,
  updateItem,
};
// createCart,
// getUserCart,

/* 
const createCart = async (req, res) => {
  try {
    const newCart = new Cart({
      userId: req.user._id,
      items: [],
    });

    await newCart.save();

    res.status(201).json({
      status: "success",
      data: {
        cart: newCart,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to create cart",
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await Cart.findOne({ user: userId }).populate(
      "cartItems"
    );
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



const deleteItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    // Find the index of the cart item with the matching cartProducts[0]._id
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.cartProducts[0]._id === req.params.itemId
    );

    const removedItem = cart.cartItems.filter(
      (item) => item.cartProducts[0]._id === req.params.itemId
    );
    console.log("backend 删除 购物车", cart.cartItems[1].cartProducts[0]);
    console.log("backend 删除 购物车 产品", req.params.itemId);
    
    console.log("backend 删除 购物车 产品 的 index", itemIndex, removedItem);

    // Remove the cart item at the found index
    // cart.cartItems.splice(itemIndex, 1);

    // Save the updated cart
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
      message: "Unable to delete item from cart",
    });
  }
};

*/

/* const addToCart = async (req, res) => {
  const { cartItems } = req.body;
  const user = req.user._id;

  try {
    let cart = await Cart.findOne({ user });

    if (cart) {
      // Update existing cart items
      for (let i = 0; i < cartItems.length; i++) {
        let cartProduct = cart.cartItems.find((p) => p.cartProducts[0]._id == cartItems[i].cartProducts[0]._id);
        if (cartProduct) {
          cartProduct.cartProducts[0].quantity += cartItems[i].cartProducts[0].quantity;
        } else {
          cart.cartItems.push(cartItems[i]);
        }
      }

      await cart.save();
    } else {
      // Create new cart
      cart = new Cart({
        userId: user,
        cartItems,
      });
      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
 */
