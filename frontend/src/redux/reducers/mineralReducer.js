import { FETCH_MINERALS } from '../constants/mineralConstants';
import { FETCH_STOCKS } from '../constants/mineralConstants';
import { FETCH_WEATHERS } from '../constants/mineralConstants';

const initialState = {
  minerals: [],
};

export const mineralReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MINERALS:
      return {
        ...state,
        minerals: action.payload,
      };

    default:
      return state;
  }
}

const initialStockState = {
  stocks: [],
};

export const stockReducer = (state = initialStockState, action) => {
  switch(action.type) {
    case FETCH_STOCKS:
      return {
        ...state,
        stocks: action.payload,
      };

    default:
      return state;
  }
}

const initialWeatherState = {
  stocks: [],
};

export const weatherReducer = (state = initialWeatherState, action) => {
  switch(action.type) {
    case FETCH_WEATHERS:
      return {
        ...state,
        stocks: action.payload,
      };

    default:
      return state;
  }
}
