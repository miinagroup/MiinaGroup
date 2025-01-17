import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MainSection.module.css";

import { Navigation, Pagination, Scrollbar, A11y, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const mainCategories = [
  {
    label: "PPE",
    link: "PPE",
    image: "/images/categoriesIcons/PPE.png",
    disabled: false
  },
  {
    label: "SITE SAFETY",
    link: "SITE-SAFETY",
    image: "/images/categoriesIcons/SITE_SAFETY.png",
    disabled: false

  },
  {
    label: "MERCHANDISING",
    link: "MERCHANDISING",
    image: "/images/categoriesIcons/POWER.png",
    disabled: false

  },
  {
    label: "TRAVEL",
    link: "TRAVEL",
    image: "/images/categoriesIcons/HAND_TOOLS.png",
    disabled: false
  }
];



const MainSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("PPE");
  const subcategories = useSelector((state) => state.getCategories.subcategories);

  return <div className={styles.main}>
    <img src="/images/FamilyEmblemWhite.png" alt="Family Emblem White" className={styles.FamilyEmblemWhite} />
    <h1 className={styles.title}> Welcome to Miina Group!</h1>
    <p className={styles.text}>
      As a local Aboriginal business, we specialise in the supply of PPE and related equipment. <br />
      Miina Group is expanding its client base and supplier network by collaborating with businesses that share our unwavering commitment to quality, reliability, and exceptional customer care. <br />
      We carefully select every supplier to align with our core values, ensuring we consistently deliver the highest level of service and products to clients across the Pilbara and surrounding regions.<br />
    </p>
    <div>
      <div className={styles.categories}>
        <ul className={styles.categoriesList}>
          {mainCategories.map(category => {
            return <li
              key={category.label}
              className={selectedCategory === category.link ? styles.highlighted : styles.categoryItem}
              onClick={() => setSelectedCategory(category.link)}
            >
              <img src="/svg/SubmarkGreen.svg" alt="Miina Plant" className={styles.mark} />
              <span>{category.label}</span>
            </li>
          })}
        </ul>

        {subcategories[selectedCategory] ? <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Grid]}
          slidesPerView={3}
          grid={{
            rows: 2,
          }}
          spaceBetween={25}
          className={styles.swiper}
          navigation
        >
          {subcategories[selectedCategory].sort().map((subcategory, index) => (
            <SwiperSlide key={index}>
              <a href={`/product-list?categoryPath=${selectedCategory}/${subcategory}`}>
                <div className={styles.card}>
                  <img src="/svg/SubmarkWhite.svg" alt="Miina Plant" className={styles.logoPlant} />
                  <div>{subcategory.replace(/[-_]/g, ' ')}</div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
          : <div className={styles.defaultDescription}> Some Description About this Category</div>}
      </div>

    </div>

  </div>
}

export default MainSection;