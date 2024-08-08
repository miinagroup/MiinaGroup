import {
  Navbar,
  Container,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMineralPrices,
  getStockPrices,
} from "../../../../redux/actions/mineralActions";
import { getT1Categories } from "../../../../redux/actions/categoryActions"

import styles from "../../HomePageForVistorsMobile.module.css";
import axios from "axios";
import HamburgerMenu from "./HamburgerMenu";

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

const HeaderComponentForVisitorsMobile = ({ handleShow, stopAnimation, setStopAnimation, toggleShowSidebar, showSidebar }) => {
  //const dispatch = useDispatch();
  const reduxDispatch = useDispatch();

  const [menuCategories, setMenuCategories] = useState({})
  const categories = useSelector((state) => state.getCategories.categories);

  const mainLinks = mainCategory.map((category) => category.link);

  useEffect(() => {
    reduxDispatch(getMineralPrices());
    reduxDispatch(getStockPrices());
    reduxDispatch(getT1Categories());
  }, []);

  useEffect(() => {
    let subCategories = {};

    categories?.forEach(category => {
      if (!category.display) return

      const parts = category.name.split('/');

      if (mainLinks.includes(parts[0])) {
        if (parts.length >= 2) {
          if (!subCategories[parts[0]]) {
            subCategories[parts[0]] = [];
          }
          if (!subCategories[parts[0]].includes(parts[1])) {
            subCategories[parts[0]].push(parts[1])
          }
        }
      }
    });

    setMenuCategories(subCategories);
  }, [categories])

  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };

  const trackVisitor = () => {
    const lastVisitTime = localStorage.getItem("lastVisitTime");
    const now = new Date().getTime();

    const threshold = 5 * 60 * 1000;

    if (!lastVisitTime || now - lastVisitTime > threshold) {
      const currentUrl = new URL(window.location.href);
      const newUrl = `/api/visitorTracks/record?source=Pure_Visitor`;
      if (currentUrl.search?.length > 0) {
        return;
      }

      axios
        .put(newUrl)
        .then((response) => {
          // console.log("Visitor tracked:", response.data);
        })
        .catch((error) => {
          console.error("Error tracking visitor:", error);
        });

      localStorage.setItem("lastVisitTime", now);
    } else {
      // console.log("Visit not tracked due to threshold limit");
    }
  };

  useEffect(() => {
    if (!window.hasTracked) {
      trackVisitor();
      window.hasTracked = true;
    }
  }, []);

  return (
    <>
      {/* ************   Login/register, will move down to replace carts  ***************  */}

      <Navbar
        className={styles.header}
        expand="lg">
        <Container className={styles.header_wrapper}>
          <div className={styles.mobile_top_section}>
            <div className={styles.logo_container}>
              <img
                id="home_logo"
                src="/images/CTL-hex.png"
                alt=""
                className={stopAnimation ? "rotate-mobile paused" : "rotate-mobile start linear infinite"}
              ></img>
              <img
                id="home_name"
                // src="/images/CTL-hextext.png"
                src="/images/CTL_HEADING_3.png"
                alt="CTL AUSTRALIA"
                styels={"width: 70% "}
                className={styles.hexagontext}
              ></img>
            </div>
            <div className={styles.login_register_mobile}>
              <div>
                {/* <a onClick={() => handleShow()} className="hd_c">
                  Login
                </a>{" "}
                /{" "} */}
                <a onClick={() => handleShow()} className={styles.hd_c}>
                  REGISTER
                </a>
              </div>
            </div>
          </div>

          <div className={styles.border_line}></div>

          <div className={`${styles.input_search_mobile} mt-2 mb-2`}>
            <HamburgerMenu toggleShowSidebar={toggleShowSidebar} showSidebar={showSidebar} />
            <div className={styles.search_bar}>
              <InputGroup>
                <Form.Control
                  id="search_input"
                  placeholder="Enter description, product code or brand"
                  aria-label="search bar"
                  aria-describedby="basic-addon2"
                  bg="white"
                  className={`${styles.search_input} m-0 p-0 ps-2 pe-2`}
                  disabled
                />
                <Button
                  id="search_button"
                  className={`${styles.CTL_btn} m-0 p-0 ps-2 pe-2 ${styles.search_btn}`}
                  disabled
                >
                  <i className="search-icon bi bi-search "></i>
                </Button>
              </InputGroup>
            </div>
            <div className={styles.rfq_button}>
              <img
                id="rfq_button"
                src="https://ctladmin.b-cdn.net/CTL%20Brand%20Images/red-search.png"
                alt=""
                className="red_search_img_visitor"
                style={{ cursor: "pointer" }}
              // onClick={() => handleShow()}
              ></img>
            </div>
          </div>
        </Container>
      </Navbar>


    </>
  );
};

export default HeaderComponentForVisitorsMobile;
