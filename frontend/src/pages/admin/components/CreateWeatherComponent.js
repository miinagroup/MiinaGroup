import {
    Row,
    Col,
    Container,
    Form,
    Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton";

const CreateWeatherComponent = ({
    createWeatherApiRequest,
    fetchDeliveryBooks
}) => {
    const [validated, setValidated] = useState(false);
    const [createWeatherResponseState, setCreateWeatherResponseState] = useState({
        message: "",
        error: "",
    });

    const [deliveryBooks, setDeliveryBooks] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [sites, setSites] = useState([]);

    useEffect(() => {
        const abctrl = new AbortController();
        fetchDeliveryBooks(abctrl)
            .then((res) => setDeliveryBooks(res))
            .catch((er) =>
                console.log(
                    er.response.data.message ? er.response.data.message : er.response.data
                )
            );
        return () => abctrl.abort();
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;

        const formInputs = {
            company: form.company.value,
            location: form.location.value,
            latLon: form.latLon.value,
        };

        if (event.currentTarget.checkValidity() === true) {
            createWeatherApiRequest(formInputs)
                .then((data) => {
                    if (data.message === "weather created") navigate("/admin/weathers");
                })
                .catch((er) => {
                    setCreateWeatherResponseState({
                        error: er.response.data.message
                            ? er.response.data.message
                            : er.response.data,
                    });
                });

        }
        setValidated(true);
    };


    const handleCompanyChange = (e) => {
        setSelectedCompany(e.target.value);
        setSites(deliveryBooks.find(book => book.companyName === e.target.value).sites);
    }



    return (
        <Container>
            <Row className="justify-content-md-center mt-5 content-container">

                <Row>
                    <Col md={1}>
                        {/* <Link to="/admin/weathers" className="btn btn-info my-3">Go Back</Link> */}
                        <GoBackButton />
                    </Col>
                    <Col md={8}>
                        <h1>Create New Weather</h1>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <Form.Group className="mb-3" controlId="formBasiccompany">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control name="company" as="select" required onChange={handleCompanyChange}>
                                    <option disabled selected value> -- select an option -- </option>
                                    {deliveryBooks.map((book, index) => (
                                        <option key={index} value={book.companyName}>
                                            {book.companyName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasiclocation">
                                <Form.Label>Site Location</Form.Label>
                                <Form.Control name="location" as="select" required>
                                    <option disabled selected value> -- select an option -- </option>
                                    {sites.map((site, index) => (
                                        <option key={index} value={site.name}>
                                            {site.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasiclatLon">
                                <Form.Label>Latitude / Longitude</Form.Label>
                                <Form.Control name="latLon" required type="text" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Create
                            </Button>

                            <Link to="/admin/weathers" className="btn btn-secondary ms-5">
                                Cancel
                            </Link>
                            <p></p>
                            {createWeatherResponseState.error ?? ""}

                        </Form>
                    </Col>
                </Row>

            </Row>
        </Container>
    );
};

export default CreateWeatherComponent;
