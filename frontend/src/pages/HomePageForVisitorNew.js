import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment-timezone";

import {
    getMineralPrices,
    getStockPrices
  } from "../redux/actions/mineralActions";
import { getSubcategories } from "../redux/actions/categoryActions.js";

import BannersComponent from './components/homeNewComponents/BannersComponent/BannersComponent';
import AboutNewComponent from './components/homeNewComponents/AboutNewComponent/AboutNewComponent';
import NewBlocksComponent from './components/homeNewComponents/BlocksComponent/NewBlocksComponent';
import NewMineralsComponent from './components/homeNewComponents/NewMineralsComponent/NewMineralsComponent';
import NewStockComponent from "./components/homeNewComponents/NewStockComponent/NewStockComponent.js";
import NewMainComponent from './components/homeNewComponents/NewMainComponent/NewMainComponent.js';
import NewRequestFormComponent from "./components/NewRequestComponent/newRequestFormComponent.js";
import AcknowledgementOfCountryComponent from "./components/AcknowledgementOfCountryComponent.js"; 

import styles from "./homeStyles.module.css";
import Header from "../components/Header/Header.js";
import MainSection from "../components/MainSection/MainSection.js";
import AboutSection from "../components/AboutSection/AboutSection.js";
import TeamSection from "../components/TeamSection/TeamSection.js";
import Footer from "../components/Footer/Footer.js";
import ContactSection from "../components/ContactSection/ContactSection.js";

const HomePageForVisitorNew = () => {
    const [perthTime, setPerthTime] = useState("");
    const [banners, setBanners] = useState();
    const [mobileBanners, setMobileBanners] = useState();
    const [blocks, setBlocks] = useState([]);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getMineralPrices());
      dispatch(getStockPrices());
      dispatch(getSubcategories());
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
              const banners = data.filter((item) => item.category === "banners");
              const blocks = data.filter((item) => item.category === "blocks");
              const mobileBanners = data.filter((item) => item.category === "mobile-banners");
              setBanners(banners[0]);
              setBlocks(blocks[0]);
              setMobileBanners(mobileBanners[0]);
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
      
      const mineralPrice = useSelector((state) => state.minerals.minerals);
      const stockPrice = useSelector((state) => state.stocks.stocks);

      let sortedMineralPrice = [];
      let sortedstockPrice = [];
      let updateDate;

      if (mineralPrice && Array.isArray(mineralPrice) && mineralPrice.length > 0) {
        sortedMineralPrice = [...mineralPrice].sort((a, b) => b.latestPrice - a.latestPrice);
        updateDate = sortedMineralPrice[0].updateDate;
      }

      if (stockPrice && Array.isArray(stockPrice) && stockPrice.length > 0) {
        sortedstockPrice = [...stockPrice].sort((a, b) => a.companySize - b.companySize);
        updateDate = sortedstockPrice[0].updateDate;
      }

      const top50Companies = sortedstockPrice.slice(10, 60);
      
return (<>
{/* <Header /> */}
<MainSection />
<AboutSection />
<TeamSection />
<ContactSection />
<Footer />
    {/* <NewMainComponent />
    <div className={styles.promotionNew}>
      <NewMineralsComponent sortedMineralPrice={sortedMineralPrice} />
      <BannersComponent banners={banners} mobileBanners={mobileBanners} />
      <NewStockComponent top50Companies={top50Companies} />
    </div>
    <NewBlocksComponent blocks={blocks} />
    <AboutNewComponent />
    <div className={styles.image_cont} id="content"></div>
    <NewRequestFormComponent />
    <AcknowledgementOfCountryComponent /> */}
  </>)
}

export default HomePageForVisitorNew;
