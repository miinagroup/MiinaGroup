import * as actionTypes from "../constants/categoryConstants";

import axios from "axios";

export const getCategories = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/categories");
        dispatch({
            type: actionTypes.GET_CATEGORIES_REQUEST,
            payload: data,
        })
        localStorage.removeItem("categories")
        localStorage.setItem("categories", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

export const getSubcategories = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/categories/subcategories");
        dispatch({
            type: actionTypes.GET_SUBCATEGORIES_REQUEST,
            payload: data,
        })
        localStorage.removeItem("subcategories")
        localStorage.setItem("subcategories", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}


export const saveAttributeToCatDoc = (key, val, categoryChoosen) => async (dispatch, getState) => {
    const { data } = await axios.post("/api/categories/attr", { key, val, categoryChoosen });
    if (data.categoryUpdated) {
        dispatch({
            type: actionTypes.SAVE_ATTR,
            payload: [...data.categoryUpdated],
        })
    }
}

export const newCategory = (category) => async (dispatch, getState) => {
    const cat = getState().getCategories.categories;
    const { data } = await axios.post("/api/categories", { category });
    if (data.categoryCreated) {
        dispatch({
            type: actionTypes.INSERT_CATEGORY,
            payload: [...cat, data.categoryCreated],
        })
    }
}

export const deleteCategory = (category) => async (dispatch, getState) => {
    const cat = getState().getCategories.categories;
    const categories = cat.filter((item) => item.name !== category);
    const { data } = await axios.delete("/api/categories/" + encodeURIComponent(category));
    if (data.categoryDeleted) {
        dispatch({
            type: actionTypes.DELETE_CATEGORY,
            payload: [...categories],
        })
    }
}