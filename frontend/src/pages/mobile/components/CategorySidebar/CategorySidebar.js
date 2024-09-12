import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';


import styles from "../HeaderComponent/HamburgerMenu.module.css"


const mainCategory = [
    {
      label: "PPE",
      link: "PPE",
    },
    {
      label: "SITE SAFETY",
      link: "SITE-SAFETY",
    },
    {
      label: "POWER/AIR",
      link: "POWER-AIR",
    },
    {
      label: "HAND TOOLS",
      link: "HAND-TOOLS",
    },
    {
      label: "INDUSTRIAL",
      link: "INDUSTRIAL",
    },
    {
      label: "FABRICATION",
      link: "FABRICATION",
    },
    {
      label: "ELECTRICAL",
      link: "ELECTRICAL",
    },
    {
      label: "PROCESSING",
      link: "PROCESSING",
    },
  ];

const CategorySideBar = ({show, toggleShow, onOpenModal}) => {
    const [menuCategories, setMenuCategories] = useState({})
    const categories = useSelector((state) => state.getCategories.categories);

    const mainLinks = mainCategory.map((category) => category.link);

    useEffect(() => {
        let subCategories = {};
        
        categories?.forEach(category => {
          if(!category.display) return
    
          const parts = category.name.split('/');
    
          if(mainLinks.includes(parts[0])) {
            if (parts.length >= 2) {
              if(!subCategories[parts[0]]) {
                subCategories[parts[0]] = [];
              }
              if(!subCategories[parts[0]].includes(parts[1])) {
                subCategories[parts[0]].push(parts[1])
              }            
            }
          }
        });
    
        setMenuCategories(subCategories);
      }, [categories])

    function CustomToggle({ children, eventKey, callback }) {
        const { activeEventKey } = useContext(AccordionContext);
        const decoratedOnClick = useAccordionButton(
          eventKey,
          () => callback && callback(eventKey),
        );
      
        const isCurrentEventKey = activeEventKey === eventKey;
  
        return (
          <button type="button" className={styles.acc_btn} onClick={decoratedOnClick}>
            <span className={isCurrentEventKey ? styles.svg_rotate : styles.svg_rotate_back}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              </svg>
            </span>
            {children}
          </button>
        );
      }
  
      function renderSubcatogaries(subcategories) {
        return subcategories.map(item => { 
          return <div className={styles.subcatalogue} onClick={onOpenModal}>
                    - {item}
                  </div>
            })
      }

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
              <Accordion defaultActiveKey="0" className={styles.categories_list}>
                {Object.keys(menuCategories).map((key, index) => (
                  <>
                    <CustomToggle eventKey={index}>                    
                        <span className={styles.acc_btn_name}>{key}</span>
                    </CustomToggle>
                    <Accordion.Collapse eventKey={index} key={key}>
                      <div className={styles.acc_body}>{renderSubcatogaries(menuCategories[key])}</div>
                    </Accordion.Collapse>
                  </>
                ))}
              </Accordion>  
            </Offcanvas.Body>
          </Offcanvas>
    )
}

export default CategorySideBar;
