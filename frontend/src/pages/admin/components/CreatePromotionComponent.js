import { Row, Col, Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton";

const CreatePromotionComponent = ({ createPromotionApiRequest }) => {
  const [validated, setValidated] = useState(false);
  const [createPromotionResponseState, setCreatePromotionResponseState] =
    useState({
      message: "",
      error: "",
    });
  const [files, setFiles] = useState({});

  const [rowCount, setRowCount] = useState(1);
  const handleNewPromotion = () => {
    setRowCount(rowCount + 1);
  };
  const handleRemovePromotion = () => {
    setRowCount(rowCount - 1);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const detail = [];
    for (
      let i = 0;
      i < document.querySelectorAll(".text-primary").length;
      i++
    ) {
      const image = document.getElementsByName(`image-${i}`)[0].value;
      const redirectURL = document.getElementsByName(`redirectURL-${i}`)[0]
        .value;
      const description = document.getElementsByName(`description-${i}`)[0]
        .value;
      detail.push({
        image,
        redirectURL,
        description,
      });
    }

    const formInputs = {
      category: form.category.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      detail: detail,
    };

    if (event.currentTarget.checkValidity() === true) {
      createPromotionApiRequest(formInputs)
        .then((data) => {
          if (data.message === "Promotion Created")
            navigate("/admin/promotions");
        })
        .catch((er) => {
          setCreatePromotionResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }
    setValidated(true);
  };
  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };
  const handleFileChange = (e, index, type) => {
    setFiles((prevState) => ({
      ...prevState,
      [`${type}-${index}`]: e.target.files[0],
    }));
  };

  console.log("====================================");
  console.log(files);
  console.log("====================================");
  return (
    <Container>
      <Row className="justify-content-md-center mt-5 content-container">
        <Row>
          <Col md={1}>
            {/* <Link to="/admin/promotions" className="btn btn-info my-3">
              Go Back
            </Link> */}
            <GoBackButton />
          </Col>
          <Col md={8}>
            <h1>Create New Promotion</h1>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              onKeyDown={(e) => checkKeyDown(e)}
            >
              {[...Array(rowCount)].map((_, index) => (
                <>
                  <span className="text-primary">Blocks Set: {index + 1}</span>
                  <Form.Group as={Col} md="1" className="mb-3">
                    <i
                      className="bi bi-trash mt-3"
                      onClick={handleRemovePromotion}
                      style={{
                        cursor: "pointer",
                      }}
                    ></i>
                  </Form.Group>
                  <Row className="Upper">
                    <React.Fragment key={"Upper" + index}>
                      <Row>
                        <Col>
                          <Card className="m-0">
                            <Form.Group controlId={`formBasicVideo-1-${index}`}>
                              <Form.Label>Video 1</Form.Label>
                              <Form.Control
                                required
                                type="file"
                                multiple
                                onChange={(e) =>
                                  handleFileChange(e, index, "Video1")
                                }
                              />
                              {files[`Video1-${index}`] && (
                                <video
                                  src={URL.createObjectURL(
                                    files[`Video1-${index}`]
                                  )}
                                  controls
                                  width="100%"
                                  height="100%"
                                ></video>
                              )}
                            </Form.Group>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="m-0">
                            <Form.Group controlId={`formBasicUpper-1-${index}`}>
                              <Form.Label>Upper 1</Form.Label>
                              <Form.Control
                                required
                                type="file"
                                multiple
                                onChange={(e) =>
                                  handleFileChange(e, index, "Upper1")
                                }
                              />
                              {files[`Upper1-${index}`] && (
                                <img
                                  src={URL.createObjectURL(
                                    files[`Upper1-${index}`]
                                  )}
                                  alt="Uploaded content"
                                  width="100%"
                                  height="100%"
                                />
                              )}
                            </Form.Group>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="m-0">
                            <Form.Group controlId={`formBasicUpper-2-${index}`}>
                              <Form.Label>Upper 2</Form.Label>
                              <Form.Control
                                required
                                type="file"
                                multiple
                                onChange={(e) =>
                                  handleFileChange(e, index, "Upper2")
                                }
                              />
                              {files[`Upper2-${index}`] && (
                                <img
                                  src={URL.createObjectURL(
                                    files[`Upper2-${index}`]
                                  )}
                                  alt="Uploaded content"
                                  width="100%"
                                  height="100%"
                                />
                              )}
                            </Form.Group>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="m-0">
                            <Form.Group controlId={`formBasicVideo-2-${index}`}>
                              <Form.Label>Video 2</Form.Label>
                              <Form.Control
                                required
                                type="file"
                                multiple
                                onChange={(e) =>
                                  handleFileChange(e, index, "Video2")
                                }
                              />
                              {files[`Video2-${index}`] && (
                                <video
                                  src={URL.createObjectURL(
                                    files[`Video2-${index}`]
                                  )}
                                  controls
                                  width="100%"
                                  height="100%"
                                ></video>
                              )}
                            </Form.Group>
                          </Card>
                        </Col>
                      </Row>
                    </React.Fragment>
                  </Row>
                  <Row className="Bottom mt-3">
                    <React.Fragment key={"Bottom" + index}>
                      <Row>
                        <Col>
                          <Card className="m-0">
                            <Form.Group controlId={`formBottom-1-${index}`}>
                              <Form.Label>Bottom 1</Form.Label>
                              <Form.Control
                                required
                                type="file"
                                multiple
                                onChange={(e) =>
                                  handleFileChange(e, index, "Bottom1")
                                }
                              />
                              {files[`Bottom1-${index}`] && (
                                <img
                                  src={URL.createObjectURL(
                                    files[`Bottom1-${index}`]
                                  )}
                                  alt="Uploaded content"
                                  width="100%"
                                  height="100%"
                                />
                              )}
                            </Form.Group>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="m-0">
                            <Form.Group controlId={`formBottom-2-${index}`}>
                              <Form.Label>Bottom 2</Form.Label>
                              <Form.Control
                                required
                                type="file"
                                multiple
                                onChange={(e) =>
                                  handleFileChange(e, index, "Bottom2")
                                }
                              />
                              {files[`Bottom2-${index}`] && (
                                <img
                                  src={URL.createObjectURL(
                                    files[`Bottom2-${index}`]
                                  )}
                                  alt="Uploaded content"
                                  width="100%"
                                  height="100%"
                                />
                              )}
                            </Form.Group>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="m-0">
                            <Form.Group controlId={`formBottom-3-${index}`}>
                              <Form.Label>Bottom 3</Form.Label>
                              <Form.Control
                                required
                                type="file"
                                multiple
                                onChange={(e) =>
                                  handleFileChange(e, index, "Bottom3")
                                }
                              />
                              {files[`Bottom3-${index}`] && (
                                <img
                                  src={URL.createObjectURL(
                                    files[`Bottom3-${index}`]
                                  )}
                                  alt="Uploaded content"
                                  width="100%"
                                  height="100%"
                                />
                              )}
                            </Form.Group>
                          </Card>
                        </Col>
                        <Col>
                          <Card className="m-0">
                            <Form.Group controlId={`formBottom-4-${index}`}>
                              <Form.Label>Bottom 4</Form.Label>
                              <Form.Control
                                required
                                type="file"
                                multiple
                                onChange={(e) =>
                                  handleFileChange(e, index, "Bottom4")
                                }
                              />
                              {files[`Bottom4-${index}`] && (
                                <img
                                  src={URL.createObjectURL(
                                    files[`Bottom4-${index}`]
                                  )}
                                  alt="Uploaded content"
                                  width="100%"
                                  height="100%"
                                />
                              )}
                            </Form.Group>
                          </Card>
                        </Col>
                      </Row>
                    </React.Fragment>
                  </Row>
                </>
              ))}
              <hr />
              <p
                onClick={handleNewPromotion}
                style={{
                  cursor: "hand",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Add New Blocks
              </p>
              <hr />

              <Button variant="primary" type="submit">
                Create
              </Button>

              <Link to="/admin/promotions" className="btn btn-secondary ms-5">
                Cancel
              </Link>
              <p></p>
              {createPromotionResponseState.error ?? ""}
            </Form>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default CreatePromotionComponent;
