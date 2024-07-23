import * as actionTypes from "../constants/cartConstants";
import Decimal from "decimal.js";

const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

// 总体来说，就是把原来的redux加一个功能： post delete 数据 从cart数据库
// 然后就是 各种 传输的 数据 特别是array，搞不好就有个0，或者好几个0
// 就是多print数据，看看 数据的 format，后期要好好搞一下数据的 处理。

const calculateTotalAmount = (subtotal, tax) => {
  const intermediateTotal = subtotal.plus(tax);
  return intermediateTotal.toDecimalPlaces(2);
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    // 当use log之后，会导向主页面，然后header也会渲染，顺便就把下面触发了，读取cart数据，然后写入本地
    case actionTypes.FETCH_CART_ITEMS_LOGIN:
      const fetchedCartItems = action.payload;
      const initialItemsCount = fetchedCartItems.reduce(
        (count, item) => count + Number(item.cartProducts[0].quantity),
        0
      );
      /*       const initialCartSubtotal = fetchedCartItems.reduce(
        (subtotal, item) =>
          subtotal + item.cartProducts[0].quantity * (item.cartProducts[0].price*1.1),
        0
      ); */

      // QUICKBOOKS LOGIC, 不再用了，直接导入的话，就是简单的 1.1倍
      const calculateInitialSubtotal = fetchedCartItems.reduce(
        (totalNet, cartItem) => {
          const itemPrice = new Decimal(cartItem.cartProducts[0].price);
          const itemQuantity = new Decimal(cartItem.cartProducts[0].quantity);
          const itemNetAmount = itemPrice.mul(itemQuantity);
          return totalNet.plus(itemNetAmount);
        },
        new Decimal(0)
      );

      const roundedSubtotal = calculateInitialSubtotal.toDecimalPlaces(
        2,
        Decimal.ROUND_DOWN
      );

      let adjustedTax = (function calculateTaxAdjustment(baseValue) {
        const taxRate = new Decimal(10);
        const hundred = new Decimal(100);
        const rawTax = baseValue.mul(taxRate).div(hundred);
        return rawTax.toDecimalPlaces(2, Decimal.ROUND_DOWN);
      })(roundedSubtotal);


      const roundedFinalTotalAmount = calculateTotalAmount(roundedSubtotal, adjustedTax);

      // console.log(adjustedTax.toNumber());

      const initialState = {
        ...state,
        cartItems: fetchedCartItems,
        itemsCount: fetchedCartItems.reduce(
          (totalItems, item) => totalItems + item.cartProducts[0].quantity,
          0
        ),
        cartSubtotal: roundedFinalTotalAmount.toNumber(),
        taxAmount: adjustedTax.toNumber(),
      };
      return initialState;

    // V1
    case actionTypes.ADD_TO_CART:
      const productBeingAddedToCart = action.payload;
      const currentState = { ...state };
      // Find the cartProduct with the same _id as the one being added to the cart
      // 找一下现在添加的产品，对比 cart 数据里面的产品，然后读取相对应的 index，用于下面的update操作
      // 然后 console.log 一下productBeingAddedToCart，发现里面有个 0 ，所以都给加上[0]。
      // 应该是我的cartActions里面 addToCart 改了之后，本地数据和网络数据同步的时候造成的

      // console.log("ADD_TO_CART的数据", productBeingAddedToCart);

      const cartProductIndex = state.cartItems.findIndex(
        (x) =>
          x.cartProducts[0]._id === productBeingAddedToCart.cartProducts[0]._id
      );
      // console.log("ADD_TO_CART的数据 的 index", cartProductIndex);
      if (cartProductIndex >= 0) {
        // If the cartProduct exists, increase its quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[cartProductIndex].cartProducts[0].quantity =
          Number(updatedCartItems[cartProductIndex].cartProducts[0].quantity) +
          Number(productBeingAddedToCart.cartProducts[0].quantity);

        currentState.cartItems = updatedCartItems;
      } else {
        // If the cartProduct doesn't exist, add a new cartItem to the cartItems array
        currentState.cartItems = [
          ...state.cartItems,
          {
            cartProducts: productBeingAddedToCart.cartProducts,
            ctlsku: productBeingAddedToCart.ctlsku,
            image: productBeingAddedToCart.image,
            name: productBeingAddedToCart.name,
            saleunit: productBeingAddedToCart.saleunit,
            price: productBeingAddedToCart.price,
            productId: productBeingAddedToCart.productId,
            uniformUserId: productBeingAddedToCart.uniformUserId,
            uniformUserName: productBeingAddedToCart.uniformUserName,
          },
        ];
      }

      // Update itemsCount and cartSubtotal

      let itemsCount = 0;
      let cartSubtotal = new Decimal(0);

      currentState.cartItems.forEach((cartItem) => {
        cartItem.cartProducts.forEach((product) => {
          const quantity = new Decimal(product.quantity);
          const price = new Decimal(product.price);
          itemsCount += quantity.toNumber();
          cartSubtotal = cartSubtotal.plus(quantity.mul(price));
        });
      });

      const roundedCartSubtotal = cartSubtotal.toDecimalPlaces(
        2,
        Decimal.ROUND_DOWN
      );

      let adjustedTaxAddCart = (function calculateTaxAdjustment(baseValue) {
        const taxRate = new Decimal(10);
        const hundred = new Decimal(100);
        const rawTax = baseValue.mul(taxRate).div(hundred);
        return rawTax.toDecimalPlaces(2, Decimal.ROUND_DOWN);
      })(roundedCartSubtotal);

      const finalTotalAmountAddCart =
        roundedCartSubtotal.plus(adjustedTaxAddCart);
      const roundedFinalTotalAmountAddCart =
        calculateTotalAmount(roundedCartSubtotal, adjustedTaxAddCart);

      currentState.itemsCount = itemsCount;
      currentState.cartSubtotal = roundedFinalTotalAmountAddCart.toNumber();
      currentState.taxAmount = adjustedTaxAddCart.toNumber();


      // console.log("ADD_TO_CART的数据", currentState);

      return currentState;

    // V1
    case actionTypes.REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (x) => x.cartProducts[0]._id !== action.payload.id
      );

      const removedItem = state.cartItems.find(
        (x) => x.cartProducts[0]._id === action.payload.id
      );
      // console.log("移除购物车 reducer",action.payload.id );
      const remainingItemsCount = updatedCartItems.reduce(
        (acc, item) => acc + Number(item.cartProducts[0].quantity),
        0
      );

      /*       const remainingCartSubtotal = updatedCartItems.reduce(
        (acc, item) =>
          acc + item.cartProducts[0].quantity * item.cartProducts[0].price*1.1,
        0
      ); */

      const remainingCartSubtotal = updatedCartItems.reduce((acc, item) => {
        const originalPrice = new Decimal(item.cartProducts[0].price);
        const quantity = new Decimal(item.cartProducts[0].quantity);
        return acc.plus(quantity.mul(originalPrice));
      }, new Decimal(0));

      const roundedSubtotal2 = remainingCartSubtotal.toDecimalPlaces(
        2,
        Decimal.ROUND_DOWN
      );

      let roundedTax = (function calculateTaxAdjustment(baseValue) {
        const taxRate = new Decimal(10);
        const hundred = new Decimal(100);
        const rawTax = baseValue.mul(taxRate).div(hundred);
        return rawTax.toDecimalPlaces(2, Decimal.ROUND_DOWN);
      })(roundedSubtotal2);

      const totalAmount = roundedSubtotal2.plus(roundedTax);

      // console.log("remove item roundedTax", roundedTax.toString());

      return {
        ...state,
        cartItems: updatedCartItems,
        itemsCount: updatedCartItems.reduce(
          (acc, item) => acc + item.cartProducts[0].quantity,
          0
        ),
        cartSubtotal: totalAmount.toDecimalPlaces(2).toNumber(),
        removedItem: removedItem,
        taxAmount: roundedTax.toNumber(),
      };

    // In cartReducers.js
    case actionTypes.EDIT_QUANTITY:
      const updatedCartItemsQuantity = state.cartItems.map((item) => {
        if (item.cartProducts[0]._id === action.payload.id) {
          const newQuantity = Number(action.payload.quantity);
          return {
            ...item,
            cartProducts: [
              {
                ...item.cartProducts[0],
                quantity: newQuantity,
              },
            ],
          };
        } else {
          return item;
        }
      });

      const newItemsCount = updatedCartItemsQuantity.reduce(
        (acc, item) => acc + Number(item.cartProducts[0].quantity),
        0
      );

      /*       const newCartSubtotal = updatedCartItemsQuantity.reduce(
        (acc, item) =>
          acc + item.cartProducts[0].quantity * (item.cartProducts[0].price*1.1),
        0
      ); */

      const calculatedSubtotal = updatedCartItemsQuantity.reduce(
        (accumulator, currentItem) => {
          const itemPrice = new Decimal(currentItem?.cartProducts[0].price);
          const quantity = new Decimal(currentItem?.cartProducts[0].quantity);
          return accumulator.plus(quantity.mul(itemPrice));
        },
        new Decimal(0)
      );

      let subtotalTax = (function calculateTaxAdjustment(baseValue) {
        const taxRate = new Decimal(10);
        const hundred = new Decimal(100);
        const rawTax = baseValue.mul(taxRate).div(hundred);
        return rawTax.toDecimalPlaces(2, Decimal.ROUND_DOWN);
      })(calculatedSubtotal);

      // console.log("subtotalTax", subtotalTax, subtotalTax.toNumber());

      const roundedTotalWithTax = calculateTotalAmount(calculatedSubtotal, subtotalTax);

      return {
        ...state,
        cartItems: updatedCartItemsQuantity,
        itemsCount: newItemsCount,
        cartSubtotal: roundedTotalWithTax.toNumber(),
        taxAmount: subtotalTax.toNumber(),
      };

    case actionTypes.EMPTY_CART:
      return {
        ...state,
        cartItems: action.payload,
        itemsCount: 0,
        cartSubtotal: 0,
      };
    default:
      return state;
  }
};

