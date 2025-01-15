import React, { useState, useEffect } from "react";
import MaskedInput from 'react-text-mask';
import {
  Alert,
  Container,
  Button,
  Col,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const RegisterPageComponent = ({
  registerUserApiRequest,
  reduxDispatch,
  setReduxUserState,
  getAlldeliveryBooks
}) => {
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
    userCreated: null
  });

  // confirm password validation
  const [password, setPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [userCompany, setUserCompany] = useState("")
  const [userLocation, setUserLocation] = useState("")
  const [userRole, setUserRole] = useState("")
  const [selectedSites, setSelectedSites] = useState({})
  const [abnNum, setAbnNum] = useState("")
  const abnMask = [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]
  const [deliveryBookData, setDeliveryBookData] = useState();
  const [userSites, setUserSites] = useState([])

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordsMatch(value === password);
  };

  useEffect(() => {
    getAlldeliveryBooks().then((data) => {
      setDeliveryBookData(data);
      const userSitesData = data.map(company => ({
        company: company.companyName,
        sites: company.sites.map(site => site.name),
        abn: company.abn || "",
        emailHost: company.emailHost
      }))
      setUserSites(userSitesData)
    })
  }, [])

  const isValidEmail = (email) => {
    const emailDomain = email.split('@')[1];
    const isAllowedEmail = userSites.some((site) => {
      const allowedDomains = site.emailHost.split('/');
      return allowedDomains.some(domain => emailDomain.endsWith(domain));
    });
    return !isAllowedEmail
  };

  const setUserDetails = (emailHost) => {
    const emailDomain = emailHost.toLowerCase();
    const userCompany = userSites.find((site) => {
      const allowedDomains = site.emailHost.toLowerCase().split('/');
      return allowedDomains.some((domain) => emailDomain.endsWith(domain));
    });

    if (userCompany) {
      setUserCompany(userCompany.company);
      setSelectedSites(userCompany);
      setUserLocation(userCompany.sites[0]);
      setAbnNum(userCompany.abn || "No ABN");
    } else {
      setUserCompany("No Company");
      setUserLocation("No Site");
      setUserRole("No Role");
      setShow(false);
      setShowLocation(false);
      setShowAbn(true);
      setAbnNum("No abn");
    }
  };

  // submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value.toLowerCase();
    const name = form.name.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    const phone = form.phone.value;
    const mobile = form.phone.value;
    const location = userLocation;
    const company = userCompany;
    const role = userRole === "other role" ? otherRole : userRole;
    const deliveryAddress = "new user";
    const billAddress = "new user";
    const abn = abnNum;
    if ((location === "") && (company !== "")) {
      alert("Please Select Your Site")
    } else if (
      event.currentTarget.checkValidity() === true &&
      email &&
      password &&
      name &&
      lastName &&
      phone &&
      mobile &&
      location &&
      company &&
      role &&
      deliveryAddress &&
      billAddress &&
      form.password.value === form.confirmPassword.value &&
      abn
    ) {
      /* After clicking submit, the validity is determined. If everything in the form is true, then loading is true. This state will be used later to operate the spinner. */
      setRegisterUserResponseState({ loading: true });
      registerUserApiRequest(
        name,
        lastName,
        email,
        password,
        phone,
        mobile,
        location,
        company,
        role,
        deliveryAddress,
        billAddress,
        abn
      )
        .then((data) => {
          setRegisterUserResponseState({
            success: data.success,
            loading: false,
            userCreated: data.userCreated
          });
          reduxDispatch(setReduxUserState(data.userCreated));
          if (isValidEmail(email)) {
            window.location.href = "/unfortunately";
          } else {
            setUserCompany("")
            setUserLocation("")
            setSelectedSites(userSites[0])
            form.email.value = "";
            form.name.value = "";
            form.lastName.value = "";
            form.password.value = "";
            form.location.value = "";
            form.company.value = "";
            form.role.value = "";
            form.abn.value = "";
            setValidated(false);
            setEmailSent(true);
          }
        })
        // incase some error写一个catch error的function
        .catch((er) => {
          setRegisterUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        }
        );
    } else {
      console.log("Something wrong");
    }
    setValidated(true);
  };


  /* **************** Show Password **************** */
  const [showPassword, setShowPassword] = useState(false);

  const [show, setShow] = useState(false);
  const [showAbn, setShowAbn] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const [showLocation, setShowLocation] = useState(false);
  const handleCloseLocation = () => {
    setShowLocation(false);
  };
  const handleEmail = (e) => {
    const email = e.target.value
    if (email === "" || email === null) {
      setShow(false);
      setShowLocation(false);
      setShowAbn(false)
    } else {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        alert("Invalid email format")
      } else {
        setShow(true);
        setShowAbn(false);
        const emailHost = email.split("@")[1];
        const tempCompany = emailHost.split(".")[0];
        setUserDetails(emailHost);
      }
    }
  };
  const handleAbn = (e) => {
    const newValue = e.target.value;
    setAbnNum(newValue);
  };

  const handleChangeLocation = (e) => {
    setUserLocation(e.target.value)
  }
  const handleInputChange = (e) => {
    setUserCompany(e.target.value)
  }

  const [otherRole, setOtherRole] = useState();

  const handleOtherRole = (e) => {
    setOtherRole(e.target.value);
  }
  const handleChangeRole = (e) => {
    setUserRole(e.target.value)
  }

  return (
    <Container>
      <Row className="mt-4 justify-content-md-center">

        {registerUserResponseState.userCreated === null || registerUserResponseState.error === "user exists" ?

          <Col md={6} className="w-100">
            {/* <h2>Register</h2> */}
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    placeholder="First name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter first name.{" "}
                  </Form.Control.Feedback>
                  {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formBasicLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter last name.{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>

                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      onBlur={handleEmail}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email.{" "}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="formBasicPhone">
                  <Form.Control
                    required
                    type="tel"
                    name="phone"
                    pattern="[0-9]*"
                    placeholder="Phone Number"
                    style={{ display: "none" }}
                    value="12345678"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter phone number.{" "}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formBasicMobile">
                  <Form.Control
                    required
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value="12345678"
                    style={{ display: "none" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid mobile number.{" "}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="formBasicPostCode">
                  <Form.Control
                    type="text"
                    name="postCode"
                    placeholder="Postcode"
                    value="6000"
                    style={{ display: "none" }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Please provide a valid postcode.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3" style={{ display: "none" }}>
                <Form.Group as={Col} md="4" controlId="formBasicBillAddress">
                  <Form.Control
                    type="text"
                    name="billAddress"
                    placeholder="billAddress"
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Please provide a valid billAddress.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formBasicDeliveryAddress">
                  <Form.Control
                    type="text"
                    name="deliveryAddress"
                    placeholder="delivery Address"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid deliveryAddress.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formBasicState">
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="State"
                    value="WA"
                    required
                    style={{ display: "none" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  minLength={6}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Password should have at least 6 characters
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  minLength={6}
                  onChange={handleConfirmPassword}
                  isInvalid={!passwordsMatch}
                />

                <Form.Control.Feedback type="invalid">
                  Both passwords should match
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
              </Form.Group>
              <Row></Row>

              {show ? (
                <>
                  <Row className="mb-3" >
                    <Form.Group as={Col} md="6" controlId="formBasicCompany">
                      <Form.Label>Company</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          name="company"
                          placeholder="Company"
                          value={userCompany}
                          aria-describedby="inputGroupPrepend"
                          required
                          disabled
                        />
                        <Form.Control.Feedback type="invalid">
                          Please mention company name.{" "}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="formBasicLocation">
                      <Form.Label>Location</Form.Label>
                      <Form.Select
                        required
                        name="location"
                        onChange={handleChangeLocation}
                        style={{ textTransform: "capitalize" }}
                      >
                        <option>--Select Site--</option>
                        {
                          selectedSites.sites?.map((site, idx) => (
                            <option key={idx} value={site} style={{ textTransform: "capitalize" }}>
                              {site.toLowerCase()}
                            </option>))
                        }
                      </Form.Select>
                    </Form.Group>

                    {userRole === "other role" && <Form.Group as={Col} md="6" controlId="formBasicRole" className="mt-3">
                      <Form.Control
                        required
                        type="text"
                        name="otherRole"
                        placeholder="Job Title"
                        onChange={handleOtherRole}
                        value={otherRole}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please mention your Job Title.{" "}
                      </Form.Control.Feedback>
                    </Form.Group>}
                  </Row>
                </>
              ) : showLocation ? (
                <>
                  <Row className="mb-3" >
                    <Form.Group as={Col} md="6" controlId="formBasicCompany">

                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          name="company"
                          placeholder="Company"
                          value={userCompany}
                          onChange={handleInputChange}
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please mention company name.{" "}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="formBasicLocation">
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          name="location"
                          placeholder="Site"
                          value={userLocation}
                          aria-describedby="inputGroupPrepend"
                          required
                          style={{ textTransform: "capitalize" }}
                        />

                        <Form.Control.Feedback type="invalid">
                          Please enter site location.{" "}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                </>
              ) : ("")}

              {showAbn ? (
                <>
                  <Form.Label>ABN</Form.Label>
                  <Form.Group as={Col} md="6" controlId="formBasicAbn">
                    <MaskedInput
                      mask={abnMask}
                      placeholder="ABN"
                      guide={false}
                      value={abnNum}
                      onChange={handleAbn}
                      render={(ref, props) => <Form.Control
                        required
                        minLength={14}
                        maxLength={14}
                        type="text"
                        name="abn"
                        ref={ref}
                        {...props}
                      />}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter ABN.
                    </Form.Control.Feedback>
                  </Form.Group>
                </>
              ) : ("")}


              <br />
              <Button type="submit" className="mb-3 loginBtn ">
                {registerUserResponseState &&
                  registerUserResponseState.loading === true ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}
                Submit
              </Button>
              <Alert
                show={
                  registerUserResponseState &&
                  registerUserResponseState.error === "user exists"
                }
                variant="danger"
              >
                User with that email already exists!
              </Alert>
            </Form>
          </Col>
          :
          <Alert
            show={
              registerUserResponseState &&
              registerUserResponseState.success === "User created"
            }
            variant="info"

          >
            A verification email has been sent to your registered email
            address. Please make sure to check your junk/spam folder as well.
            Be aware that it might take a few minutes for the email to arrive.
          </Alert>
        }

        {registerUserResponseState &&
          registerUserResponseState.loading === true ?
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          : (
            ""
          )}
      </Row>
    </Container >
  );
};

export default RegisterPageComponent;
