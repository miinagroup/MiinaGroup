import RegisterPageComponent from "./components/RegisterPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const registerUserApiRequest = async (
  name,
  lastName,
  email,
  password,
  phone,
  mobile,
  location,
  company,
  role,
  deliveryAddress,
  billAddress,
  state,
  postCode,
  abn
) => {
  const { data } = await axios.post("/api/users/register", {
    name,
    lastName,
    email,
    password,
    phone,
    mobile,
    location,
    company,
    role,
    deliveryAddress,
    billAddress,
    state,
    postCode,
    abn
  });
  sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var localDateTime = date + ' ' + time;
  localStorage.setItem('trackData', JSON.stringify({ "user": email, "loginTime": localDateTime }));

  return data;
};

const RegisterPage = () => {
  const reduxDispatch = useDispatch();
  return (
    <RegisterPageComponent
      registerUserApiRequest={registerUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};
export default RegisterPage;
