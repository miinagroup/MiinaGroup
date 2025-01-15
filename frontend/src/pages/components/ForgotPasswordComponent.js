import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";

function ForgotPasswordComponent() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {setShow(false); setMessage(""); setSuccessMessage(""); setSubmitting(false);};
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    const email = form.email.value.toLowerCase();

    try {
      setSubmitting(true);
      setMessage("");
      setSuccessMessage("");
      const response = await axios.post("/api/users/forgotPassword", { email });
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccessMessage("");
          setShow(false);
          handleClose();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        handleNonSuccessStatus(error.response);
      } else {
        setMessage("Failed to reset password. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleNonSuccessStatus = (response) => {
    if (response.status === 400) {
      setMessage("Email address is required.");
    } else if (response.status === 404) {
      setMessage("User not found. Please try again.");
    } else if (response.status === 401) {
        setMessage("User email is not verified. Please contact our customer service for assistance.");
    } else {
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div>
        <button
          className="reminderBtn"
          id="customer-popup-forgot"
          onClick={handleShow}
        >
          <span>Forgot your password?</span>
        </button>
      </div>

      <Modal show={show} onHide={handleClose} className="mt-5">
        <Modal.Header closeButton className="pt-2 pb-2">
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
            Forgot Password ?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="secondary fs-5"></div>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Enter your registered email"
              />
            </Form.Group>
            <Button className="CTL_btn mt-3" type="submit" disabled={submitting || successMessage !==""}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
          {message && (
            <p className="error-message text-danger mt-3 mb-0">{message}</p>
          )}
          {successMessage && (
            <p className="error-message mt-3 mb-0">{successMessage}</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ForgotPasswordComponent;
