import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import FetchAuthFromServer from "../FetchAuthFromServer";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AdminLinksComponent = () => {
  const dispatch = useDispatch();
  const isAuth = FetchAuthFromServer();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(isAuth).length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isAuth]);

  const [openClientVersion, setOpenClientVersion] = useState(false);

  const adminLinks = [
    {
      title: "Orders",
      link: "/admin/orders",
      access: "isAdmin",
    },
    {
      title: "Products",
      link: "/admin/products",
      access: "isAdmin",
    },
    {
      title: "Users",
      link: "/admin/users",
      access: "isAdmin",
    },
    {
      title: "Delivery Books",
      link: "/admin/deliveryBooks",
      access: "isAdmin",
    },
    {
      title: "Checks",
      link: "/admin/checks",
      access: "isSuperAdmin",
    },

  ];

  const myselfLinks = [
    {
      title: "Profile",
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

  const isPathInLinks = (links) =>
    links.some((link) => location.pathname === link.link);

  useEffect(() => {
    setOpenClientVersion(isPathInLinks(myselfLinks));
  }, [location]);

  const isPathActive = (path) => {
    return location.pathname.includes(path);
  };

  if (loading) {
    return (
      <Navbar className="user_side_navBar" style={{ backgroundColor: "white" }}>
        <Nav className="flex-column user_side_nav">
          <img src="/loading-gif.gif" alt="Loading" style={{ width: "150px", marginTop: "25%" }} className="loading-spinner" />
        </Nav>
      </Navbar>
    );
  }

  return (
    <>
      <Navbar className="user_side_navBar">
        <Nav className="flex-column user_side_nav">
          <Nav.Link style={{ color: "black" }} disabled>
            ADMIN:
          </Nav.Link>

          {adminLinks.map((link) => {
            if (hasAccess(link.access)) {
              if (link.title === "Quotes") {
                return (
                  <LinkContainer key={link.title} to={link.link} isActive={() => isPathActive('/admin/quotes')}>
                    <Nav.Link className="user_side_nav_options">
                      {link.title}
                    </Nav.Link>
                  </LinkContainer>
                );
              } else {
                return (
                  <LinkContainer key={link.title} to={link.link}>
                    <Nav.Link className="user_side_nav_options">
                      {link.title}
                    </Nav.Link>
                  </LinkContainer>
                );
              }
            }
            return null;
          })}
        </Nav>
      </Navbar>
      <br />
      <br />
      <Navbar
        className="user_side_navBar"
        onClick={() => setOpenClientVersion(!openClientVersion)}
        style={{ cursor: "pointer" }}
      >
        <Nav className="flex-column user_side_nav">
          <Nav.Link style={{ color: "black" }} disabled>
            My Profile:
          </Nav.Link>

          <div hidden={!openClientVersion}>
            {myselfLinks.map((link) => {
              if (hasAccess(link.access)) {
                return (
                  <LinkContainer key={link.title} to={link.link}>
                    <Nav.Link>{link.title}</Nav.Link>
                  </LinkContainer>
                );
              }
              return null;
            })}
            <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
          </div>
        </Nav>
      </Navbar>
    </>
  );
};

export default AdminLinksComponent;
