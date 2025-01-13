import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";
import RegisterPageComponent from "./components/RegisterPageComponent";
import { Container, Card, Tabs, Tab } from "react-bootstrap";
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
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var localDateTime = date + " " + time;
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
    role,
    deliveryAddress,
    billAddress,
    // state,
    // postCode,
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
      // state,
      // postCode,
      abn
    });
    /* 传信息去redux ？？？？*/
    sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
    /* 如果注册成功了，就转去user page */
    // if (data.success === "User created") window.location.href = "/user";

    setUserDetails(data.userCreated)
    return data;
  };

  const getdeliveryBooks = async (email) => {
    const { data } = await axios.get("/api/deliveryBooks/deliveryBook/" + email);
    return data;
  };

  const getAlldeliveryBooks = async (email) => {
    const { data } = await axios.get("/api/deliveryBooks");
    return data;
  };

  const getAllUniformRole = async () => {
    const { data } = await axios.get("/api/uniformRoles");
    return data;
  }

  const handleUniformCart = async (userData) => {
    try {
      const userData1 = userData[0]
      const updateResponse = await axios.post("/api/uniformCarts/create", { userData1 });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  useEffect(() => {
    if (userDetails) {
      try {
        getAllUniformRole()
          .then((data) => {
            let userData = []
            let roleData = []
            let flag = 0

            if (data?.map((role) => {
              if (role.role?.toUpperCase() === userDetails.role?.toUpperCase()) {
                if (role.stock) {
                  role.stock?.map((sRole) => {
                    roleData.push({
                      "_id": sRole._id,
                      "itemName": sRole.itemName,
                      "cartCount": 0,
                      "purchaseCount": 0,
                      "purchaseLimit": sRole.itemLimit
                    })
                  })
                }
                userData.push({
                  "userId": userDetails._id,
                  "userName": userDetails.name + " " + userDetails.lastName,
                  "userCompany": userDetails.company,
                  "userRole": userDetails.role,
                  "stock": roleData
                })
                flag++
              }
            }))
              if (flag === 0) {
                roleData = [{
                  "_id": "6620a0445e581b7b980b107a",
                  "itemName": "SHIRTS",
                  "cartCount": 0,
                  "purchaseCount": 0,
                  "purchaseLimit": 5
                },
                {
                  "_id": "6620a0585e581b7b980b1083",
                  "itemName": "JACKETS",
                  "cartCount": 0,
                  "purchaseCount": 0,
                  "purchaseLimit": 5
                },
                {
                  "_id": "6620a0685e581b7b980b108c",
                  "itemName": "PANTS",
                  "cartCount": 0,
                  "purchaseCount": 0,
                  "purchaseLimit": 5
                },
                {
                  "_id": "6620a0805e581b7b980b1095",
                  "itemName": "OVERALLS",
                  "cartCount": 0,
                  "purchaseCount": 0,
                  "purchaseLimit": 5
                },
                {
                  "_id": "6620a0925e581b7b980b109e",
                  "itemName": "BOOTS",
                  "cartCount": 0,
                  "purchaseCount": 0,
                  "purchaseLimit": 5
                }]
                userData.push({
                  "userId": userDetails._id,
                  "userName": userDetails.name + " " + userDetails.lastName,
                  "userCompany": userDetails.company,
                  "userRole": userDetails.role,
                  "stock": roleData
                })
              }
            handleUniformCart(userData)
          })
          .catch((er) => console.log(er));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
  }, [userDetails])

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
    <>
      <Container className="LoginRegPage">
        <Card className="LoginReg">
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
                  getdeliveryBooks={getdeliveryBooks}
                />
                <br />
              </Tab>

              {/* ************   Register Tab  ***************  */}
              <Tab eventKey="RegisterForm" title="Register">
                <RegisterPageComponent
                  registerUserApiRequest={registerUserApiRequest}
                  reduxDispatch={reduxDispatch}
                  setReduxUserState={setReduxUserState}
                  getAllUniformRole={getAllUniformRole}
                  getAlldeliveryBooks={getAlldeliveryBooks}
                />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LoginRegisterPage;

