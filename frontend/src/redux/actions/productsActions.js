import * as actionTypes from "../constants/productsConstants";

import axios from "axios";

export const getClientsSkuList = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/products/getClientsSkuList');
        dispatch({
            type: actionTypes.GET_CLIENTS_SKU_LIST_REQUEST,
            payload: data,
        })
        localStorage.removeItem("clientsSkuList")
        localStorage.setItem("clientsSkuList", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

