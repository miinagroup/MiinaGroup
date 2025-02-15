import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import LoginRegisterPage from "../../pages/LoginRegisterPage";
import styles from "./Header.module.css";
import HamburgerMenu from "../Hamburger/HamburgerMenu";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';

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
    label: "TRANSIT",
    link: "TRANSIT",
    image: "/images/categoriesIcons/HAND_TOOLS.png",
    disabled: false
  }
];

const Header = ({ goToAboutSection, goToTeamSection, goToContactSection }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [showOffcanvasMenu, setShowOffcanvasMenu] = useState(false);
  const [modalType, setModalType] = useState("LoginForm");
  const navigate = useNavigate();
  const location = useLocation();

  const subcategories = useSelector((state) => state.getCategories.subcategories);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (type) => {
    setShow(true);
    setModalType(type)
  };

  const handleCloseOffcanvasMenu = () => setShowOffcanvasMenu(false);
  const handleShowOffcanvasMenu = () => setShowOffcanvasMenu(true);

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-list?searchQuery=${searchQuery}`);
    }
  };


  const handleClickGoToSection = (goToSectionFunction) => {
    if (location.pathname === '/') {
      goToSectionFunction();
    } else {
      navigate('/', { replace: true });
      setTimeout(() => {
        goToSectionFunction();
      }, 100);
    }
  };

  return <div className={styles.header}>
    <div className={styles.headerWrapper}>
      <div className={`${styles.menu} ${styles.desktop}`}>
        <div className={styles.menuItem}>
          <span className={styles.catalogueMenuItem}>CATALOGUE</span>
          <div className={styles.catalogueDropdown}>
            {mainCategories.map((category) => {
              const hasSubcategories = subcategories[category.link]?.length > 0;
              return (
                <div className={styles.category} key={category.link}>
                  <a href={`/product-list?categoryPath=${category.link}`} className={styles.categoryPath}>
                    <img src="/images/SubmarkGreen.png" alt="Miina Group Logo" className={styles.logoTag} />
                    <div>{category.label}</div>
                  </a>
                  {hasSubcategories && (
                    <>
                      <div className={styles.arrow}>
                        <svg width="27" height="16" viewBox="0 0 27 16" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M0.991804 7.20499C0.439537 7.20952 -0.00449316 7.66089 3.3617e-05 8.21315C0.00456039 8.76542 0.45593 9.20945 1.0082 9.20492L0.991804 7.20499ZM26.712 8.70133C27.0993 8.30762 27.0942 7.67448 26.7004 7.28717L20.2845 0.975581C19.8908 0.588271 19.2577 0.59346 18.8704 0.987172C18.4831 1.38088 18.4883 2.01403 18.882 2.40134L24.585 8.01164L18.9747 13.7147C18.5874 14.1084 18.5926 14.7415 18.9863 15.1288C19.38 15.5161 20.0131 15.511 20.4005 15.1172L26.712 8.70133ZM1.0082 9.20492L26.0074 9.00001L25.991 7.00008L0.991804 7.20499L1.0082 9.20492Z" />
                        </svg>
                      </div>
                      <div className={styles.subcategories}>
                        {subcategories[category.link]?.sort().map((subcategory, index) => (
                          <a
                            href={`/product-list?categoryPath=${category.link}/${subcategory}`}
                            key={subcategory}
                            className={styles.subcategoryItem}
                          >
                            <div className={styles.logoTagSubcategory}>
                            <img src="/svg/SubmarkGreen.svg" alt="Miina Group Logo" className={styles.logoTag} />
                            </div>
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
            <button onClick={() => {handleClickGoToSection(goToAboutSection)}}>
              <div className={styles.aboutMenu}><img src="/svg/SubmarkGreen.svg" alt="Miina Group Logo" className={styles.logoTag} />Who Miina Group is</div>
            </button>
            <button onClick={() => handleClickGoToSection(goToTeamSection)}>
              <div className={styles.aboutMenu}><img src="/svg/SubmarkGreen.svg" alt="Miina Group Logo" className={styles.logoTag} />Miina Group Team</div>
            </button>
          </div>
        </div>
        <button onClick={() => handleClickGoToSection(goToContactSection)}><div className={styles.menuItem}>CONTACT</div></button>
      </div>
        <a className={styles.logoTaglineWrapper} href="/">
        <img src="/svg/PrimaryLogoColour.svg" alt="Miina Group Logo" className={styles.logo} />
        <div className={styles.tagline}>
          Walking and Working on Country, safely
        </div>
        </a>

      <div className={styles.logRegNew}>
        <HamburgerMenu toggleShowSidebar={handleShowOffcanvasMenu} />
          <Offcanvas show={showOffcanvasMenu} onHide={handleCloseOffcanvasMenu} className={styles.offcanvasMenu}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className={styles.offcanvasTitle}>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <Accordion defaultActiveKey="0" className={styles.headerAccordion}>
            <Accordion.Item eventKey="0">
              <Accordion.Header className={styles.accordionHeader}>CATALOGUE</Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
              {mainCategories.map((category) => {
              return (
                <div className={styles.category} key={category.link}>
                  <a href={`/product-list?categoryPath=${category.link}`} className={styles.categoryPath}>
                    <img src="/images/SubmarkGreen.png" alt="Miina Group Logo" className={styles.logoTag} />
                    <div>{category.label}</div>
                  </a>
                </div>
              );
            })}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className={styles.accordionHeader}>ABOUT US</Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                <button onClick={() => {
                  handleClickGoToSection(goToAboutSection)
                  handleCloseOffcanvasMenu()
                }}>
                  <div className={styles.aboutMenu}><img src="/svg/SubmarkGreen.svg" alt="Miina Group Logo" className={styles.logoTag} />Who Miina Group is</div>
                </button>
                <button onClick={() => {
                  handleClickGoToSection(goToTeamSection)
                  handleCloseOffcanvasMenu()
                  }}>
                  <div className={styles.aboutMenu}><img src="/svg/SubmarkGreen.svg" alt="Miina Group Logo" className={styles.logoTag} />Miina Group Team</div>
                </button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <button className={styles.btnContactSidebar} onClick={() => {
                handleClickGoToSection(goToContactSection)
                handleCloseOffcanvasMenu()
                }}><div className={styles.menuItem}>CONTACT</div></button>
            </Accordion.Item>
          </Accordion>
          </Offcanvas.Body>
        </Offcanvas>
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
            <i className="bi bi-search fs-4"></i></button>
        </div>
        <div className={styles.btnsLogReg}>
        <i onClick={() => handleShow("LoginForm")} className={`bi bi-person-circle fs-4`}></i>
        <button
          onClick={() => handleShow("LoginForm")}
          className={styles.desktop}
        >LogIn</button>
        <span className={styles.desktop}>/</span>
        <button
          onClick={() => handleShow("RegisterForm")}
          className={styles.desktop}
        >Register</button>
        </div>
      </div>
    </div>

    <Modal show={show} onHide={handleClose} className="login_preview_items">
      <LoginRegisterPage modalType={modalType} />
    </Modal>
  </div>
}

Header.propTypes = {
  goToAboutSection: PropTypes.func.isRequired,
  goToTeamSection: PropTypes.func.isRequired,
  goToContactSection: PropTypes.func.isRequired,
};

export default Header;