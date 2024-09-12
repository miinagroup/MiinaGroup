import * as actionTypes from "../constants/categoryConstants";

// action从categoryAction里引过来的
export const getCategoriesReducer = (state = { categories: [], subcategories: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.SAVE_ATTR:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.INSERT_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
      case actionTypes.GET_SUBCATEGORIES_REQUEST:
        return {
          ...state,
          subcategories: action.payload,
        };
    default:
      return state;
  }
};
