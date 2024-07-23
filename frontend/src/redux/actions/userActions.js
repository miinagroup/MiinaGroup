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
        "weathers",
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



/* export const logout = () => (dispatch) => {
  // Remove access_token cookie
  document.cookie =
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Send logout request to server
  axios.get("/api/logout");

  // Remove user info from localStorage/sessionStorage
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");

  //Remove trackData
  localStorage.removeItem("trackData");
  localStorage.removeItem("trackDataScheduledLogoutTime");

  // Remove other data from localStorage
  localStorage.removeItem("isAuth");
  localStorage.removeItem("authToken");
  localStorage.removeItem("cart");
  // localStorage.removeItem("minerals");
  // localStorage.removeItem("stocks");
  localStorage.removeItem("weathers");

  // Redirect to login page
  document.location.href = "/";

  // Dispatch logout action
  dispatch({ type: LOGOUT_USER });
}; */
