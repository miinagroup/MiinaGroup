import { Carousel, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "./page.css";

const ProductCarouselComponent = ({ banners }) => {
  const threeBanners = banners[0]?.detail;

  // if threeBanners is undifined use the fixed banners
  const imgPath = "images/carousel/banners/set";
  const groupIndex = 3;

  const banner1 = imgPath + groupIndex + "_1.jpg";
  const banner2 = imgPath + groupIndex + "_2.jpg";
  const banner3 = imgPath + groupIndex + "_3.jpg";

  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  const updateBannerUrl = (url) => {
    // const [start, end] = url.split("/banners");
    // return `${start}/banners/c_scale,h_400,w_1600${end}`;
    return url;
  };

  // track how many times visitors visit the website
  const trackVisitor = () => {
    const lastVisitTime = localStorage.getItem("lastVisitTime");
    const now = new Date().getTime();

    const threshold = 5 * 60 * 1000;

    if (!lastVisitTime || now - lastVisitTime > threshold) {
      const currentUrl = new URL(window.location.href);
      const newUrl = `/api/visitorTracks/record?${currentUrl.search}&userId=${userInfo?._id}`;
      if (currentUrl.search?.length === 0) {
        return;
      }
      axios
        .put(newUrl)
        .then((response) => {
          // console.log("Visitor tracked:", response.data);
        })
        .catch((error) => {
          console.error("Error tracking visitor:", error);
        });

      localStorage.setItem("lastVisitTime", now);
    } else {
      // console.log("Visit not tracked due to threshold limit");
    }
  };

  /*   useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      trackVisitor();
    } else {
      if (!window.hasTracked) {
        trackVisitor();
        window.hasTracked = true;
      } else {
        console.log("Visitor tracking skipped in development");
      }
    }
  }, []); */

  useEffect(() => {
    if (!window.hasTracked) {
      trackVisitor();
      window.hasTracked = true;
    }
  }, []);


  return (
    <>
      {!threeBanners ? (
        <Carousel className="carousel mt-3 mb-2" interval={9000}>
          <Carousel.Item>
            <img
              className="d-block w-100 c_img"
              src={banner1}
              alt="Third slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={banner2} alt="First slide" />
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={banner3} alt="Second slide" />
          </Carousel.Item>
        </Carousel>
      ) : (
        <Carousel className="carousel mt-3 mb-2" interval={9000}>
          {threeBanners?.map((item, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100 c_img"
                src={updateBannerUrl(item.image)}
                alt={"slide " + idx}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarouselComponent;
