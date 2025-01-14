import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { Modal } from "react-bootstrap";

import LoginRegisterPage from "../../pages/LoginRegisterPage";

import styles from "./Header.module.css";

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

const Header = ({goToAboutSection, goToTeamSection, goToContactSection}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("LoginForm");
  const navigate = useNavigate();

  const subcategories = useSelector((state) => state.getCategories.subcategories);

  const handleClose = () => {
        setShow(false);
  };

  const handleShow = (type) => {
      setShow(true);
      setModalType(type)
  };

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-list?searchQuery=${searchQuery}`);
    }
  };

    return <div className={styles.header}>
        <div className={styles.headerWrapper}>
        <div className={styles.menu}>
            <div className={styles.menuItem}>
              <span className={styles.catalogueMenuItem}>CATALOGUE</span>
              <div className={styles.catalogueDropdown}>
              {mainCategories.map((category) => {
                  const hasSubcategories = subcategories[category.link]?.length > 0;
                  return (
                      <div className={styles.category} key={category.link}>
                                    <a href={`/product-list?categoryName=${category.link}`} className={styles.categoryName}>
                                        <img src="/images/SubmarkGreen.png" alt="Miina Group Logo" className={styles.logoTag} />
                                        <div>{category.label}</div>
                                    </a>
                          {hasSubcategories && (
                              <>
                                  <div className={styles.arrow}>
                                    <svg width="27" height="16" viewBox="0 0 27 16" xmlns="http://www.w3.org/2000/svg">
                                      <path fill="currentColor" d="M0.991804 7.20499C0.439537 7.20952 -0.00449316 7.66089 3.3617e-05 8.21315C0.00456039 8.76542 0.45593 9.20945 1.0082 9.20492L0.991804 7.20499ZM26.712 8.70133C27.0993 8.30762 27.0942 7.67448 26.7004 7.28717L20.2845 0.975581C19.8908 0.588271 19.2577 0.59346 18.8704 0.987172C18.4831 1.38088 18.4883 2.01403 18.882 2.40134L24.585 8.01164L18.9747 13.7147C18.5874 14.1084 18.5926 14.7415 18.9863 15.1288C19.38 15.5161 20.0131 15.511 20.4005 15.1172L26.712 8.70133ZM1.0082 9.20492L26.0074 9.00001L25.991 7.00008L0.991804 7.20499L1.0082 9.20492Z"/>
                                    </svg>
                                  </div>
                                  <div className={styles.subcategories}>
                                      {subcategories[category.link]?.sort().map((subcategory, index) => (
                                          <a
                                              href={`/product-list?categoryName=${category.link}&subCategoryName=${subcategory}`}
                                              key={index}
                                              className={styles.subcategoryItem}
                                          >
                                              {/* <img src="/images/SubmarkPurple.png" alt="Miina Group Logo" className={styles.logoTag} /> */}
                                              <img src="/svg/SubmarkPurple.svg" alt="Miina Group Logo" className={styles.logoTag} />
                                              {subcategory}
                                          </a>
                                      ))}
                                  </div>
                              </>
                          )}
                      </div>
                  );
              })}
              </div>

            </div>
            <div className={styles.menuItem}>
              <span className={styles.aboutMenuItem}>ABOUT US</span>
              <div className={styles.dropdown}>
                <button onClick={goToAboutSection}>
                <div className={styles.aboutMenu}><img src="/svg/SubmarkGreen.svg" alt="Miina Group Logo" className={styles.logoTag} /><span>Who Miina Group is</span></div>
                </button>
                <button onClick={goToTeamSection}>
                <div className={styles.aboutMenu}><img src="/svg/SubmarkGreen.svg" alt="Miina Group Logo" className={styles.logoTag} /><span>Miina Group Team</span></div>
                </button>
            </div>
            </div>
            <button onClick={goToContactSection}><div className={styles.menuItem}><span>CONTACT</span></div></button>
        </div>
<div className={styles.logoTaglineWrapper} onClick={() => {navigate("/")}}>
<img src="/svg/PrimaryLogoColour.svg" alt="Miina Group Logo" className={styles.logo} />
    <div className={styles.tagline}>
    Walking and Working on Country, safely
    </div>
</div>
  
         <div  className={styles.logRegNew}>
         <div className={`${styles.search}`}>
                    <input
                      placeholder="Search 1000+ products"
                      className={styles.inputSearch}
                    onKeyUp={submitHandler}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    <button className={styles.iconNew} 
                    onClick={submitHandler}
                    >
                <i class="bi bi-search fs-4"></i></button>
        </div>
                      <i class="bi bi-person-circle fs-4"></i>
                      <button 
                       onClick={() => handleShow("LoginForm")}
                      >LogIn</button>
                      <span>/</span>
                      <button 
                       onClick={() => handleShow("RegisterForm")}
                      >Register</button>
                  </div>
        </div>
       
        <Modal show={show} onHide={handleClose} className="login_preview_items">
        <LoginRegisterPage  modalType={modalType} />
      </Modal>
    </div>
}

export default Header;