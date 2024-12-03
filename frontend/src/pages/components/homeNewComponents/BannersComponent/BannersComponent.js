import React, { useRef, useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from "./BannersComponent.module.css";

const BannersComponent = ({ banners, mobileBanners }) => {
  const imageRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const setRef = (el, index) => {
    imageRefs.current[index] = el;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.detail.length;
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(intervalId);
  }, [banners?.detail.length]);

  const changeIndex = (index) => {
    setCurrentIndex(index)
  }

    return <div className={styles.newPromotionBannersWrapper} id="promotion">
        <div className={`${styles.newBannerBlock} ${styles.desktop}`}>
              {banners?.detail.map((banner, index) => {
                if(banner.redirectURL != "") {
                  return <div key={`banner-${banner._id}`} onClick={() => changeIndex(index)} className={`${styles.banner} ${currentIndex === index ? styles.fullWidth : styles.halfWidth}`} ref={(el) => setRef(el, index)}><a href={banner.redirectURL}><img src={banner.image} /></a></div>
                }
                return <div key={`banner-${banner._id}`} onClick={() => changeIndex(index)} className={`${styles.banner} ${currentIndex === index ? styles.fullWidth : styles.halfWidth}`} ref={(el) => setRef(el, index)}><img src={banner.image} /></div>
              }
            )}
      </div>

      <div className={`${styles.newBannerBlock} ${styles.mobile}`}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
      >
            {mobileBanners?.detail.map((banner, index) => {
                if(banner.redirectURL != "") {
                  return <SwiperSlide key={index}><div key={`banner-${index}`} onClick={() => changeIndex(index)} className={`${styles.banner} ${currentIndex === index ? styles.fullWidth : styles.halfWidth}`} ref={(el) => setRef(el, index)}><a href={banner.redirectURL}><img src={banner.image} /></a></div></SwiperSlide>
                }
                return <SwiperSlide key={index}><div key={`banner-${index}`} onClick={() => changeIndex(index)} className={`${styles.banner} ${currentIndex === index ? styles.fullWidth : styles.halfWidth}`} ref={(el) => setRef(el, index)}><img src={banner.image} /></div></SwiperSlide>
              }
            )}
    </Swiper>
      </div>
    </div>
}

export default BannersComponent;
