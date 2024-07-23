import { Outlet, Navigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import Navb from "./Navb";
import FooterComponent from "./FooterComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SplashPage from "../pages/SplashPage";
import ScrollButton from "./ScrollButton ";
import MineralPrice from "./MineralPrice";
import StockPrice from "./StockPrice";
import HomePageForVisitor from "../pages/HomePageForVisitor";
import HeaderComponentForVisitors from "../pages/user/components/HomePageForVisitors/HeaderComponentForVisitors";
import NavbComponentForVisitors from "../pages/user/components/HomePageForVisitors/NavbComponentForVisitors";
import { useSelector } from "react-redux";

const ProtectedRoutesComponent = ({ admin, userPrevent }) => {
  const [isAuth, setIsAuth] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [userLoggedin, setUerLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      setUerLoggedin(true);
    }
  }, [userInfo]);

  // console.log("Protection", userInfo.isAdmin, admin, userPrevent);

  const openRoutes = [
    "/unfortunately",
    "/FaqPage",
    "/TermsConditions",
    "/privacypolicy",
    "/goodsreturnform",
    "/",
  ];

  const isOnOpenRoute = openRoutes.includes(window.location.pathname);

  // console.log("role", role, userLoggedin, isOnOpenRoute);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/get-token");
        setIsAdmin(response.data.isAdmin);
        if (response.data.isAdmin === true) {
          setIsAuth("admin");
        } else {
          setIsAuth(response.data.token);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("isAuth", isAuth);
    }
  }, [isAuth]);

  if (isLoading) {
    return (
      <div>
        <img
          src="/loading-gif.gif"
          alt="Loading"
          style={{ display: "block", margin: "auto", width: "200px", marginTop:"10%" }}
        />{" "}
      </div>
    );
  } else if (isOnOpenRoute === false && userLoggedin === false) {
    // return <SplashPage />;
    return <Navigate to="/" replace />;
  } else if (isAuth === undefined || !isAuth) {
    return (
      <>
      <div style={{paddingBottom: "220px"}}>
        {/* <SplashPage /> */}
        <HeaderComponentForVisitors />
        <MineralPrice />
        <NavbComponentForVisitors />
        <Outlet />
      </div>
        <FooterComponent />
        <ScrollButton />
      </>
    );
  } else {
    if (userPrevent && isAdmin !== admin) {
      return <Navigate to="/user/my-orders" replace />;
    } else {
    return (
      <>
      <div style={{paddingBottom: "220px"}}>
        <HeaderComponent />
        <MineralPrice />
        <Navb />
        <Outlet />
      </div>
        <FooterComponent />
        <ScrollButton />
      </>
    );
    }
  }
};

export default ProtectedRoutesComponent;

/* 
import { Outlet, Navigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import Navb from "./Navb";
import FooterComponent from "./FooterComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SplashPage from "../pages/SplashPage";

const ProtectedRoutesComponent = ({ admin }) => {
  const [isAuth, setIsAuth] = useState();
  

  useEffect(() => {
    axios.get("/api/get-token").then(function (data) {
      if (data.data.isAdmin === true) {
        setIsAuth('admin');
      } else {
        setIsAuth(data.data.token);
      }
      return isAuth;
    });
  }, [isAuth]);

console.log('isAuthFFFFFFFFFFFF', isAuth);

  if (isAuth === undefined) return <SplashPage />;


  return isAuth && admin && isAuth !== "admin" ? (
    <Navigate to="/login" replace={true} />
  ) : isAuth && admin ? (
    <>
      <HeaderComponent />
      <Navb />
      <Outlet />
      <FooterComponent />
    </>
  ) : isAuth && !admin ? (
    <>
      <HeaderComponent />
      <Navb />
      <Outlet />
      <FooterComponent />
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoutesComponent;

*/
