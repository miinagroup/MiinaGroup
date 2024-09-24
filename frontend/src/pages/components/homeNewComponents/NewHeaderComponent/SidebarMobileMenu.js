import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from "./NewHeaderComponent.module.css";

const SidebarMobileMenu = ({show, toggleShow, goToContactSection, goToPromotionSection, goToAboutSection, setIsOpenModal}) => {
    return (
        <Offcanvas show={show} onHide={toggleShow} className={styles.sidebar}  backdrop="static">
            <Offcanvas.Header className={styles.sidebar_header}>
            <div onClick={toggleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
            </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
        <button onClick={goToAboutSection}>About</button>
        <button onClick={() => setIsOpenModal(true)}>Categories</button>
        <button onClick={goToPromotionSection}>Promotion</button>
        <button onClick={goToContactSection}>Request</button>
            </Offcanvas.Body>
          </Offcanvas>
    )
}

export default SidebarMobileMenu;
