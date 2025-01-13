import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";
import { getCategoriesReducer } from "./reducers/categoryReducers";
// import { productsReducer } from "./reducers/productsReducer";

const reducer = combineReducers({
  cart: cartReducer,
  userRegisterLogin: userRegisterLoginReducer,
  getCategories: getCategoriesReducer,
  // products: productsReducer
});

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const categoriesInLocalStorage = localStorage.getItem("categories")
  ? JSON.parse(localStorage.getItem("categories"))
  : [];
const subcategoriesInLocalStorage = localStorage.getItem("subcategories")
  ? JSON.parse(localStorage.getItem("subcategories"))
  : [];
const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : {};

const productsInLocalStorage = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];


const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
    itemsCount: cartItemsInLocalStorage
      ? cartItemsInLocalStorage.reduce((totalQuantity, cartItem) => {
        const productQuantity = cartItem.cartProducts.reduce(
          (quantity, product) => quantity + Number(product.quantity),
          0
        );
        return totalQuantity + productQuantity;
      }, 0)
      : 0,

    cartSubtotal: cartItemsInLocalStorage
      ? cartItemsInLocalStorage.reduce((totalPrice, cartItem) => {
        const productPrice = cartItem.cartProducts.reduce(
          (price, product) => price + product.price * 1.1 * product.quantity,
          0
        );
        return totalPrice + productPrice;
      }, 0)
      : 0,
    /*       cartSubtotal: cartItemsInLocalStorage
      ? cartItemsInLocalStorage.reduce((totalPrice, cartItem) => {
          const productPrice = cartItem.cartProducts.reduce(
            (price, product) => {
              const originalPrice = product.price;
              const taxAmount = originalPrice * 0.1;
              const roundedTax = parseFloat(taxAmount.toFixed(2));
              const totalPricePerProduct = (originalPrice + roundedTax).toFixed(2);
              return price + totalPricePerProduct * product.quantity;
            },
            0
          );
          return totalPrice + productPrice;
        }, 0)
      : 0, */

  },
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
  getCategories: {
    categories: categoriesInLocalStorage,
    subcategories: subcategoriesInLocalStorage,
  },
  // getCategories: categoriesInLocalStorage,
  // getSubcategories: subcategoriesInLocalStorage,
  products: productsInLocalStorage
};

// console.log('cartItemsInLocalStorage',cartItemsInLocalStorage);
// console.log('INITIAL_STATE',INITIAL_STATE);

const middleware = [thunk];
const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
