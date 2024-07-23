import React, { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import {
  Alert,
  Container,
  Button,
  Col,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import styles from "./LoginRegisterPageMobile.module.css";

const RegisterPageComponentMobile = ({
  registerUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  //去react bootstrap里面找，form => validation 抄一个
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    /* 这个是spinner，如果是loading：false了，那就不显示spinner */
    success: "",
    error: "",
    loading: false,
  });

  console.log(registerUserResponseState);
  /*   const [passwordsMatchState, setPasswordsMatchState] = useState(true);

  //const一个function去检测，确认密码是否匹配原始密码
  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    if (confirmPassword.value === password.value) {
      setPasswordsMatchState(true);
    } else {
      setPasswordsMatchState(false);
    }
  }; */

  // confirm password validation
  const [password, setPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userCompany, setUserCompany] = useState("")
  const [userLocation, setUserLocation] = useState("")
  const [userSites, setUserSites] = useState([
    { company: "SILVERLAKE RESOURCES", sites: ['RANDALLS', 'DAISY MILANO', 'MAXWELLS'] },
    { company: "CTL AUSTRALIA", sites: ['PERTH', 'EMBLETON', 'CANNINGTON', 'China', 'India'] },
    { company: "FOCUS MINERALS OPERATIONS", sites: ['THREE MILE HILL COOLGARDIE', 'COOLGARDIE GOLD OPERATIONS'] },
    { company: "EVOLUTION MINING (MUNGARI)", sites: ['MUNGARI'] },
  ])
  const [selectedSites, setSelectedSites] = useState({})

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordsMatch(value === password);
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
    const company = form.company?.value.toUpperCase();
    const role = form.role.value;
    const deliveryAddress = "new user";
    const billAddress = "new user";
    //TODO if need deliveryAddress again, change the value from location to deliveryAddress.
    const state = form.state.value;
    const postCode = form.postCode.value;
    // if (email.endsWith("@slrltd.com") || email.endsWith("@slrltd.com.au") || email.endsWith("@silverlakeresources.com.au")) {
    //   if (location.toUpperCase() === "RANDALLS" || location.toUpperCase() === "RANDALLS MILLS") { setStoreEmail("randallssupply@silverlakeresources.com.au") }
    //   if (location.toUpperCase() === "DAISY MILANO" || location.toUpperCase() === "DAISY") { setStoreEmail("daisymilano@silverlakeresources.com.au") }
    //   if (location.toUpperCase() === "MOUNT MONGER" || location.toUpperCase() === "MMO") { setStoreEmail("mountmonger@silverlakeresources.com.au") }

    // }
    /* 下面是一些form里面的判定 validation的判定 */
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
      state &&
      postCode &&
      form.password.value === form.confirmPassword.value
    ) {
      /* 点击submit了之后，判定validity，如果form里面的东西都是true了，那loading true。后面会用这个state操作spinner */
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
        state,
        postCode
      )
        .then((data) => {
          /* 如果data success了，那就set spinner false */
          setRegisterUserResponseState({
            success: data.success,
            loading: false,
          });
          reduxDispatch(setReduxUserState(data.userCreated));
        })
        // incase some error写一个catch error的function
        .catch((er) =>
          setRegisterUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    } else {
      console.log("Something wrong");
    }

    setValidated(true);

  };

  // useEffect(() => {
  //   getAlldeliveryBooks().then((data) => {
  //     console.log("data", data);
  //   })
  // }, [])

  /* **************** Show Password **************** */
  const [showPassword, setShowPassword] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const [showLocation, setShowLocation] = useState(false);
  const handleCloseLocation = () => {
    setShowLocation(false);
  };
  const handleEmail = (e) => {
    //selectedSites.length = 0
    const email = e.target.value
    if (email === "" || email === null) {
      setShow(false);
      setShowLocation(false);
    } else {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        alert("Invalid email format")
      } else {
        setShow(true)
        const emailHost = email.split("@")[1]
        const tempCompany = emailHost.split(".")[0]
        switch (emailHost.toLowerCase()) {
          case 'slrltd.com':
            setUserCompany("SILVERLAKE RESOURCES")
            setSelectedSites(userSites[0])
            //handleSelectedSites("SILVERLAKE RESOURCES")
            break;
          case 'silverlakeresources.com.au':
            setUserCompany("SILVERLAKE RESOURCES")
            setSelectedSites(userSites[0])
            break;
          case 'ctlservices.com.au':
            setUserCompany("CTL AUSTRALIA")
            setSelectedSites(userSites[1])
            break;
          case 'ctlaus.com':
            setUserCompany("CTL AUSTRALIA")
            setSelectedSites(userSites[1])
            break;
          case 'focusminerals.com.au':
            setUserCompany("FOCUS MINERALS OPERATIONS")
            setSelectedSites(userSites[2])
            break;
          case 'evolutionmining.com':
            setUserCompany("EVOLUTION MINING (MUNGARI)")
            setSelectedSites(userSites[3])
            break;
          default:
            setUserCompany(tempCompany)
            setUserLocation(tempCompany)
            setShow(false)
            setShowLocation(true)
            break;
        }
      }
    }
  };

  // const handleSelectedSites = (company) => {
  //   var siteList = []
  //   userSites.map((site, idx) => {
  //     if (site.company?.toUpperCase() === company?.toUpperCase()) {
  //       site.sites.map((data, index) => {
  //         console.log(data);
  //         siteList.push({ "index": index, "value": data })
  //       })
  //       console.log(siteList);
  //       setSelectedSites([{ ...siteList }])
  //     }
  //   })
  //   setSelectedSites([selectedSites[0]])
  // }

  const handleChangeLocation = (e) => {
    setUserLocation(e.target.value)
  }
  const handleInputChange = (e) => {
    setUserCompany(e.target.value)
  }

  return (
    <Container>
        <Alert
                      show={
                        registerUserResponseState &&
                        registerUserResponseState.success === "User created"
                      }
                      variant="primary"
                      className={styles.alert_registration}
                    >
                      <div className={styles.alert_text}>
                        Your registration was successful, and we're now verifying your account. 
                        <br />
                        To enjoy full access, please check out the desktop version of our website.
                      </div>
                    </Alert>                

                    {registerUserResponseState && registerUserResponseState.loading === true &&
                      <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    }
                    {registerUserResponseState.success === "" && <Row className="justify-content-md-center">
                <Col md={6}>

                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <Row className="">
                      <Form.Group as={Col} md="4" controlId="validationCustom01" className={styles.form_row}>
                      <Form.Label className={styles.form_label}>Firstname</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="name"
                          placeholder="John"
                          size="sm"
                          className="mb-2"
                        />
                        <Form.Control.Feedback type="invalid" className="mb-3">
                          Please enter first name.{" "}
                        </Form.Control.Feedback>
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                      </Form.Group>

                      <Form.Group as={Col} md="4" controlId="formBasicLastName" className={styles.form_row}>
                      <Form.Label className={styles.form_label}>Lastname</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="lastName"
                          placeholder="Doe"
                          size="sm"
                          className="mb-2"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter last name.{" "}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="4" controlId="formBasicEmail" className={styles.form_row}>
                      <Form.Label className={styles.form_label}>Email</Form.Label>
                        <InputGroup hasValidation>
                          {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            aria-describedby="inputGroupPrepend"
                            onBlur={handleEmail}
                            required
                            size="sm"
                            className="mb-2"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid email.{" "}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group as={Col} md="4" controlId="formBasicPhone" className={styles.form_row}>
                      <Form.Label className={styles.form_label}>Phone number</Form.Label>
                        <Form.Control
                          required
                          type="tel"
                          name="phone"
                          pattern="[0-9]*"
                          placeholder="Phone Number"
                          size="sm"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter phone number.{" "}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="4" controlId="formBasicRole" className={styles.form_row}>
                      <Form.Label className={styles.form_label}>Role</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="role"
                          placeholder="Role"
                          size="sm"
                          className="mb-2"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please mention your role.{" "}
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
                    {show ? (
              <>
                <Row className="mb-2" >
                  <Form.Group as={Col} md="6" controlId="formBasicCompany" className={styles.form_row}>
                    <InputGroup hasValidation className="mb-2">
                      <Form.Control
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={userCompany}
                        aria-describedby="inputGroupPrepend"
                        required
                        size="sm"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please mention company name.{" "}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="formBasicLocation" className={styles.form_row}>
                    {/* <Form.Control
                        type="text"
                        name="location"
                        placeholder="Site"
                        aria-describedby="inputGroupPrepend"
                        required
                      /> */}

                    <Form.Select
                      required
                      name="location"
                      onChange={handleChangeLocation}
                      size="sm"
                    >
                      <option>--Select Site--</option>
                      {
                        selectedSites.sites?.map((site, idx) => (
                          < option key={idx} value={site} >
                            {site}
                          </option>))
                      }
                    </Form.Select>
                    {/* <Form.Control.Feedback type="invalid">
                        Please enter site location.{" "}
                      </Form.Control.Feedback> */}
                  </Form.Group>
                </Row>
              </>
            ) : showLocation ? (
              <>
                <Row className="mb-3" >
                  <Form.Group as={Col} md="6" controlId="formBasicCompany" className={styles.form_row}>
                    <InputGroup hasValidation className="mb-2">
                      <Form.Control
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={userCompany}
                        onChange={handleInputChange}
                        aria-describedby="inputGroupPrepend"
                        required
                        size="sm"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please mention company name.{" "}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="formBasicLocation" className={styles.form_row}>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        name="location"
                        placeholder="Site"
                        aria-describedby="inputGroupPrepend"
                        required
                        size="sm"
                        />

                      <Form.Control.Feedback type="invalid">
                        Please enter site location.{" "}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
              </>
            ) : ("")}

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
                />
                <Form.Control.Feedback type="invalid">
                  {" "}
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

                    <Row>
                      <Form.Group className={styles.form_row} controlId="formBasicPassword">
                              <Form.Label className={styles.form_label}>Password</Form.Label>
                                <Form.Control
                                  name="password"
                                  required
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Password"
                                  minLength={6}
                                  onChange={(e) => setPassword(e.target.value)}
                                  size="sm"
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please enter a valid password
                                </Form.Control.Feedback>
                                <Form.Text className={`${styles.form_undertext} text-muted`}>
                                  Password should have at least 6 characters
                                </Form.Text>
                            </Form.Group>
                    </Row>
                    
                    <Row>
                    <Form.Group className={styles.form_row} controlId="formBasicPasswordRepeat">
                    <Form.Label className={styles.form_label}>Confirm Password</Form.Label>
                      <Form.Control
                        name="confirmPassword"
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        minLength={6}
                        onChange={handleConfirmPassword}
                        isInvalid={!passwordsMatch}
                        size="sm"
                      />

                      <Form.Control.Feedback type="invalid">
                        Both passwords should match
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={styles.form_check}>
                      <Form.Check
                        type="checkbox"
                        label="Show Password"
                        onChange={(e) => setShowPassword(e.target.checked)}
                      />
                    </Form.Group>
                    </Row>

                    {/* <Form.Group className="mb-3">
                      <Form.Check
                        required
                        label="Agree to terms and conditions"
                        name="tc"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                      />
                    </Form.Group>

                    <Row className="pb-2">
                      <Col>
                        {" "}
                        Do you have an account already?
                        <Link to={"/login"}> Login </Link>
                      </Col>
                    </Row> */}

                    <br />
                    <Button type="submit" className="mb-1">
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
                    {/* 在user controller里面handle了user exists 以及 user created */}
                    <Alert
                      show={
                        registerUserResponseState &&
                        registerUserResponseState.error === "user exists"
                      }
                      variant="danger"
                    >
                      User with that email already exists!
                    </Alert>
                    {/* <Alert
                      show={
                        registerUserResponseState &&
                        registerUserResponseState.success === "User created"
                      }
                      variant="info"
                      hidden={emailSent === false}
                    >
                      A verification email has been sent to your registered email
                      address. Please make sure to check your junk/spam folder as well.
                      Be aware that it might take a few minutes for the email to arrive.
                    </Alert> */}
                  </Form>
                </Col>
              </Row>
              }

    </Container >
  );
};

export default RegisterPageComponentMobile;
