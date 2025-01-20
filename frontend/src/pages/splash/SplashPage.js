import React from "react";
import LoginRegisterPage from "../LoginRegisterPage";
import "./SplashPage.css";

function SplashPage() {
  return (
      <div className="splashpagewrapper">
          <div className="loginRegWrapper">
            <LoginRegisterPage />
          </div>
      </div>
  );
}

export default SplashPage;
