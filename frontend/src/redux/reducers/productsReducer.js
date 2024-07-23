import * as actionTypes from "../constants/productsConstants";

const initialState = {
    clientsSkuList: [],
};

export const productsReducer = (state = initialState, action) => {
    switch(action.type) {
      case  actionTypes.GET_CLIENTS_SKU_LIST_REQUEST:
        return {
          ...state,
          clientsSkuList: action.payload,
        };
  
      default:
        return state;
    }
  }
  