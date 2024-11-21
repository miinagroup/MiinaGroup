import axios from "axios";
import * as actionTypes from "../constants/mineralConstants";

export const getMineralPrices = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/mineralSharePrice/minerals");
    dispatch({
      type: actionTypes.FETCH_MINERALS,
      payload: data,
    });
    localStorage.setItem("minerals", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getStockPrices = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/mineralSharePrice/stocks");
    dispatch({
      type: actionTypes.FETCH_STOCKS,
      payload: data,
    });
    localStorage.setItem("stocks", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getWeathers = (location) => async (dispatch) => {
  try {
    if (location !== "No Site" && location !== "NO SITE") {
      const { data } = await axios.get(`/api/weather/weather/${location}`);
      dispatch({
        type: actionTypes.FETCH_WEATHERS,
        payload: data,
      });
      localStorage.setItem("weathers", JSON.stringify(data));
    }
  } catch (error) {
    console.log(error);
  }
};
