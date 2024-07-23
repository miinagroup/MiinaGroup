import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

/* ****** ADD_TO_CART ****** */
export const addToCart =
  (productId, qty, selectedStock, quoteId) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    const cartItems = [
      {
        productId: data._id,
        name: data.name,
        saleunit: data.saleunit,
        image: data.images[0].path ?? null,
        cartProducts: [{ ...selectedStock, quantity: qty }],
        quoteId: quoteId ?? null,
      },
    ];
    // console.log("cartAction的 加入购物车 数据", cartItems);
    try {
      const { data } = await axios.post(`/api/cart/add`, { cartItems });
      // console.log("cartDDDDDDAATTTTTTT", cartItems);
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: cartItems[0],
      });
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.log(error);
    }
  };

//uniform Cart Add
export const addToCartUniform =
  (productId, qty, selectedStock) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/uniforms/get-one/${productId}`);
    const cartItems = [
      {
        productId: data._id,
        name: data.name,
        image: data.images[0].path ?? null,
        saleunit: data.saleUnit,
        cartProducts: [{ ...selectedStock, quantity: qty }],
      },
    ];
    //console.log("cartAction的 加入购物车 数据", cartItems);
    try {
      const { data } = await axios.post(`/api/cart/add`, { cartItems });
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: cartItems[0],
      });
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.log(error);
    }
  };

export const addToCartUniformByManager =
  (productId, qty, uniformUserId, uniformUserName, selectedStock) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/uniforms/get-one/${productId}`);
    const cartItems = [
      {
        productId: data._id,
        name: data.name,
        image: data.images[0].path ?? null,
        saleunit: data.saleUnit,
        uniformUserId: uniformUserId,
        uniformUserName: uniformUserName,
        cartProducts: [{ ...selectedStock, quantity: qty }],
      },
    ];
    // console.log("cartAction的 加入购物车 数据", cartItems);
    try {
      const { data } = await axios.post(`/api/cart/addUniform`, { cartItems, uniformUserId, uniformUserName });
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: cartItems[0],
      });
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.log(error);
    }
  };

/* ****** RE_ORDER ****** */
/* export const reOrder = (orderId) => async (dispatch, getState) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  const reOrderProducts = data.cartItems.map((cartItem) => ({
    productId: cartItem.productId,
    name: cartItem.name,
    saleunit: cartItem.saleunit,
    image: cartItem.image ?? null,
    cartProducts: [...cartItem.cartProducts],
  }));

  try {
    for (const product of reOrderProducts) {
      const { data } = await axios.post(`/api/cart/add`, { cartItems: [product] });
      console.log("reOOOOOrder", product);
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
          productId: product.productId,
          name: product.name,
          saleunit: product.saleunit,
          image: product.image ?? null,
          cartProducts: product.cartProducts,
          ctlsku: product.ctlsku,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
}; */



export const reOrder = (orderId) => async (dispatch, getState) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  // const { cartItems } = data;
  const reOrderProducts = data.cartItems.map((cartItem) => ({
    productId: cartItem.productId,
    name: cartItem.name,
    saleunit: cartItem.saleunit,
    image: cartItem.image ?? null,
    cartProducts: [...cartItem.cartProducts],
  }));
  try {
    const { data } = await axios.post(`/api/cart/reOrder`, { reOrderProducts });
    reOrderProducts.forEach((product) => {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
          productId: product.productId,
          name: product.name,
          saleunit: product.saleunit,
          image: product.image ?? null,
          cartProducts: product.cartProducts,
          ctlsku: product.ctlsku,
        },
      });
    });
    if (data.success === true) {
      window.location.href = "/user/cart-details";
    }
  } catch (error) {
    console.log(error);
  }
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

/* ****** BACK_ORDER ****** */
export const backOrder = (orderId) => async (dispatch, getState) => {
  console.log("I am here back order!!!");
  try {
    const { data } = await axios.get("/api/orders/user/" + orderId);
    const reOrderProducts = data.cartItems
      .filter(cartItem => cartItem.cartProducts[0].backOrder > 0)
      .map(cartItem => ({
        productId: cartItem.productId,
        name: cartItem.name,
        saleunit: cartItem.saleunit,
        image: cartItem.image ?? null,
        cartProducts: cartItem.cartProducts.map((product, index) => ({
          ...product,
          quantity: index === 0 ? cartItem.cartProducts[0].backOrder : product.quantity,
        })),
      }));
    console.log(reOrderProducts);

    if (reOrderProducts.length > 0) {
      const { data } = await axios.post(`/api/cart/reOrder`, { reOrderProducts });
      const response = await axios.put("/api/orders/markAsBackOrder/" + orderId);
      reOrderProducts.forEach((product) => {
        dispatch({
          type: actionTypes.ADD_TO_CART,
          payload: {
            productId: product.productId,
            name: product.name,
            saleunit: product.saleunit,
            image: product.image ?? null,
            cartProducts: product.cartProducts,
          },
        });
      });
      localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
      if (data.success === true && response.status === 200) {
        window.location.href = "/admin/cart-details";
      }
    }
  } catch (error) {
    console.log(error);
  }
};


/* ****** REMOVE_ITEM ****** */
export const removeFromCart =
  (id, qty, price) => async (dispatch, getState) => {
    try {
      const { data } = await axios.delete("/api/cart/delete/" + id);
      // console.log("购物车-移除产品",id);
      dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: { id: id, qty: qty, price: price },
      });
    } catch (error) {
      console.log(error);
    }
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };

/* ****** EDIT_QUANTITY ****** */
export const editQuantity = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.EDIT_QUANTITY,
      payload: { id: id, quantity: qty },
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    const { data } = await axios.put("/api/cart/update/" + id, { quantity: qty });
    // console.log("cartAction的 编辑购物车 数据", data);
  } catch (error) {
    console.log(error);
  }
};


/* ****** EMPTY_CART ****** */
export const emptyCart = () => async (dispatch) => {
  // 不要用clear 要用 removeItem，这个 clear 会移除所有的 localStorage
  try {
    const { data } = await axios.delete("/api/cart/remove");
    localStorage.removeItem("cart");
    dispatch({
      type: actionTypes.EMPTY_CART,
      payload: [],
    });
  } catch (error) {
    console.log(error);
  }
};

// Fetch cart items for logged in user
export const fetchCartItemsLogin = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/cart");

    // Safely check for nested properties
    const cartItems = data && data.data && data.data.cart && data.data.cart.cartItems ? data.data.cart.cartItems : [];
    const cart = data?.data?.cart
    var updatedCartItems = []
    if (cart?.uniformUserId) {
      cartItems?.map((item) => {
        updatedCartItems.push(
          {
            productId: item._id,
            name: item.name,
            image: item.image,
            saleunit: item.saleunit,
            uniformUserId: cart?.uniformUserId,
            uniformUserName: cart?.uniformUserName,
            cartProducts: [{ ...item.cartProducts[0] }],
          },
        )
      })
    } else {
      updatedCartItems = cartItems
    }
    //console.log("用户购物车Mongo data", updatedCartItems);
    dispatch({
      type: actionTypes.FETCH_CART_ITEMS_LOGIN,
      payload: updatedCartItems,
    });
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  } catch (error) {
    console.log(error);
  }
};


/* export const addToCart =
  (productId, qty, selectedStock) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        productId: data._id,
        name: data.name,
        image: data.images[0] ?? null,
        cartProducts: [{ ...selectedStock, quantity: qty }],
        ctlsku: data.ctlsku,
      },
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    console.log("addToCart-data", data);
  }; */