/*
      FETCH_CART_ITEMS_LOGIN part
      const calculateInitialSubtotal = fetchedCartItems.reduce((totalNet, cartItem) => {
          const itemPrice = cartItem.cartProducts[0].price;
          const itemQuantity = cartItem.cartProducts[0].quantity;
          const itemNetAmount = itemPrice * itemQuantity;
          return totalNet + itemNetAmount;
        }, 0);

        const roundedSubtotal = Math.round(calculateInitialSubtotal * 100) / 100;

        let totalTaxAmountNotRound = roundedSubtotal * 0.1;

        let totalTaxAmount = Math.round(totalTaxAmountNotRound * 1000) / 1000;

        let adjustedTax;

        const totalTaxAmountMultiplied = Math.round(totalTaxAmount * 1000);

        if (totalTaxAmountMultiplied.toString().slice(-1) > 0) {
          console.log("Am I here?");
          adjustedTax = Math.floor(totalTaxAmount * 100) / 100 + 0.01;
          adjustedTax = parseFloat(adjustedTax.toFixed(2));
        } else {
          adjustedTax = parseFloat(totalTaxAmount.toFixed(2));
        }

        const finalTotalAmount = roundedSubtotal + adjustedTax;
        const roundedFinalTotalAmount = parseFloat(finalTotalAmount.toFixed(2));

        const initialState = {
          ...state,
          cartItems: fetchedCartItems,
          itemsCount: fetchedCartItems.reduce((totalItems, item) => totalItems + item.cartProducts[0].quantity, 0),
          cartSubtotal: roundedFinalTotalAmount,
          taxAmount: adjustedTax,
        }; */

