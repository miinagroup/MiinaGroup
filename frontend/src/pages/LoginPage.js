import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const loginUserApiRequest = async (email, password, doNotLogout, ipAddress) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
    ipAddress,
  });
  if (data.userLoggedIn.doNotLogout)
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  if (!data.userLoggedIn.isAdmin) {
    const userId = data.userLoggedIn._id;
    const userName = data.userLoggedIn.name;
    const userCompany = data.userLoggedIn.company; var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var localDateTime = date + ' ' + time;
    const time_now = new Date();
    time_now.setMinutes(time_now.getMinutes() + 15);
    localStorage.setItem('trackDataScheduledLogoutTime', time_now)
    localStorage.setItem('trackData', JSON.stringify({ "userId": userId, "userName": userName, "userCompany": userCompany, "loginTime": localDateTime }));
  }

  return data;
};
const LoginPage = () => {
  const reduxDispatch = useDispatch();

  return (
    <LoginPageComponent
      loginUserApiRequest={loginUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};

export default LoginPage;
