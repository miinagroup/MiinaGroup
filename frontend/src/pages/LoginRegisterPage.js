import LoginPageComponent from "../components/PagesComponents/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";
import RegisterPageComponent from "../components/PagesComponents/RegisterPageComponent";
import { Container, Card, Tabs, Tab, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";


const LoginRegisterPage = ({ modalType }) => {
  const [selectedTab, setSelectedTab] = useState(modalType);
  const [userDetails, setUserDetails] = useState()

  const loginUserApiRequest = async (email, password, doNotLogout) => {
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
      doNotLogout,
    });
    if (data.userLoggedIn.doNotLogout)
      localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
    else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
    if (!data.userLoggedIn.isAdmin) {
      const userId = data.userLoggedIn._id;
      const userName = data.userLoggedIn.name + " " + data.userLoggedIn.lastName;
      const userCompany = data.userLoggedIn.company;
      let today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let localDateTime = date + " " + time;
      const local_Time = new Date();
      local_Time.setMinutes(local_Time.getMinutes() + 30);
      localStorage.setItem("trackDataScheduledLogoutTime", local_Time);
      localStorage.setItem(
        "trackData",
        JSON.stringify({
          userId: userId,
          userName: userName,
          userCompany: userCompany,
          loginTime: localDateTime,
        })
      );
    }
    return data;
  };

  const registerUserApiRequest = async (
    name,
    lastName,
    email,
    password,
    phone,
    mobile,
    location,
    company,
    deliveryAddress,
    billAddress,
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
      deliveryAddress,
      billAddress,
      abn
    });
    sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
    setUserDetails(data.userCreated)
    return data;
  };

  const getdeliveryBooks = async (email) => {
    const { data } = await axios.get("/api/deliveryBooks/deliveryBook/" + email);
    return data;
  };

  const getAlldeliveryBooks = async () => {
    const { data } = await axios.get("/api/deliveryBooks");
    return data;
  };

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("register")) {
      setSelectedTab("RegisterForm");
    }
  }, []);

  const reduxDispatch = useDispatch();

  const handleSelect = (key) => {
    setSelectedTab(key);
  };

  return (
      <Container className="LoginRegPage">
        <Card className="LoginReg">
        <Modal.Header closeButton></Modal.Header>

          <Card.Body>
            <Tabs
              activeKey={selectedTab}
              onSelect={handleSelect}
              id="uncontrolled-tab-example"
              className="mb-4"
            >
              {/* ************   Login Tab  ***************  */}
              <Tab eventKey="LoginForm" title="Login">
                <LoginPageComponent
                  loginUserApiRequest={loginUserApiRequest}
                  reduxDispatch={reduxDispatch}
                  setReduxUserState={setReduxUserState}
                  getAlldeliveryBooks={getAlldeliveryBooks}
                />
                <br />
              </Tab>

              {/* ************   Register Tab  ***************  */}
              <Tab eventKey="RegisterForm" title="Register">
                <RegisterPageComponent
                  registerUserApiRequest={registerUserApiRequest}
                  reduxDispatch={reduxDispatch}
                  setReduxUserState={setReduxUserState}
                  getAlldeliveryBooks={getAlldeliveryBooks}
                />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
  );
};

export default LoginRegisterPage;

