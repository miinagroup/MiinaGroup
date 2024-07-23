import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const MarketingPostsCreateComponent = ({ createVisitorTrack }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fromList = ["LinkedIn", "Facebook", "Instagram", "Twitter", "YouTube", "Visitor"];

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget.elements;

    let baseUrl = "";

    if (process.env.NODE_ENV === "production") {
      baseUrl = "https://www.ctlaus.com/";
    } else {
      baseUrl = "http://localhost:3000/";
    }

    const sourceValue = form.source.value.trim().replace(/\s+/g, "_");

    const formInputs = {
      link: `${baseUrl}?from=${form.from.value}&source=${sourceValue}`,
      source: sourceValue,
      from: form.from.value,
    };
    console.log(formInputs);
    createVisitorTrack(formInputs).then((data) => {
      console.log(data);
    });
    handleClose();
  };

  return (
    <>
      <Button variant="primary CTL_btn p-1 pe-2 ps-2 m-0" onClick={handleShow}>
        Create Post Tracking Link
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Post Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Source, eg. article 1/ welcome to CTL"
                name="source"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFrom">
              <Form.Label>From</Form.Label>
              <Form.Select name="from">
                {fromList.map((platform, index) => (
                  <option key={index} value={platform}>
                    {platform}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary CTL_btn" type="submit" className="m-2">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MarketingPostsCreateComponent;