// console.log("FETCH_CART_ITEMS_LOGIN 数据", initialState);

// localStorage.setItem("cart", JSON.stringify(fetchedCartItems));

/* ADD_TO_CART
currentState.cartItems.forEach((cartItem) => {
  cartItem.cartProducts.forEach((product) => {
    itemsCount += Number(product.quantity);
    cartSubtotal +=
      parseFloat(product.quantity) * parseFloat(product.price);
  });
});

const roundedCartSubtotal = Math.round(cartSubtotal * 100) / 100;

let taxAmountAddCartNotRound = roundedCartSubtotal * 0.1;

let taxAmountAddCart = Math.round(taxAmountAddCartNotRound * 1000) / 1000;

let adjustedTaxAddCart;

const taxAmountAddCartMultiplied = Math.round(taxAmountAddCart * 1000);

if (taxAmountAddCartMultiplied.toString().slice(-1) > 0) {
  adjustedTaxAddCart = Math.floor(taxAmountAddCart * 100) / 100 + 0.01;
  adjustedTaxAddCart = parseFloat(adjustedTaxAddCart.toFixed(2));
} else {
  adjustedTaxAddCart = parseFloat(taxAmountAddCart.toFixed(2));
}

const finalTotalAmountAddCart = roundedCartSubtotal + adjustedTaxAddCart;
const roundedFinalTotalAmountAddCart = parseFloat(
  finalTotalAmountAddCart.toFixed(2)
);

currentState.itemsCount = itemsCount;
currentState.cartSubtotal = roundedFinalTotalAmountAddCart;
currentState.taxAmount = adjustedTaxAddCart; */




