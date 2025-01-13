import React, { useState } from 'react';
import { Modal } from "react-bootstrap";

import LoginRegisterPage from "../../pages/LoginRegisterPage";

import styles from "./Header.module.css";

const Header = () => {
  const [show, setShow] = useState(false);
      const [modalType, setModalType] = useState("LoginForm");

      const handleClose = () => {
        setShow(false);
      };
      const handleShow = (type) => {
          setShow(true);
          setModalType(type)
        };

    return <div className={styles.header}>
        <div className={styles.headerWrapper}>
        <div className={styles.menu}>
            <div className={styles.menuItem}>CATALOGUE</div>
            <div className={styles.menuItem} id="about">
              ABOUT US
            </div>
            <div className={styles.menuItem}>CONTACT</div>
            <div className={styles.dropdown}>
                <span>Who Miina Group is</span>
                <span>Miina Group Team</span>
              </div>
        </div>
<div className={styles.logoTaglineWrapper}>
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
                    //   onKeyUp={submitHandler}
                    //   onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    <button className={styles.iconNew} 
                    // onClick={submitHandler}
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