import {
  Row,
  Col,
  Form,
  Button,
  Card,
  FormControl,
  Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import GoBackButton from "./GoBackButton";

const EditPromotionComponent = ({
  updatePromotionApiRequest,
  fetchPromotions,
}) => {
  const [validated, setValidated] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const [updatePromotionResponseState, setUpdatePromotionResponseState] =
    useState({
      message: "",
      error: "",
    });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPromotions(id)
      .then((data) => {
        setPromotion(data);
        setUpdatedDetails(sortDetails(data.detail));
      })
      .catch((er) =>
        console.log(er.response?.data?.message || er.response?.data || er)
      );
  }, [id]);

  const handleImageUrlChange = (idx, value) => {
    const newDetails = [...updatedDetails];
    newDetails[idx].image = value;
    setUpdatedDetails(newDetails);
  };

  const correctOrder = [
    "video-1",
    "upper-1",
    "upper-2",
    "video-2",
    "bottom-1",
    "bottom-2",
    "bottom-3",
    "bottom-4",
  ];

  const sortDetails = (details) => {
    return details.sort((a, b) => {
      const aIndex = correctOrder.indexOf(a.description);
      const bIndex = correctOrder.indexOf(b.description);
      if (aIndex > bIndex) return 1;
      if (aIndex < bIndex) return -1;
      return 0;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    const detail = sortDetails(promotion?.detail || []).map((item, idx) => {
      return {
        description: item.description,
        image: form[`image-${idx}`]?.value || item.image,
        redirectURL: form[`redirectURL-${idx}`]?.value || item.redirectURL,
      };
    });

    const formInputs = {
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      rotateDays: form.rotateDays.value,
      detail: detail,
    };
    console.log(formInputs);

    if (event.currentTarget.checkValidity() === true) {
      updatePromotionApiRequest(id, formInputs)
        .then((data) => {
          if (data.message === "Promotion Updated") {
            navigate("/admin/promotions");
          }
        })
        .catch((er) => {
          setUpdatePromotionResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 content-container">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {" "}
          {/* <Link
            to="/admin/promotions"
            className="btn btn-info"
            style={{ padding: "0.375rem 0.75rem" }}
          >
            {" "}
            Go Back
          </Link> */}
          <GoBackButton />
          <h1>Edit Promotion:</h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Start Date</Form.Label>
          <FormControl
            type="text"
            name="startDate"
            defaultValue={promotion.startDate}
            required
          />

          <Form.Label>End Date</Form.Label>
          <FormControl
            type="text"
            name="endDate"
            defaultValue={promotion.endDate}
            required
          />

          <Form.Label>Rotate Days</Form.Label>
          <FormControl
            type="number"
            name="rotateDays"
            defaultValue={promotion.rotateDays}
            required
          />

          <Row className="mt-3">
            {sortDetails(promotion?.detail || []).map((item, idx) => (
              <>
                <Col md={8} key={`desc-${idx}`}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Description: {item.description.toUpperCase()}
                    </Form.Label>
                    <FormControl
                      type="text"
                      name={`image-${idx}`}
                      defaultValue={item.image}
                      onChange={(e) =>
                        handleImageUrlChange(idx, e.target.value)
                      }
                      required
                    />
                    {promotion.category === "banners" ? (
                      ""
                    ) : (
                      <>
                        {"Redirct Link:"}
                        <FormControl
                          as="textarea"
                          type="text"
                          name={`redirectURL-${idx}`}
                          defaultValue={item.redirectURL}
                        />
                      </>
                    )}
                  </Form.Group>
                </Col>
                <Col md={3} key={`img-${idx}`} className="mt-1">
                  <a href={updatedDetails[idx].redirectURL}>
                    {updatedDetails[idx].image.endsWith(".mp4") ? (
                      <video
                        className="w-100 promotional_video"
                        controls
                        autoPlay
                        muted
                      >
                        <source
                          src={updatedDetails[idx].image}
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <Card.Img variant="top" src={updatedDetails[idx].image} />
                    )}
                  </a>
                </Col>
              </>
            ))}
          </Row>
          <Button type="submit" variant="primary">
            Update
          </Button>
          <LinkContainer to="/admin/promotions">
            <Button variant="secondary" className="ml-2">
              Back
            </Button>
          </LinkContainer>
        </Form>
      </Row>
    </Container>
  );
};

export default EditPromotionComponent;
