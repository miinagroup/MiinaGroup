import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";

import LoginRegisterPage from "../../../LoginRegisterPage";
import HamburgerMenu from "../../../mobile/components/HeaderComponent/HamburgerMenu";


import styles from "./NewHeaderComponent.module.css";

const NewHeaderComponent = ({setIsOpenModal, goToAboutSection, goToPromotionSection, goToContactSection, showSidebar, toggleShowSidebar, onClickBtn, stopAnimation, setStopAnimation}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState("LoginForm");

    const handleClose = () => {
      setStopAnimation(false);
      setShow(false);
    };
    const handleShow = (type) => {
      setStopAnimation(true);
        setShow(true);
        setModalType(type)
      };
    const navigate = useNavigate();
    const location = useLocation();

    const submitHandler = (e) => {
        if (e.keyCode && e.keyCode !== 13) return;
        e.preventDefault();
        if (searchQuery.trim()) {
          navigate(`/product-list?searchQuery=${searchQuery}`);
        }
      };

    return     <div className={styles.headerNewWrapper}>
      <div className={styles.headerNew}>
              <div class={styles.headerNewLogo} >
        <a href="/" className={styles.logoContainer}>
              <img
                  src="/images/CTL-hex.png"
                  alt="CTL Australia Mining Supplier"
                  className={` ${stopAnimation ? "rotate paused" : "rotate start linear infinite"} ${styles.hexagonlogo}`}
              ></img>
              <img
                  src="/images/CTL_HEADING_3.png"
                  alt="CTL Australia Mining Supplier"
                  className={styles.hexagontext}
              ></img>
        </a>
      </div>
    <div className={styles.headerNewMenu}>
        <div className={`${styles.navMenu} ${styles.desktop}`}>
            {location.pathname === "/" && <button onClick={goToAboutSection}>About</button>}
            <div className={location.pathname === "/" ? "" : styles.headerBtn}><button onClick={() => setIsOpenModal(true)}>Categories</button></div>
            {location.pathname === "/" && <button onClick={goToPromotionSection}>Promotion</button>}
            {location.pathname === "/" && <button onClick={goToContactSection}>Request</button>}
        </div>
        <div className={styles.headerNewBtns}>
        <div className={`${styles.searchFieldNew} ${styles.desktop}`}>
          <input 
                  placeholder="Enter description, product code or brand" 
                  className={styles.inputFeild} 
                  onKeyUp={submitHandler}
                  onChange={(e) => setSearchQuery(e.target.value)}/>
              <button className={styles.iconNew} onClick={submitHandler}><i class="bi bi-search fs-4"></i></button>
          </div>
          {/* <div className={styles.headerNewBtnsQuoteLogin}> */}
          {/* <button className={styles.btnQuote} onClick={() => handleShow()}>GET A QUOTE</button> */}
          <span  className={styles.logRegNew}>
              <i class="bi bi-person-circle fs-4"></i>
              <button onClick={() => handleShow("LoginForm")}>LogIn</button>
              <span>/</span>
              <button onClick={() => handleShow("RegisterForm")}>Register</button>
          </span>
          {/* </div> */}
          
        </div>
    </div>
      </div>

    <div className={`${styles.searchFieldNew} ${styles.mobile} ${styles.searchFieldNewWrapper}`}>
    <div className={styles.searchFieldNewInputBlock}>
          <input 
              placeholder="What are you looking for today?" 
              className={styles.inputFeild} 
              onKeyUp={submitHandler}
              onChange={(e) => setSearchQuery(e.target.value)}/>
          <button className={styles.iconNew} onClick={submitHandler}><i class="bi bi-search fs-4"></i></button>
    </div>
    {location.pathname === "/" ? <HamburgerMenu toggleShowSidebar={toggleShowSidebar} showSidebar={showSidebar} /> : <div className={styles.headerBtn}><button onClick={() => setIsOpenModal(true)}>Categories</button></div>}

    </div>
    <Modal show={show} onHide={handleClose} className="login_preview_items">
        <LoginRegisterPage  modalType={modalType} />
      </Modal>
      {showSidebar && <div className={styles.sidebarMobileMenu}>
        <div className={styles.sidebarMobileMenuWrapper}>
        <button onClick={goToAboutSection}>About</button>
        <button onClick={onClickBtn}>Categories</button>
        <button onClick={goToPromotionSection}>Promotion</button>
        <button onClick={goToContactSection}>Request</button>
        </div>
        </div>
      }

</div>
}

export default NewHeaderComponent;
