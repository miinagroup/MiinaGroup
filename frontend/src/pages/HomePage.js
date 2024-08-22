import ProductCarouselComponent from "../components/ProductCarouselComponent";
import ProductsPromotionComponent from "../components/ProductsPromotionComponent";
import CTLPromotionComponent from "../components/CTLPromotionComponent";
import CountDownComponent from "../components/CountDownComponent";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import { Container } from "react-bootstrap";

import "./general.css";
import StockPrice from "../components/StockPrice";
import OurProductComponent from "../components/OurProductComponent";
import AcknowledgementOfCountryComponent from "./components/AcknowledgementOfCountryComponent";

const HomePage = () => {
  const [perthTime, setPerthTime] = useState("");
  const [banners, setBanners] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [bottomBlocks, setBottomBlocks] = useState([]);
  const [error, setError] = useState(false);

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
          const banners = data.filter((item) => item.category === "banners");
          const blocks = data.filter((item) => item.category === "blocks");
          const bottomBlocks = data.filter((item) => item.category === "bottomBlocks");
          setBanners(banners);
          setBlocks(blocks);
          setBottomBlocks(bottomBlocks);
          // console.log("BANNERS",data);
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
  console.log("bottomBlocks", bottomBlocks);

  return (
    <>

      {/* ************   Carousel  ***************  */}
      <ProductCarouselComponent banners={banners} />

      {/* ************   daily deal top3  ***************  */}
      <ProductsPromotionComponent blocks={blocks} />

      {/* ************   bottom 3 blocks  ***************  */}
      {/* <CTLPromotionComponent blocks={bottomBlocks} /> */}

      <AcknowledgementOfCountryComponent />
    </>
  );
};

export default HomePage;
