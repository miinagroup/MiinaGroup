import {useRef, useState, useEffect} from "react";

import styles from "./Accordion.module.css"

export const Accordion = ({ title, content, key, onOpenModal, index, activeIndex, onAccordionClick  }) => {
  const isActive = index === activeIndex;
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  const renderContent = () => {
      return content.map(item => { return <div className={styles.subcatalogue} onClick={onOpenModal}>- {item}</div>})
  }

    return (
      <>
        <div onClick={() => onAccordionClick (index)}>
          <span className={styles.rotate}>{isActive ? <i class="bi bi-arrow-down"></i> : <i class="bi bi-arrow-right"></i>}</span>
          <span>{title}</span>
        </div>
        {isActive && <div ref={ref} className={styles.accordion_content}>{renderContent()}</div>}

        
      </>
    );
  };
