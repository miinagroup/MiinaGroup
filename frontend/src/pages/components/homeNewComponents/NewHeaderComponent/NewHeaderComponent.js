import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";

import LoginRegisterPage from "../../../LoginRegisterPage";

import styles from "./NewHeaderComponent.module.css";

const NewHeaderComponent = ({setIsOpenModal, goToAboutSection, goToPromotionSection, goToContactSection}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false);
    };
    const handleShow = () => {
        setShow(true);
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
                  className={`rotate linear infinite ${styles.hexagonlogo}`}
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
          <button onClick={() => handleShow()} className={styles.logRegNew}>
              <i class="bi bi-person-circle fs-4"></i>
              <span>LogIn</span>
              <span>/</span>
              <span>Register</span>
          </button>
          {/* </div> */}
          
        </div>
    </div>
      </div>

    <div className={`${styles.searchFieldNew} ${styles.mobile}`}>
          <input 
              placeholder="What are you looking for today?" 
              className={styles.inputFeild} 
              onKeyUp={submitHandler}
              onChange={(e) => setSearchQuery(e.target.value)}/>
          <button className={styles.iconNew} onClick={submitHandler}><i class="bi bi-search fs-4"></i></button>
    </div>
    <Modal show={show} onHide={handleClose} className="login_preview_items">
        <LoginRegisterPage />
      </Modal>

</div>
}

export default NewHeaderComponent;
