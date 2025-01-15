import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ForgotPasswordComponent from "./ForgotPasswordComponent";
import axios from "axios";

const LoginPageComponent = ({
  loginUserApiRequest,
  reduxDispatch,
  setReduxUserState,
  getdeliveryBooks,
}) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [showVerifySiteModal, setShowVerifySiteModal] = useState(false);
  const [shouldRenderVerifySiteModal, setShouldRenderVerifySiteModal] =
    useState(false);

  const currentUrl = window.location.href;

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = true;

    if (event.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseState({ loading: true });
      loginUserApiRequest(email, password, doNotLogout, ipAddress)
        .then((res) => {
          setLoginUserResponseState({
            success: res.success,
            loading: false,
            error: "",
          });

          if (res.userLoggedIn) {
            reduxDispatch(setReduxUserState(res.userLoggedIn));
          }
          if (
            res.success === "user logged in" &&
            !res.userLoggedIn.siteVerified
          ) {
            setEmail(res.userLoggedIn.email);
            setShouldRenderVerifySiteModal(true);
            localStorage.setItem("verificationPending", "true");
            setShowVerifySiteModal(true);
          } else if (
            res.success === "user logged in" &&
            !res.userLoggedIn.isAdmin
          ) {
            if (
              currentUrl.includes("login") ||
              currentUrl.includes("Register")
            ) {
              window.location.assign("/");
            } else {
              window.location.assign(currentUrl);
            }
          } else {
            if (
              currentUrl.includes("login") ||
              currentUrl.includes("Register")
            ) {
              window.location.assign("/admin/orders");
            } else {
              window.location.assign(currentUrl);
            }
          }
        })
        .catch((er) => {
          const errorMessage = er.response.data.message || er.response.data;
          setLoginUserResponseState({ error: errorMessage, loading: false });
          setErrorMessage(errorMessage);
        });
    }

    setValidated(true);

    event.preventDefault();

    if (
      email.endsWith("@slrltd.com") ||
      email.endsWith("@focusminerals.com.au") ||
      email.endsWith("@ctlservices.com.au") ||
      email.endsWith("@ctlaus.com") ||
      email.endsWith("@evolutionmining.com")
    ) {
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => setIpAddress(data.ip));
    } else {
      setErrorMessage("You are not authorized to login!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/get-token");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("userInfo");
        } else {
          console.error(error);
        }
      }
    };
    checkAuth();
  }, []);

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  useEffect(() => {
    const verificationPending = localStorage.getItem("verificationPending");

    if (userInfo.siteVerified) {
      localStorage.removeItem("verificationPending");
      setTimeout(() => {
        window.location.href = "/home";
      }, 500);
    }

    if (verificationPending) {
      setEmail(userInfo.email);
      setShouldRenderVerifySiteModal(true);
      localStorage.setItem("verificationPending", "true");
      setShowVerifySiteModal(true);
    }
  }, [userInfo]);

  const refreshUserInfo = () => {
    window.location.reload();
  };

  return (
    <>
      <Container >
        <Row className="mt-5 justify-content-md-center">
          <Col md={6} className="w-100">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  required
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    minLength={6}
                  />
                  <InputGroup.Text>
                    <i
                      className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"
                        }`}
                      onClick={togglePasswordVisibility}
                      aria-hidden="true"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  name="doNotLogout"
                  type="checkbox"
                  label="Do not logout"
                />
              </Form.Group>

              <Button className="mb-3 loginBtn" type="submit">
                {loginUserResponseState &&
                  loginUserResponseState.loading === true ? (
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
                Login
              </Button>

              <Alert
                show={
                  loginUserResponseState &&
                  loginUserResponseState.error === "wrong credentials"
                }
                variant="danger"
              >
                Incorrect email or password!
              </Alert>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </Form>
            <ForgotPasswordComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPageComponent;
