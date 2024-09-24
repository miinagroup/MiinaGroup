import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useState, useEffect } from "react";

import styles from "./UserProfilePageComponent.module.css";

const UserProfilePageComponent = ({
  updateUserApiRequest,
  fetchUser,
  getdeliveryBooks,
  userInfoFromRedux,
  setReduxUserState,
  reduxDispatch,
  localStorage,
  sessionStorage,
}) => {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    success: "",
    error: "",
  });
  const [user, setUser] = useState({});
  const userInfo = userInfoFromRedux;
  const [deliveryBooks, setDeliveryBooks] = useState();
  const [selectedSite, setSelectedSite] = useState(null);



  useEffect(() => {
    fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo._id]);

  useEffect(() => {
    getdeliveryBooks()
      .then((deliveryBooks) => setDeliveryBooks(deliveryBooks))
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );
  }, []);

  const deliverySites = deliveryBooks && deliveryBooks[0].sites;

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const mobile = form.mobile.value;
    const company = form.company.value;
    const role = form.role.value;
    const deliveryAddress = form.deliveryAddress.value;
    const state = form.state.value;
    const postCode = form.postCode.value;
    const siteSku = form.siteSku;
    const location = form.location;

    if (event.currentTarget.checkValidity() === true) {
      updateUserApiRequest(
        name,
        lastName,
        email,
        phone,
        mobile,
        location,
        company,
        role,
        deliveryAddress,
        state,
        postCode,
        siteSku
      )
        .then((data) => {
          setUpdateUserResponseState({ success: data.success, error: "" });

          const updatedUserInfo = data.userUpdated;

          const currentUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  
          const newUserInfo = {
            ...currentUserInfo,
            siteSku: updatedUserInfo.siteSku,
            siteVerified: updatedUserInfo.siteVerified,
            location: updatedUserInfo.location,
          };
  
          localStorage.setItem("userInfo", JSON.stringify(newUserInfo));

          reduxDispatch(
            setReduxUserState({
              doNotLogout: userInfo.doNotLogout,
              ...data.userUpdated,
            })
          );
          if (userInfo.doNotLogout)
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: true, ...data.userUpdated })
            );
          else
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: false, ...data.userUpdated })
            );
        })
        .catch((er) =>
          setUpdateUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };


  const handleSiteChange = (e) => {
    const site = deliveryBooks[0].sites.find(
      (site) => site.id === e.target.value || site.name === e.target.value
    );
    setSelectedSite(site);
  };
  
  return (
    <Container className={styles.userProfilePageComponent}>
      <Row className="justify-content-md-center">
        <Col md={6} className="w-75">
          <h1>Change your profile</h1>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={user.name}
                  name="name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="formBasicLastName">
                <Form.Label>Your last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={user.lastName}
                  name="lastName"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  disabled
                  value={user.email}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  defaultValue={user.phone}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  defaultValue={user.mobile}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="formBasicLocation">
                <Form.Label>Delivery Site:</Form.Label>
                <Form.Select
                  required
                  name="sites"
                  aria-label="Default select example"
                  onChange={handleSiteChange}
                  disabled
                >
                  {deliverySites &&
                    deliverySites.map((site, idx) => {
                      return site.name !== "" ? (
                        user.location?.toLowerCase() ===
                        site.name?.toLowerCase() ? (
                          <option selected key={idx} value={site.name}>
                            {site.name}
                          </option>
                        ) : (
                          <option key={idx} value={site.name}>
                            {site.name}
                          </option>
                        )
                      ) : (
                        <option key={idx} value={site.name}>
                          {site.name}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="formBasicCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  disabled
                  value={user.company}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="role"
                  placeholder="Role"
                  defaultValue={user.role}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicPostCode">
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                  type="text"
                  name="postCode"
                  placeholder="Postcode"
                  defaultValue={user.postCode}
                />
              </Form.Group>
            </Row>

            <Row className="mb-4" style={{ display: "none" }}>

              <Form.Group as={Col} md="5" controlId="formBasicdeliveryAddress">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control
                  type="text"
                  name="deliveryAddress"
                  placeholder="Delivery Address"
                  defaultValue={user.deliveryAddress}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formBasicState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  placeholder="State"
                  defaultValue={user.state}
                />
              </Form.Group>
            </Row>

            <Row className="mt-1 ms-2 justify-content-md-left">
              <Button variant="primary" type="submit" className="w-auto">
                Update
              </Button>
              <p></p>
              <Alert
                show={
                  updateUserResponseState &&
                  updateUserResponseState.error !== ""
                }
                variant="danger"
              >
                Something went wrong
              </Alert>
              <Alert
                show={
                  updateUserResponseState &&
                  updateUserResponseState.success === "user updated"
                }
                variant="info"
              >
                User updated
              </Alert>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePageComponent;
