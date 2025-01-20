import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";

function VerifySiteComponent({ show, onHide, userSites, refreshUserInfo }) {
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  const handleClose = () => {
    onHide();
    setMessage("");
    setSuccessMessage("");
    setSubmitting(false);
  };

  const handleSiteChange = (e) => {
    const site = userSites.sites.find(
      (site) => site.id === e.target.value || site.name === e.target.value
    );
    setSelectedSite(site);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const location = selectedSite.name;

    try {
      setSubmitting(true);
      setMessage("");
      setSuccessMessage("");
      const response = await axios.put("/api/users/profile", {
        location,
      });

      if (response.status === 200) {
        const updatedUserInfo = response.data.userUpdated;
        const currentUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        const newUserInfo = {
          ...currentUserInfo,
          location: updatedUserInfo.location,
        };

        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));

        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccessMessage("Your site has been set successfully. Redirecting...");
          refreshUserInfo();
          handleClose();
        }, 500);
      }
    } catch (error) {
      setMessage("Failed to set your site. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="mt-5"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="pt-2 pb-2">
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
            Please Confirm Your Site
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="secondary fs-5"></div>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="fw-bold">Company:</Form.Label>
              <Form.Control
                name="company"
                required
                type="text"
                value={userSites?.companyName}
                disabled
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label className="fw-bold">Select Your Site:</Form.Label>
              <Form.Select name="site" required onChange={handleSiteChange}>
                <option value="">Select your site</option>
                {userSites?.sites.map((site, index) => (
                  <option key={index} value={site.id || site.name}>
                    {site.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button
              className="CTL_btn mt-3"
              type="submit"
              disabled={submitting || successMessage !== ""}
            >
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

export default VerifySiteComponent;
