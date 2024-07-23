import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Modal, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../../../components/page.css";
import "./HomePageForVistors.css";
import { mainCategoryForVisitor } from "../../../../components/NavbMainCategories";
import PleaseRegister from "./PleaseRegister";
import LoginRegisterPage from "../../../LoginRegisterPage";
import { BackupCategories } from "./BackupCategories";


const NavbComponentForVisitors = () => {
  // var categories = useSelector((state) => state.getCategories.categories);
  // var categories = ""
  // if (categories === null || categories === "") {
  //   categories = BackupCategories
  // }
  const categories = BackupCategories
  const navigate = useNavigate();
  const goRegister = () => {
    navigate("/register");
  };

  const [subCategory1, setSubCategory1] = useState({});
  const [subCategory2, setSubCategory2] = useState({});
  const [subCategory3, setSubCategory3] = useState({});
  const [childCategory, setChildCategory] = useState({});

  useEffect(() => {
    let subCategories = {};
    let childCategories = {};

    const mainLinks = mainCategoryForVisitor.map((category) => category.link);

    if (categories !== null || categories !== "") {
      categories?.forEach((category) => {
        if (category.display === true) {
          const parts = category.name.split("/");
          if (mainLinks.includes(parts[0])) {
            if (parts.length >= 2) {
              if (!subCategories[parts[0]]) {
                subCategories[parts[0]] = [];
              }
              if (!subCategories[parts[0]].includes(parts[1])) {
                subCategories[parts[0]].push(parts[1]);
              }
            }

            if (parts.length >= 3) {
              const key = parts[0] + "/" + parts[1];
              if (!childCategories[key]) {
                childCategories[key] = [];
              }
              if (!childCategories[key].includes(parts[2])) {
                childCategories[key].push(parts[2]);
              }
            }
          }
        }
      });
    }

    let subCategories1 = {};
    let subCategories2 = {};
    let subCategories3 = {};
    //console.log("subCategories", subCategories);
    Object.keys(subCategories).forEach((key) => {
      const totalSubs = subCategories[key].length;

      if (totalSubs <= 3) {
        subCategories1[key] = subCategories[key].slice(0, 1);
        subCategories2[key] =
          totalSubs >= 2 ? subCategories[key].slice(1, 2) : [];
        subCategories3[key] =
          totalSubs >= 3 ? subCategories[key].slice(2, 3) : [];
      } else if (totalSubs === 4) {
        subCategories1[key] = [subCategories[key][0]];
        subCategories2[key] = [subCategories[key][1], subCategories[key][2]];
        subCategories3[key] = [subCategories[key][3]];
      } else {
        const thirdLength = Math.ceil(totalSubs / 3);
        subCategories1[key] = subCategories[key].slice(0, thirdLength);
        subCategories2[key] = subCategories[key].slice(
          thirdLength,
          thirdLength * 2
        );
        subCategories3[key] = subCategories[key].slice(thirdLength * 2);
      }
    });

    setSubCategory1(subCategories1);
    setSubCategory2(subCategories2);
    setSubCategory3(subCategories3);
    setChildCategory(childCategories);
  }, [categories]);
  // console.log("mainCategory", mainCategoryForVisitor);
  // console.log("subCategory1", subCategory1);
  // console.log("subCategory2", subCategory2);
  // console.log("subCategory3", subCategory3);
  // console.log("childCategory", childCategory);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const SubCategory = ({ mainLink, sub, childCategory }) => (
    <>
      <li className="subCat_visitor" onClick={handleClick}>
        <span >{sub.replace(/-/g, " ").replace(/_/g, " & ")}</span>
      </li>
    </>
  );

  return (
    <>
      <Navbar
        collapseOnSelect
        className="nav_bgc w-100 navb_visitor_desktop"
        expand="lg"
      >
        <Container className="w-100 navb " fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="w-100">
            <Nav className="w3c_nav">
              {mainCategoryForVisitor.map((main) => (
                <div className="w3c_dropdown" key={main.link}>
                  <div className="dropbtn">{main.label}</div>
                  <div className="dropdown-content">
                    <div className="row">
                      {
                        [subCategory1, subCategory2, subCategory3].map(
                          (subCat, idx) => (
                            <ul key={idx} className="column">
                              {subCat[main.link]?.map((sub, index) => (
                                <SubCategory
                                  key={`${sub}-${index}`}
                                  mainLink={main.link}
                                  sub={sub}
                                  childCategory={childCategory}
                                />
                              ))}
                            </ul>
                          )
                        )
                      }
                    </div>
                  </div>
                </div>
              ))}
            </Nav>
            {/* Old logic */}
            {/* <Nav className="w3c_nav">
              {mainCategoryForVisitor.map((main) => (
                <div className="w3c_dropdown" key={main.link}>
                  <div className="dropbtn">{main.label}</div>
                  <div className="dropdown-content">
                    <div className="row">
                      <ul className="column_visitor">
                        <li className="subCat">
                          PLEASE &nbsp;<b>LOGIN</b>&nbsp; OR &nbsp;<b>REGISTER</b>&nbsp; TO EXPLORE
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar
        collapseOnSelect
        className="nav_bgc w-100 navb_visitor_mobile"
      >
        <Container className="w-100 navb" fluid>
          <Nav className="Navb_visitor_categories">
            {mainCategoryForVisitor.map((main) => (
              <div className="dropbtn_mobile"
                onClick={() => goRegister()}
              >{main.label}</div>
            ))}
          </Nav>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose} className="login_preview_items">
        <LoginRegisterPage />
      </Modal>
    </>
  );
};

export default NavbComponentForVisitors;