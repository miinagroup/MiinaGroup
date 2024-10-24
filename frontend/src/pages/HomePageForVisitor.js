import ProductCarouselComponent from "../components/ProductCarouselComponent";
import ProductsPromotionComponent from "../components/ProductsPromotionComponent";
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {isMobile, isTablet} from 'react-device-detect';
import axios from "axios";
import moment from "moment-timezone";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Form,
  Button,
  InputGroup,
  Modal,
} from "react-bootstrap";
import "./general.css";
import FetchAuthFromServer from "../components/FetchAuthFromServer";
import LoginRegisterPage from "./LoginRegisterPage";
import AcknowledgementOfCountryComponent from "./components/AcknowledgementOfCountryComponent";

const HomePageForVisitor = () => {
  const [perthTime, setPerthTime] = useState("");
  const [banners, setBanners] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    if (isMobile) {
      navigate("/m.home");
    } else if(isTablet) {
      navigate("/m.home");
    }
  }, [])

  // const isAuth = FetchAuthFromServer();
  useEffect(() => {
    const url = window.location.href;
    if (url.includes("Register=true")) {
      setShow(true)
      //window.location.assign("/");
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/get-token");
        // console.log("Authorized");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // console.log("Unauthorized");
          localStorage.removeItem("userInfo");
        } else {
          console.error(error);
        }
      }
    };
    checkAuth();


    setPerthTime(moment().tz("Australia/Perth").format("YYYY-MM-DD HH:mm:ss"));
  }, []);

  const getBanners = async (perthTime) => {
    const { data } = await axios.get(`/api/promotion/promotion/${perthTime}`);
    return data;
  };



  useEffect(() => {
    if (perthTime) {
      getBanners(perthTime)
        .then((data) => {
          const banners = data.filter((item) => item.category === "banners");
          const blocks = data.filter((item) => item.category === "blocks");
          setBanners(banners);
          setBlocks(blocks);
        })
        .catch((er) =>
          setError(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }
  }, [perthTime]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      {/* <HeaderComponentForVisitors /> */}
      {/* <MineralPrice /> */}
      {/* <NavbComponentForVisitors /> */}
      {/* ************   Carousel  ***************  */}
      <ProductCarouselComponent banners={banners} />

      {/* ************   daily deal top3  ***************  */}
      <ProductsPromotionComponent blocks={blocks} />

      {/* ************   Stocks Price  ***************  */}
      {/* <FooterComponent /> */}
      {/* <ScrollButton /> */}

      <AcknowledgementOfCountryComponent />
      
      <Modal show={show} onHide={handleClose} className="login_preview_items">
        <LoginRegisterPage />
      </Modal>
    </>
  );
};

export default HomePageForVisitor;
