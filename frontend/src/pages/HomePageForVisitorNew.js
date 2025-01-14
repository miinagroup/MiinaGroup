import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import moment from "moment-timezone";
import { getSubcategories } from "../redux/actions/categoryActions.js";

import Header from "../components/Header/Header.js";
import MainSection from "../components/MainSection/MainSection.js";
import AboutSection from "../components/AboutSection/AboutSection.js";
import TeamSection from "../components/TeamSection/TeamSection.js";
import Footer from "../components/Footer/Footer.js";
import ContactSection from "../components/ContactSection/ContactSection.js";

const HomePageForVisitorNew = () => {
  const [perthTime, setPerthTime] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubcategories());
  }, []);

  useEffect(() => {
    setPerthTime(moment().tz("Australia/Perth").format("YYYY-MM-DD HH:mm:ss"));
  }, []);

 
      
return (<>
{/* <Header /> */}
  <MainSection />
  <AboutSection />
  <TeamSection />
  <ContactSection />
  <Footer />
  </>
)}

export default HomePageForVisitorNew;