/* 
    REMOVE_FROM_CART
      const remainingCartSubtotal = updatedCartItems.reduce((acc, item) => {
        const originalPrice = item.cartProducts[0].price;
        return acc + item.cartProducts[0].quantity * originalPrice;
      }, 0);

      const roundedSubtotal2 = Math.round(remainingCartSubtotal * 100) / 100;

      let taxAmountNotRound = roundedSubtotal2 * 0.1;

      let taxAmount = Math.round(taxAmountNotRound * 1000) / 1000;

      let roundedTax;

      const taxAmountMultiplied = Math.round(taxAmount * 1000);

      if (taxAmountMultiplied.toString().slice(-1) > 0) {
        roundedTax = Math.floor(taxAmount * 100) / 100 + 0.01;
        roundedTax = parseFloat(roundedTax.toFixed(2));
      } else {
        roundedTax = taxAmount;
      }

      roundedTax = Math.round(roundedTax * 100) / 100;

      const totalAmount = roundedSubtotal2 + roundedTax;

      console.log("remove item roundedTax", roundedTax);

      return {
        ...state,
        cartItems: updatedCartItems,
        itemsCount: updatedCartItems.reduce(
          (acc, item) => acc + item.cartProducts[0].quantity,
          0
        ),
        cartSubtotal: parseFloat(totalAmount.toFixed(2)),
        removedItem: removedItem,
        taxAmount: roundedTax,
      }; */

/*       EDIT_QUANTITY
      const calculatedSubtotal = updatedCartItemsQuantity.reduce(
        (accumulator, currentItem) => {
          const itemPrice = currentItem.cartProducts[0].price;
          return accumulator + currentItem.cartProducts[0].quantity * itemPrice;
        },
        0
      );

      let subtotalTaxNotRound = calculatedSubtotal * 0.1;

      let subtotalTax = Math.round(subtotalTaxNotRound * 1000) / 1000;

      let adjustedSubtotalTax;

      if (parseInt((subtotalTax * 1000).toString().slice(-1)) > 0) {
        adjustedSubtotalTax = Math.floor(subtotalTax * 100) / 100 + 0.01;
        adjustedSubtotalTax = parseFloat(adjustedSubtotalTax.toFixed(2));
      } else {
        adjustedSubtotalTax = subtotalTax;
      }

      adjustedSubtotalTax = Math.round(adjustedSubtotalTax * 100) / 100;

      const totalWithTax = calculatedSubtotal + adjustedSubtotalTax;

      const roundedTotalWithTax = Math.round(totalWithTax * 100) / 100;

      return {
        ...state,
        cartItems: updatedCartItemsQuantity,
        itemsCount: newItemsCount,
        cartSubtotal: roundedTotalWithTax,
        taxAmount: adjustedSubtotalTax,
      }; */
