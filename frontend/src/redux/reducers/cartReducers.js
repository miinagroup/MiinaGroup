import * as actionTypes from "../constants/cartConstants";
import Decimal from "decimal.js";

const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

const calculateTotalAmount = (subtotal, tax) => {
  const intermediateTotal = subtotal.plus(tax);
  return intermediateTotal.toDecimalPlaces(2);
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CART_ITEMS_LOGIN:
      const fetchedCartItems = action.payload;
      const initialItemsCount = fetchedCartItems.reduce(
        (count, item) => count + Number(item.cartProducts[0].quantity),
        0
      );
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

    case actionTypes.ADD_TO_CART:
      const productBeingAddedToCart = action.payload;
      const currentState = { ...state };
      const cartProductIndex = state.cartItems.findIndex(
        (x) =>
          x.cartProducts[0]._id === productBeingAddedToCart.cartProducts[0]._id
      );
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
            mnasku: productBeingAddedToCart.mnasku,
            image: productBeingAddedToCart.image,
            name: productBeingAddedToCart.name,
            saleunit: productBeingAddedToCart.saleunit,
            price: productBeingAddedToCart.price,
            productId: productBeingAddedToCart.productId,
          },
        ];
      }
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
      return currentState;

    // V1
    case actionTypes.REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (x) => x.cartProducts[0]._id !== action.payload.id
      );

      const removedItem = state.cartItems.find(
        (x) => x.cartProducts[0]._id === action.payload.id
      );
      const remainingItemsCount = updatedCartItems.reduce(
        (acc, item) => acc + Number(item.cartProducts[0].quantity),
        0
      );

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
