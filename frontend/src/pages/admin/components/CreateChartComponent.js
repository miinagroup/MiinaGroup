import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const CreateChartComponent = ({ createChartApiRequest, fetchCharts }) => {
  const [validated, setValidated] = useState(false);
  const [adminUse, setAdminUse] = useState(false)
  const [charts, setCharts] = useState()
  const [updateChartResponseState, setCreateChartResponseState] = useState({
    message: "",
    error: "",
  });

  // var baseUrl = ""
  // var chartId = ""

  const navigate = useNavigate();

  useEffect(() => {
    fetchCharts()
      .then((data) => {
        setCharts(data);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        ));
  }, [2]);


  const checkAlreadyExists = (name, baseUrl, chartId) => {
    return charts?.some((chart) => chart.name === name && chart.baseUrl === baseUrl && chart.chartId === chartId);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const name = form.elements.name.value;
    const baseUrl = form.elements.baseUrl.value;
    const chartId = form.elements.chartId.value;
    const adminUse = form.elements.adminUse.checked;

    const alreadyExists = checkAlreadyExists(name, baseUrl, chartId);
    if (alreadyExists) {
      window.alert("Chart already exists");
      return;
    }
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    createChartApiRequest(name, baseUrl, chartId, adminUse)
      .then((data) => {
        if (data.message === "chart created") {
          navigate("/admin/analytics");
        }
      })
      .catch((er) => {
        setCreateChartResponseState({
          error: er.response.data.message ? er.response.data.message : er.response.data,
        });
      });
  };



  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };


  return (
    <Container>
      <Row className="justify-content-md-center mt-5 content-container">
        <Col md={1}>

        </Col>
        <Col md={6}>
          <h1>Create New Chart</h1>
          <br />
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          //onKeyDown={(e) => checkKeyDown(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBaseUrl">
              <Form.Label>BaseUrl</Form.Label>
              <Form.Control name="baseUrl" required type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicChartId">
              <Form.Label>ChartId</Form.Label>
              <Form.Control name="chartId" required type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAdminUse">
              <Form.Check
                name="adminUse"
                type="checkbox"
                label="Admin Chart"
                checked={adminUse}
                onChange={(e) => setAdminUse(e.target.checked)}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit" className="w-25">
                Create Chart
              </Button>
              <Link to="/admin/analytics" className="btn btn-info my-3 ms-2 w-25">
                Cancel
              </Link>
              <p>{updateChartResponseState.error}</p>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateChartComponent;
