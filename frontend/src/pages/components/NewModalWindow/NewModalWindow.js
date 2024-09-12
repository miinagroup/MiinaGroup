import { useRef, useEffect } from "react";

import styles from "./NewModalWindow.module.css";

const NewModalWindow = ({children, title, onClose, isOpenModal}) => {
    const modalRef = useRef();

    useEffect(() => {
        if (isOpenModal) {
          document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isOpenModal]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(false)
    }
  };

  return (
        <div className={styles.newModal} ref={modalRef}>
            <div className={styles.newModalHeader}>
              <h2 className={styles.newModalTitle}>{title}</h2>
              <button onClick={() => onClose(false)}><i class="bi bi-x-lg"></i></button>
            </div>
            <div className={styles.newModalContent}>
                {children}
            </div>
            
        </div>
    )
}

export default NewModalWindow;
