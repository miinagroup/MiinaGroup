import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import LoginRegisterPage from "./LoginRegisterPage";
import "./SplashPage.css";

function SplashPage() {
  return (
    <>
      <div className="splashpage">
        <img src="./images/grayAUS-CTL.png" alt="" className="redAUS"></img>

        <Container className="center_container">
          {/*                 <div>
                <img src="./images/CTL-hex.png" alt="" className="rotate logo"></img>
                </div> */}

          <div className="loginReg">
            <LoginRegisterPage />
          </div>
        </Container>
      </div>
    </>
  );
}

export default SplashPage;
