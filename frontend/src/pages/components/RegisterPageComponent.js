import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const RegisterPageComponent = ({
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
  const [emailSent, setEmailSent] = useState(false);
  const [userCompany, setUserCompany] = useState("")
  const [userLocation, setUserLocation] = useState("")
  const [userSites, setUserSites] = useState([
    { company: "SILVERLAKE RESOURCES", sites: ['RANDALLS', 'DAISY MILANO', 'MAXWELLS'] },
    { company: "CTL AUSTRALIA", sites: ['PERTH', 'EMBLETON', 'CANNINGTON', 'China', 'India'] },
    { company: "FOCUS MINERALS OPERATIONS", sites: ['THREE MILE HILL COOLGARDIE', 'COOLGARDIE GOLD OPERATIONS'] },
    { company: "EVOLUTION MINING (MUNGARI)", sites: ['MUNGARI'] },
    { company: "RED 5 LIMITED", sites: ['RANDALLS', 'DAISY MILANO', 'MAXWELLS'] }
  ])
  const [selectedSites, setSelectedSites] = useState({})
  const [abn, setAbn] = useState("")
  const abnMask = [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/,' ', /\d/, /\d/, /\d/]

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
    //const company = form.company?.value.toUpperCase();
    const company = userCompany;
    const role = form.role.value;
    const deliveryAddress = "new user";
    const billAddress = "new user";
    //TODO if need deliveryAddress again, change the value from location to deliveryAddress.
    const state = form.state.value;
    const postCode = form.postCode.value;
    const abn = form.abn.value;
    // if (email.endsWith("@slrltd.com") || email.endsWith("@slrltd.com.au") || email.endsWith("@silverlakeresources.com.au")) {
    //   if (location.toUpperCase() === "RANDALLS" || location.toUpperCase() === "RANDALLS MILLS") { setStoreEmail("randallssupply@silverlakeresources.com.au") }
    //   if (location.toUpperCase() === "DAISY MILANO" || location.toUpperCase() === "DAISY") { setStoreEmail("daisymilano@silverlakeresources.com.au") }
    //   if (location.toUpperCase() === "MOUNT MONGER" || location.toUpperCase() === "MMO") { setStoreEmail("mountmonger@silverlakeresources.com.au") }

    // }
    /* 下面是一些form里面的判定 validation的判定 */
    //console.log(company, location);
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
      form.password.value === form.confirmPassword.value &&
      abn
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
        postCode,
        abn
      )
        .then((data) => {
          /* 如果data success了，那就set spinner false */
          setRegisterUserResponseState({
            success: data.success,
            loading: false,
          });
          reduxDispatch(setReduxUserState(data.userCreated));

          // Check if the user's email ends with "@slrltd.com"
          if (
            (!email.endsWith("@slrltd.com") &&
              !email.endsWith("@ctlservices.com.au") &&
              !email.endsWith("@ctlaus.com") &&
              !email.endsWith("@focusminerals.com.au") &&
              !email.endsWith("@evolutionmining.com")) ||
            email === "Mekins@slrltd.com" ||
            email === "enzo@ctlservices.com.au"
          ) {
            // If not, redirect to the /unfortunately page
            window.location.href = "/unfortunately";
          } else {
            // If yes, clear the form fields
            setUserCompany("")
            setUserLocation("")
            setSelectedSites(userSites[0])
            form.email.value = "";
            form.name.value = "";
            form.lastName.value = "";
            form.password.value = "";
            form.phone.value = "";
            form.mobile.value = "";
            // form.location.value = "";
            // form.company.value = "";
            form.role.value = "";
            form.deliveryAddress.value = "";
            form.billAddress.value = "";
            form.state.value = "";
            form.postCode.value = "";
            form.abn.value = "";
            setValidated(false);
            setEmailSent(true);
            setTimeout(() => {
              setShow(false)
              window.location.href = "/?Register=true";
              //setAfterRegister(true)
            }, 7000);
          }
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
        setShow(false)
        const emailHost = email.split("@")[1]
        const tempCompany = emailHost.split(".")[0]
        switch (emailHost.toLowerCase()) {
          case 'slrltd.com':
            setUserCompany("SILVERLAKE RESOURCES")
            setSelectedSites(userSites[0])
            setUserLocation(userSites[0].sites[0])
            //handleSelectedSites("SILVERLAKE RESOURCES")
            break;
          case 'silverlakeresources.com.au':
            setUserCompany("SILVERLAKE RESOURCES")
            setSelectedSites(userSites[0])
            setUserLocation(userSites[0].sites[0])
            break;
          case 'ctlservices.com.au':
            setUserCompany("CTL AUSTRALIA")
            setSelectedSites(userSites[1])
            setUserLocation(userSites[1].sites[0])
            break;
          case 'ctlaus.com':
            setUserCompany("CTL AUSTRALIA")
            setSelectedSites(userSites[1])
            setUserLocation(userSites[1].sites[0])
            break;
          case 'focusminerals.com.au':
            setUserCompany("FOCUS MINERALS OPERATIONS")
            setSelectedSites(userSites[2])
            setUserLocation(userSites[2].sites[0])
            break;
          case 'evolutionmining.com':
            setUserCompany("EVOLUTION MINING (MUNGARI)")
            setSelectedSites(userSites[3])
            setUserLocation(userSites[3].sites[0])
            break;
          case 'red5limited.com.au':
            setUserCompany("RED 5 LIMITED")
            setSelectedSites(userSites[4])
            setUserLocation(userSites[4].sites[0])
            //handleSelectedSites("SILVERLAKE RESOURCES")
            break;
          default:
            // setUserCompany(tempCompany)
            // setUserLocation(tempCompany+"site-1")
            setUserCompany("No Company")
            setUserLocation("No Site")
            setShow(false)
            setShowLocation(false)
            break;
        }
      }
    }
  };
  const handleAbn = (e) => {
    const newValue = e.target.value;
    setAbn(newValue);
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
      <Row className="mt-4 justify-content-md-center">
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
                <InputGroup hasValidation>
                  {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
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
            <Form.Group as={Col} md="6" controlId="formBasicAbn">
              <MaskedInput
                mask={abnMask}
                placeholder="ABN"
                guide={false}
                value={abn}
                onChange={handleAbn}
                id="abn"
                render={(ref, props) => <Form.Control
                  required
                  minLength={14}
                  maxLength={14}
                  type="text"
                  name="abn"
                  pattern="/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/,' ', /\d/, /\d/, /\d/"
                  ref={ref}
                  {...props}
                />} 
               />
              <Form.Control.Feedback type="invalid">
                Please enter ABN.
              </Form.Control.Feedback>
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
              <Form.Group as={Col} md="4" controlId="formBasicRole">
                <Form.Control
                  required
                  type="text"
                  name="role"
                  placeholder="Job Title"
                  style={{ display: "none" }}
                  value="Employee"
                />
                <Form.Control.Feedback type="invalid">
                  Please mention your Job Title.{" "}
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
                <Row className="mb-3" >
                  <Form.Group as={Col} md="6" controlId="formBasicCompany">
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
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
            <Button type="submit" className="mb-3">
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
            <Alert
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
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container >
  );
};

export default RegisterPageComponent;
