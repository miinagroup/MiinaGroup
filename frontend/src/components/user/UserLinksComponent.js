import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FetchAuthFromServer from "../Utils/FetchAuthFromServer";
import { useLocation } from "react-router-dom";
import axios from "axios";

import styles from "../../pages/user/components/UserProfilePageComponent.module.css"

const UserLinksComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const isAuth = FetchAuthFromServer();
  const [deliveryBook, setDeliveryBook] = useState()

  const userLinks = [

    {
      title: "BACK TO ADMIN",
      link: "/admin/orders",
      access: "isSuperAdmin, accounts, isSales, isAdmin",
    },
    {
      title: "My Orders",
      link: "/user/my-orders",
      access: "all",
    },
    {
      title: "My Profile",
      link: "/user",
      access: "all",
    },
    {
      title: "Change Password",
      link: "/user/password",
      access: "all",
    },
  ];


  const hasAccess = (access) => {
    if (access === "all") return true;
    const roles = access.split(",");
    return roles.some((role) => isAuth[role.trim()]);
  };

  const isPathActive = (path) => {
    return location.pathname === path;
  };

  const getdeliveryBooks = async (email) => {
    const { data } = await axios.get("/api/deliveryBooks/deliveryBook/" + email);
    return data;
  };
  useEffect(() => {
    getdeliveryBooks(userInfo.email)
      .then((data) => {
        setDeliveryBook(data[0])
      }).catch((err) => console.log(err));
  }, [userInfo])

  return (
    <>
      <Navbar className={styles.userNavBarLinks}>
        <Nav className={styles.userNavBarLinksWrapper}>
          {userLinks.map((link) => {
            if (hasAccess(link.access)) {
                return (
                  <LinkContainer key={link.title} to={link.link}>
                    <Nav.Link className={`${styles.navLink} ${isPathActive(link.link) ? styles.active : ""} `}>
                      {isPathActive(link.link) && <img src="/images/SubmarkGreen.png" alt="Miina Bush Tree" className={styles.tagImage}/>}
                      {link.title}
                    </Nav.Link>
                  </LinkContainer>
                );
              }
              return null;
            })
          }
          <Nav.Link className={styles.navLink} onClick={() => dispatch(logout())}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      <br />
    </>
  );
};

export default UserLinksComponent;
