import { useParams, Link } from "react-router-dom";
import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./EmailVerify.css";

const ResetPassword = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dots, setDots] = useState(".");
  const param = useParams();

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        const url = `/api/users/${param.id}/resetPassword/${param.token}`;
        const { data } = await axios.get(url);
        if (data.message === "Link valid") {
          setValidUrl(true);
        } else {
          setValidUrl(false);
        }
      } catch (error) {
        console.error(error);
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 6 ? "." : prevDots + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setSubmitting(true);
      const url = `/api/users/resetPassword`;
      const { data } = await axios.put(url, {
        userId: param.id,
        resetPasswordToken: param.token,
        newPassword: password,
      });
      if (data.message === "Password reset successfully") {
        setSubmitting(false);
        alert("Password reset successfully, Redirect to login page!");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <Fragment>
      <div className="resetPassword">
        <img
          src="/images/miina_logo.png"
          alt="Miina Group Logo"
          className="verified_logo rotate linear infinite mb-5"
        />
        {validUrl ? (
          <form onSubmit={handleSubmit}>
            <p className="p-0 m-0 mt-2 mb-1">New password:</p>
            <div className="password-input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"
                  } password-toggle-button`}
                onClick={togglePasswordVisibility}
                aria-hidden="true"
              ></i>
            </div>

            <p className="p-0 m-0 mt-3 mb-1">Confirm password:</p>
            <div className="password-input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"
                  } password-toggle-button`}
                onClick={togglePasswordVisibility}
                aria-hidden="true"
              ></i>
            </div>

            {passwordError && (
              <p className="error-message text-danger">{passwordError}</p>
            )}
            <Button
              className="CTL_btn p-1 pe-2 ps-2 mt-3"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Resetting" : "Reset Password"}
            </Button>
          </form>
        ) : (
          <h1>Authorizing{dots}</h1>
        )}
      </div>
    </Fragment>
  );
};

export default ResetPassword;
