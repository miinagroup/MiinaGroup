import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstants";
import axios from "axios";

export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: userCreated,
  });
};

export const logout = () => async (dispatch) => {
  try {
    const clearClientStorage = () => {
      const localStorageItems = [
        "userInfo",
        "trackData",
        "trackDataScheduledLogoutTime",
        "isAuth",
        "authToken",
        "cart",
        "verificationPending",
        "categories",
      ];

      localStorageItems.forEach(item => localStorage.removeItem(item));

      sessionStorage.removeItem("userInfo");
    };

    const response = await axios.get("/api/logout");

    if (response.data === "access token cleared") {
      clearClientStorage();

      document.location.href = "/";

      dispatch({ type: LOGOUT_USER });
    } else {
      console.error("Server did not confirm logout");
    }
  } catch (error) {
    console.error("Logout request failed", error);
  }
};

