import { Row, Col, Container, Form, Button } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const QuoteSubmitComponent = ({
  createQuote,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  fromProductList,
  // userInfo,
}) => {
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState(false);
  const [quoteData, setQuoteData] = useState();
  const [isCreating, setIsCreating] = useState("");
  const [btnMessage, setBtnMessage] = useState("Submit Quote");
  const [createQuoteResponseState, setCreateQuoteResponseState] = useState({
    message: "",
    error: "",
  });

  const navigate = useNavigate();

  const formRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const formInputs = {
      name: form.name.value,
      userDescription: form.description.value,
      quoteType: form.quoteType.value,
      quantity: form.quantity.value,
      existingProduct: false,
      status: "Received",
    };

    if (event.currentTarget.checkValidity() === true) {
      if (images.length > 9) {
        setIsCreating("too many files");
        return;
      }
      console.log(images);
      setBtnMessage("Submitting...");
      createQuote(formInputs)
        .then((data) => {
          if (images) {
            if (process.env.NODE_ENV === "dev") {
              uploadImagesApiRequest(images, data.quoteId)
                .then((res) => {})
                .catch((er) =>
                  setIsCreating(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            } else {
              setQuoteData(data.quoteId);
              uploadImagesCloudinaryApiRequest(images, data.quoteId)
                .then(() => {
                  setCreateQuoteResponseState({
                    message: "Quote submitted successfully.",
                    error: "",
                  });
                  setBtnMessage("Submit Quote");
                  if (formRef.current) {
                    formRef.current.reset();
                  }
                  setImages(null);
                  setIsCreating("");
                  setValidated(false);
                })
                .catch((uploadError) => {
                  setCreateQuoteResponseState({
                    error:
                      uploadError.message ||
                      "An error occurred during image upload.",
                  });
                });
            }
          } else {
            setCreateQuoteResponseState({
              message: "Quote submitted successfully.",
              error: "",
            });
            setBtnMessage("Submit Quote");
            if (formRef.current) {
              formRef.current.reset();
            }
            setImages(null);
            setIsCreating("");
            setValidated(false);
          }
        })
        .catch((er) => {
          console.error("Error creating quote:", er);
          setCreateQuoteResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  const uploadHandlerImage = (e) => {
    const newImages = e.target.files;
    if (newImages.length === 0) {
      return;
    }
    setImages(newImages);
  };

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const displayImages = () => {
    return (
      images &&
      Array.from(images).map((image, index) => (
        <img
          src={URL.createObjectURL(image)}
          key={index}
          alt="Selected"
          style={{ margin: "2px", width: "19%", height: "auto" }}
        />
      ))
    );
  };

  return (
    <Container>
      <h1 className="mt-3" hidden={fromProductList !== true}>
        REQUEST FOR QUOTE
      </h1>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        onKeyDown={(e) => checkKeyDown(e)}
        ref={formRef}
      >
        <Row>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" required type="text" />
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              required
              as="textarea"
              style={{ lineHeight: "1" }}
            />
          </Form.Group>

          <Form.Group controlId="formFileMultiple" className="mb-2">
            <Form.Label>Images</Form.Label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              {displayImages()}
            </div>

            <Form.Control
              name="images"
              type="file"
              multiple
              onChange={(e) => {
                uploadHandlerImage(e);
                displayImages();
              }}
            />
            {isCreating}
          </Form.Group>
        </Row>

        <Row className="mt-2">
          <Col md={6}>
            <Form.Group controlId="formBasicQuoteType">
              <Form.Label>Quote Type</Form.Label>
              <Form.Control
                name="quoteType"
                required
                as="select"
                defaultValue=""
              >
                <option value="" disabled>
                  {" "}
                  - Please Select Your Quote Type -{" "}
                </option>
                <option value="Exact_Product_Required">
                  Exact Product Required
                </option>
                <option value="Alternative_Accepted">
                  Alternative's Accepted
                </option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formBasicQuantity">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control name="quantity" required type="number" />
            </Form.Group>
          </Col>
        </Row>

        <Button
          className="btn CTL_btn mt-3 mb-1"
          type="submit"
          disabled={btnMessage === "Submitting..."}
        >
          {btnMessage}
        </Button>
      </Form>

      <span className="text-success">{createQuoteResponseState.message}</span>
    </Container>
  );
};

export default QuoteSubmitComponent;
