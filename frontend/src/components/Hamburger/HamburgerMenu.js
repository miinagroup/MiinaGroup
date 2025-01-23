import React, { useRef, useEffect } from "react";

import styles from "./HamburgerMenu.module.css"

const HamburgerMenu = ({toggleShowSidebar, showSidebar}) => {
    const menuRef = useRef();

    useEffect(() => {
      if(showSidebar) {
        menuRef.current.classList.add(styles.clicked);
      } else {
        menuRef.current.classList.remove(styles.clicked);
      }
    }, [showSidebar])

    return (
      <div ref={menuRef} onClick={toggleShowSidebar} className={`${styles.hamburger} ${styles.mobile}`}></div>
    )
}

export default HamburgerMenu;