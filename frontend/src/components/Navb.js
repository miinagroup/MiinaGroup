import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./page.css";
import { mainCategory } from "./NavbMainCategories";
import axios from "axios";

const SubCategory = ({ mainLink, sub, childCategory, userInfo }) => { 
return   <>
    <li className="subCat">
      {userInfo && Object.keys(userInfo).length > 0 ? (
        <a
          href={`/product-list?categoryName=${mainLink}&subCategoryName=${sub}`}
        >
          {sub.replace(/-/g, " ").replace(/_/g, " & ")}
        </a>
      ) : (
        <span>{sub.replace(/-/g, " ").replace(/_/g, " & ")}</span>
      )}
    </li>
    {/* {childCategory[mainLink + "/" + sub]?.map((child, index) => (
      <li key={`${child}-${index}`} className="childCat">
        <a href={`/product-list?categoryName=${mainLink}&subCategoryName=${sub}&childCategoryName=${child}`}>
          {child.replace(/-/g, " ")}
        </a>
      </li>
    ))} */}
  </>
};

const Navb = () => {
  const categories = useSelector((state) => state.getCategories.categories);
  const subcategories = useSelector((state) => state.getCategories.subcategories);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/get-token");
        // console.log("Authorized");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // console.log("Unauthorized");
          localStorage.removeItem("userInfo");
        } else {
          console.error(error);
        }
      }
    };
    checkAuth();
    const verificationPending = localStorage.getItem("verificationPending");
    if (verificationPending) {
      window.location.href = "/login?verificationPending=true";
    }
  }, []);

  // console.log("categories", categories);

  const [subCategory1, setSubCategory1] = useState({});
  const [subCategory2, setSubCategory2] = useState({});
  const [subCategory3, setSubCategory3] = useState({});
  const [childCategory, setChildCategory] = useState({});

  useEffect(() => {
    let subCategories = {};
    let childCategories = {};

    const mainLinks = mainCategory.map((category) => category.link);

    categories?.forEach((category) => {
      if (!category.display) {
        return;
      }

      // const categoryName = category.name.replace(/_/g, " & ");

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
    });

    console.log(subCategories);
    console.log(childCategories);
    

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

  //console.log("mainCategory", mainCategory);
  //console.log("subCategory1", subCategory1);
  // console.log("subCategory2", subCategory2);
  //console.log("subCategory3", subCategory3);
  //console.log("childCategory", childCategory);

  return (
    <Navbar collapseOnSelect className="nav_bgc w-100" expand="lg">
      <Container className="w-100 navb" fluid>
        {/* Existing Navbar code remains the same... */}
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          <Nav className="w3c_nav">
            {mainCategory.map((main) =>
              main.label !== "QUOTE" ? (
                <div className="w3c_dropdown" key={main.link}>
                  <div className="dropbtn">
                    {userInfo && Object.keys(userInfo).length > 0 ? (
                      <a href={`/product-list?categoryName=${main.link}`}>
                        {main.label}
                      </a>
                    ) : (
                      <span>{main.label}</span>
                    )}
                  </div>
                  <div className="dropdown-content">
                    <div className="row">
                      {userInfo && Object.keys(userInfo).length > 0 ? (
                        [subCategory1, subCategory2, subCategory3].map(
                          (subCat, idx) => (
                            <ul key={idx} className="column">
                              {subCat[main.link]?.map((sub, index) => (
                                <SubCategory
                                  key={`${sub}-${index}`}
                                  mainLink={main.link}
                                  sub={sub}
                                  childCategory={childCategory}
                                  userInfo={userInfo}
                                />
                              ))}
                            </ul>
                          )
                        )
                      ) : (
                        <div className="row">
                          <ul className="column_visitor">
                            <li className="subCat">
                              PLEASE <a href="/login">LOGIN</a>
                              OR <a href="/register">REGISTER</a> TO EXPLORE
                              MORE
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : userInfo.isAdmin ? (
                <div className="w3c_dropdown" key={main.link}>
                  <div className="dropbtn">
                    {userInfo && Object.keys(userInfo).length > 0 ? (
                      <a href={`/product-list?categoryName=${main.link}`}>
                        {main.label}
                      </a>
                    ) : (
                      <span>{main.label}</span>
                    )}
                  </div>
                  {/* <div className="dropdown-content">
                    <div className="row">
                      {[subCategory1, subCategory2, subCategory3].map((subCat, idx) => (
                        <ul key={idx} className="column">
                          {subCat[main.link]?.map((sub, index) => (
                            <SubCategory key={`${sub}-${index}`} mainLink={main.link} sub={sub} childCategory={childCategory} />
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div> */}
                </div>
              ) : (
                ""
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navb;
