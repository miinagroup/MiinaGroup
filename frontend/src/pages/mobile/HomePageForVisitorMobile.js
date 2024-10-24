import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {isMobile, isTablet} from 'react-device-detect';
import axios from "axios";
import moment from "moment-timezone";
import { Modal } from "react-bootstrap";
import FetchAuthFromServer from "../../components/FetchAuthFromServer";
import ProductsPromotionComponentMobile from "./components/ProductsComponents/ProductsPromotionComponent/ProductsPromotionComponentMobile";
import ProductCarouselComponentMobile from "./components/ProductsComponents/ProductCarouselComponent/ProductCarouselComponentMobile";
import MineralPriceMobile from "./components/MineralPrice/MineralPriceMobile";
import HeaderComponentForVisitorsMobile from "./components/HeaderComponent/HeaderComponentForVisitorsMobile";
import FooterComponentMobile from "./components/Footer/FooterMobile";
import ScrollButton from "../../components/ScrollButton ";
import LoginRegisterPageMobile from "./components/LoginRegisterPage/LoginRegisterPageMobile";
import CategorySideBar from "./components/CategorySidebar/CategorySidebar";

import styles from "./HomePageForVistorsMobile.module.css";
import AcknowledgementOfCountryComponent from "../components/AcknowledgementOfCountryComponent";

const HomePageForVisitorMobile = () => {
  const [perthTime, setPerthTime] = useState("");
  const [mobileBanners, setMobileBanners] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState(false);


  const navigate = useNavigate()
  useEffect(() => {
    if(isMobile && isTablet) {
      navigate("/") 
    } else if (!isMobile) {
      navigate("/") 
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
          const mobileBanners = data.filter((item) => item.category === "mobile-banners");
          const blocks = data.filter((item) => item.category === "blocks");
          setMobileBanners(mobileBanners);
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
  const [stopAnimation, setStopAnimation] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClose = () => {
    setShow(false);
    setStopAnimation(false);
  };
  const handleShow = () => {
    setShow(true);
    setShowSidebar(false);
    setStopAnimation(true);
  };

  const toggleShowSidebar = () => {
    setShowSidebar(!showSidebar)
    setStopAnimation(!stopAnimation);
  }


  return (
    <>

      <HeaderComponentForVisitorsMobile 
        handleShow={handleShow}
        stopAnimation={stopAnimation} 
        setStopAnimation={setStopAnimation}
        toggleShowSidebar={toggleShowSidebar}
        showSidebar={showSidebar}
      />
      
      {/* ************   Carousel  ***************  */}
      <ProductCarouselComponentMobile banners={mobileBanners}/>

      <MineralPriceMobile />

      {/* ************   daily deal top3  ***************  */}
      <ProductsPromotionComponentMobile blocks={blocks} />

      <AcknowledgementOfCountryComponent />
      
      <FooterComponentMobile />
      <ScrollButton />

      <Modal show={show} onHide={handleClose} dialogClassName={styles.modal_wrapper} backdrop={"static"}>
          <Modal.Header closeButton><Modal.Title>Register</Modal.Title></Modal.Header>
        <LoginRegisterPageMobile />
      </Modal>

      <CategorySideBar show={showSidebar} toggleShow={toggleShowSidebar} onOpenModal={handleShow } />
      
    </>
  );
};

export default HomePageForVisitorMobile;
