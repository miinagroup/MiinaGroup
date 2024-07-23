import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import FetchAuthFromServer from "../FetchAuthFromServer";
import { useLocation } from "react-router-dom";

const UserLinksComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuth = FetchAuthFromServer();

  const userLinks = [
    {
      title: "Orders",
      link: "/user/my-orders",
      access: "all",
    },
    {
      title: "Quotes",
      link: "/user/my-quotes?tab=completedQuotes&pageNum=1",
      access: "all",
    },
    {
      title: "Uniforms",
      link: "/user/my-uniforms",
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

  const marketingLinks = [
    {
      title: "Marketing Team:",
      link: "none",
      access: "isMarketing, isSuperAdmin, accounts, isSales, isAdmin",
    },
    {
      title: "Analytics",
      link: "/user/analytics",
      access: "isMarketing, isSuperAdmin, accounts, isSales, isAdmin",
    },
    {
      title: "Posts Track",
      link: "/user/postsTrack",
      access: "isMarketing, isSuperAdmin, accounts, isSales, isAdmin",
    },
    {
      title: "User Interactions",
      link: "/user/userInteractions",
      access: "isMarketing, isSuperAdmin, accounts, isSales, isAdmin",
    },
    {
      title: "BACK TO ADMIN",
      link: "/admin/orders",
      access: "isSuperAdmin, accounts, isSales, isAdmin",
    },
  ];

  const hasAccess = (access) => {
    if (access === "all") return true;
    const roles = access.split(",");
    return roles.some((role) => isAuth[role.trim()]);
  };

  const isPathActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <>
      <Navbar className="user_side_navBar">
        <Nav className="flex-column user_side_nav">
          {userLinks.map((link) => {
            if (hasAccess(link.access)) {
              if (link.title === "Quotes") {
                return (
                  <LinkContainer key={link.title} to={link.link} isActive={() => isPathActive('/user/my-quotes')}>
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
          <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      <br />
      <Navbar className="user_side_navBar">
        <Nav className="flex-column user_side_nav">
          {marketingLinks.map((link) => {
            if (hasAccess(link.access)) {
              if (link.title === "Marketing Team:") {
                return (
                  <Nav.Link
                    key={link.title}
                    style={{ color: "black" }}
                    disabled={true}
                    className="user_side_nav_options"
                  >
                    {link.title}
                  </Nav.Link>
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
    </>
  );
};

export default UserLinksComponent;
