import { Nav, Navbar, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import FetchAuthFromServer from "../Utils/FetchAuthFromServer";
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
      title: "Companies",
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
      title: "My Orders",
      link: "/user/my-orders",
      access: "all",
    },
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
          <Spinner animation="border" role="status" variant="success"></Spinner>
        </Nav>
      </Navbar>
    );
  }

  return (
    <>
      <Navbar className="user_side_navBar admin-links">
        <Nav className="flex-column user_side_nav">
          <Nav.Link disabled>
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
        <Nav className="flex-column user_side_nav admin-links">
          <Nav.Link disabled>
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
