import {
  Navbar,
  Nav,
  Container,
  Badge,
  Form,
  Button,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMineralPrices,
  getStockPrices,
} from "../../../../redux/actions/mineralActions";
import { getT1Categories } from "../../../../redux/actions/categoryActions"

import "./HomePageForVistors.css";
import axios from "axios";
import LoginRegisterPage from "../../../LoginRegisterPage";

const HeaderComponentForVisitors = () => {
  //const dispatch = useDispatch();
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(getMineralPrices());
    reduxDispatch(getStockPrices());
    reduxDispatch(getT1Categories());
  }, []);

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

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      {/* ************   Login/register, will move down to replace carts  ***************  */}
      <Navbar className="hd_bgc w-100 desktop" expand="lg">
        <Container className="text-center visitor_header" fluid>
          <div className="visitor_header_content">
            {/* ************ LOGO *************** */}
            <div className="logo_container">
              <img
                id="home_logo"
                src="/images/CTL-hex.png"
                alt=""
                className="rotate linear infinite"
              ></img>
              <img
                id="home_name"
                src="/images/CTL_HEADING_3.png"
                alt=""
                className="hexagontext"
              ></img>
            </div>
            <Nav className="me-auto input_search">
              <InputGroup className="mb-3 ">
                <Form.Control
                  id="search_input"
                  placeholder="Enter description, product code or brand"
                  aria-label="search bar"
                  aria-describedby="basic-addon2"
                  bg="white"
                  className="mt-3"
                />
                <Button
                  id="search_button"
                  className="mt-3 CTL_btn"
                  onClick={() => handleShow()}
                >
                  <i className="search-icon bi bi-search "></i>
                </Button>
              </InputGroup>
              <img
                id="rfq_button"
                src="https://res.cloudinary.com/dxvwresim/image/upload/v1684231122/CTL%20Brand%20Images/red-search.png"
                alt=""
                className="red_search_img"
                style={{ cursor: "pointer" }}
                onClick={() => handleShow()}
              ></img>
            </Nav>
            <div className="mt-2 me-4">
              <h4>
                <a onClick={() => handleShow()} className="hd_c">
                  LOGIN
                </a>{" "}
                /{" "}
                <a onClick={() => handleShow()} className="hd_c">
                  REGISTER
                </a>
              </h4>
            </div>
          </div>
        </Container>
      </Navbar>

      <Navbar className="hd_bgc w-100 mobile hd_bgc_mobile" expand="lg">
        <Container className="text-center visitor_header" fluid>
          <div className="mobile_top_section">
            <div className="logo_container">
              <img
                id="home_logo"
                src="/images/CTL-hex.png"
                alt=""
                className="rotate linear infinite"
              ></img>
              <img
                id="home_name"
                src="/images/CTL-hextext.png"
                alt=""
                className="hexagontext"
              ></img>
            </div>
            <div className="login_register_mobile mt-2">
              <h4>
                <a href="/login" className="hd_c">
                  LOGIN
                </a>{" "}
                /{" "}
                <a href="/register" className="hd_c" >
                  REGISTER
                </a>
              </h4>
            </div>
          </div>

          <div className="input_search_mobile mt-1 mb-1">
            <div className="search_bar">
              <InputGroup>
                <Form.Control
                  id="search_input"
                  placeholder="Enter description, product code or brand"
                  aria-label="search bar"
                  aria-describedby="basic-addon2"
                  bg="white"
                  className=" m-0 p-0 ps-2 pe-2"
                />
                <Button
                  id="search_button"
                  className="CTL_btn m-0 p-0 ps-2 pe-2"
                >
                  <i className="search-icon bi bi-search "></i>
                </Button>
              </InputGroup>
            </div>
            <div className="rfq_button">
              <img
                id="rfq_button"
                src="https://res.cloudinary.com/dxvwresim/image/upload/v1684231122/CTL%20Brand%20Images/red-search.png"
                alt=""
                className="red_search_img_visitor"
                style={{ cursor: "pointer" }}
                onClick={() => handleShow()}
              ></img>
            </div>
          </div>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose} className="login_preview_items">
        <LoginRegisterPage />
      </Modal>

      {/* <PleaseRegister show={show} handleClose={handleClose} handleShow={handleShow} /> */}
    </>
  );
};

export default HeaderComponentForVisitors;
