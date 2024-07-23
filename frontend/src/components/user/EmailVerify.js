import { useParams, Link } from "react-router-dom";
import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import "./EmailVerify.css";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [dots, setDots] = useState(".");
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        // console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.error(error);
        setValidUrl(true);
      }
    };
    verifyEmailUrl();
  }, [param]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 6 ? "." : prevDots + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <div className="verifyEmail">
        <img
          src="/images/CTL-hex.png"
          alt=""
          className="verified_logo rotate linear infinite mb-5"
        />
        {validUrl ? (
          <>
            <h1>Email verified successfully</h1>
            <Link to="/login">
              <button className="blue_btn">Login</button>
            </Link>
          </>
        ) : (
          <h1>Verifying{dots}</h1>
        )}
      </div>
    </Fragment>
  );
};

export default EmailVerify;
