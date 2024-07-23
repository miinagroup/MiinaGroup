import { Row, Col, Container, Form, Button } from "react-bootstrap";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton";

const EditDeliveryBookComponent = ({
    updateDeliveryBookApiRequest,
    fetchDeliveryBook,
}) => {
    const [validated, setValidated] = useState(false);
    const [deliveryBook, setDeliveryBook] = useState([]);
    const [updateDeliveryBookResponseState, setUpdateDeliveryBookResponseState] =
        useState({
            message: "",
            error: "",
        });

    const { id } = useParams();
    const navigate = useNavigate();

    const [rowCount, setRowCount] = useState(0);
    const handleNewDeliveryBook = () => {
        setRowCount(rowCount + 1);
    };
    const handleRemoveDeliveryBook = () => {
        setRowCount(rowCount - 1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        const sites = [];

        // console.log("sites existing", document.querySelectorAll(".sitesExisting").length)

        for (
            let i = 0;
            i < document.querySelectorAll(".sitesExisting").length;
            i++
        ) {
            const name = document.getElementsByName(`name-${i}`)[0].value;
            const billingAddress = document.getElementsByName(
                `billingAddress-${i}`
            )[0].value;
            const deliveryAddress = document.getElementsByName(
                `deliveryAddress-${i}`
            )[0].value;
            const siteSku = document.getElementsByName(`siteSku-${i}`)[0].value;
            const storeEmail = document.getElementsByName(`storeEmail-${i}`)[0].value;

            sites.push({
                name,
                billingAddress,
                deliveryAddress,
                siteSku,
                storeEmail,
            });
        }

        const sitesNew = [];
        // console.log("sites new", document.querySelectorAll(".sitesNew").length)
        for (let i = 0; i < document.querySelectorAll(".sitesNew").length; i++) {
            const name = document.getElementsByName(`newName-${i}`)[0].value;
            const billingAddress = document.getElementsByName(
                `newBillingAddress-${i}`
            )[0].value;
            const deliveryAddress = document.getElementsByName(
                `newDeliveryAddress-${i}`
            )[0].value;
            const siteSku = document.getElementsByName(`newSiteSku-${i}`)[0].value;
            const storeEmail = document.getElementsByName(`newStoreEmail-${i}`)[0]
                .value;

            sitesNew.push({
                name,
                billingAddress,
                deliveryAddress,
                siteSku,
                storeEmail,
            });
        }

        const formInputs = {
            companyName: form.companyName.value,
            emailHost: form.emailHost.value,
            billingEmail: form.billingEmail.value,
            companyAccount: form.companyAccount.value,
            quickBooksCustomerId: form.quickBooksCustomerId.value,
            dueDays: form.dueDays.value,
            sites: [...sites, ...sitesNew],
        };

        if (event.currentTarget.checkValidity() === true) {
            updateDeliveryBookApiRequest(id, formInputs)
                .then((data) => {
                    if (data.message === "Delivery Book Updated") {
                        navigate("/admin/deliveryBooks");
                    }
                })
                .catch((er) => {
                    setUpdateDeliveryBookResponseState({
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

    useEffect(() => {
        fetchDeliveryBook(id)
            .then((data) => {
                setDeliveryBook(data);
                // console.log("Delivery Book data", data);
            })
            .catch((er) =>
                console.log(
                    er.response.data.message ? er.response.data.message : er.response.data
                )
            );
    }, [id]);

    const handleRemoveSites = (index) => {
        const newSites = [...deliveryBook.sites];
        newSites.splice(index, 1);
        setDeliveryBook({ ...deliveryBook, sites: newSites });
    };

    const handleRemoveNewSite = () => {
        setRowCount(rowCount - 1);
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5 content-container">
                <Col md={1}>
                    {/* <Link to="/admin/deliveryBooks" className="btn btn-info my-3">
                        Go Back
                    </Link> */}
                    <GoBackButton />
                </Col>
                <Col md={8}>
                    <h1>Edit Delivery Book</h1>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => checkKeyDown(e)}
                    >
                        <Form.Group className="mb-3" controlId="formBasicCompanyName">
                            <Form.Label>Company Name </Form.Label>
                            <Form.Control
                                name="companyName"
                                required
                                type="text"
                                defaultValue={deliveryBook.companyName}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmailHost">
                            <Form.Label>Email Host </Form.Label>
                            <Form.Control
                                name="emailHost"
                                required
                                type="text"
                                defaultValue={deliveryBook.emailHost}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBillingEmailt">
                            <Form.Label>Billing Email </Form.Label>
                            <Form.Control
                                name="billingEmail"
                                required
                                type="text"
                                defaultValue={deliveryBook.billingEmail}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCompanyAccount">
                            <Form.Label>Company Account </Form.Label>
                            <Form.Control
                                name="companyAccount"
                                required
                                type="text"
                                defaultValue={deliveryBook.companyAccount}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicQuickBooksCustomerId"
                        >
                            <Form.Label>QuickBooks Customer Id</Form.Label>
                            <Form.Control
                                name="quickBooksCustomerId"
                                required
                                type="text"
                                defaultValue={deliveryBook.quickBooksCustomerId}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDueDays">
                            <Form.Label>dueDays</Form.Label>
                            <Form.Control
                                name="dueDays"
                                required
                                type="number"
                                defaultValue={deliveryBook.dueDays}
                            />
                        </Form.Group>

                        <hr
                            style={{
                                color: "#000000",
                                backgroundColor: "#000000",
                                height: 0.5,
                                borderColor: "#000000",
                            }}
                        />

                        {deliveryBook &&
                            deliveryBook.sites &&
                            deliveryBook.sites.map((book, index) => (
                                <div key={book._id}>
                                    <>
                                        <span className="sitesExisting text-primary">
                                            Site : {index + 1}
                                        </span>
                                        <Row>
                                            <React.Fragment>
                                                <Form.Group
                                                    as={Col}
                                                    md="3"
                                                    className="mb-3"
                                                    controlId={`formBasicName-${index}`}
                                                >
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        name={`name-${index}`}
                                                        required
                                                        defaultValue={book.name}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    as={Col}
                                                    md="4"
                                                    className="mb-3"
                                                    controlId={`formBasicBillingAddress-${index}`}
                                                >
                                                    <Form.Label>Billing Address</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        name={`billingAddress-${index}`}
                                                        required
                                                        defaultValue={book.billingAddress}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    as={Col}
                                                    md="4"
                                                    className="mb-3"
                                                    controlId={`formBasicDeliveryAddress-${index}`}
                                                >
                                                    <Form.Label>Delivery Address</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        name={`deliveryAddress-${index}`}
                                                        required
                                                        defaultValue={book.deliveryAddress}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    as={Col}
                                                    md="4"
                                                    className="mb-3"
                                                    controlId={`formBasicSiteSku-${index}`}
                                                >
                                                    <Form.Label>Site Sku</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name={`siteSku-${index}`}
                                                        required
                                                        defaultValue={book.siteSku}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    as={Col}
                                                    md="4"
                                                    className="mb-3"
                                                    controlId={`formBasicStoreEmail-${index}`}
                                                >
                                                    <Form.Label>Store Email</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name={`storeEmail-${index}`}
                                                        // required
                                                        defaultValue={book.storeEmail}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} md="1" className="mb-3">
                                                    <i
                                                        className="bi bi-trash mt-3"
                                                        onClick={() => handleRemoveSites(index)}
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    ></i>
                                                </Form.Group>
                                            </React.Fragment>
                                        </Row>

                                        {/* <Row>
                                            <React.Fragment>
                                                <Form.Group
                                                    as={Col}
                                                    md="3"
                                                    className="mb-3"
                                                    controlId={`formBasicName-${index}`}
                                                >
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        name={`name-${index}`}
                                                        required
                                                        type="text"
                                                        defaultValue={book.name}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    as={Col}
                                                    md="4"
                                                    className="mb-3"
                                                    controlId={`formBasicBillingAddress-${index}`}
                                                >
                                                    <Form.Label>Billing Address</Form.Label>
                                                    <Form.Control
                                                        name={`billingAddress-${index}`}
                                                        required
                                                        type="text"
                                                        defaultValue={book.billingAddress}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    as={Col}
                                                    md="4"
                                                    className="mb-3"
                                                    controlId={`formBasicDeliveryAddress-${index}`}
                                                >
                                                    <Form.Label>Delivery Address</Form.Label>
                                                    <Form.Control
                                                        name={`deliveryAddress-${index}`}
                                                        required
                                                        type="text"
                                                        defaultValue={book.deliveryAddress}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} md="1" className="mb-3">
                                                    <i
                                                        className="bi bi-trash mt-3"
                                                        // onClick={() => setSelectedStock(item)}
                                                        onClick={() => handleRemoveSites(index)}
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    ></i>
                                                </Form.Group>
                                            </React.Fragment>
                                        </Row> */}
                                    </>
                                </div>
                            ))}

                        {/*Add New Site */}
                        {[...Array(rowCount)].map((_, index) => (
                            <>
                                <span className="sitesNew text-primary">
                                    New Site: {index + 1}
                                </span>
                                <Row>
                                    <React.Fragment key={index}>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            className="mb-3"
                                            controlId={`formBasicNewName-${index}`}
                                        >
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name={`newName-${index}`}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="4"
                                            className="mb-3"
                                            controlId={`formBasicNewBillingAddress-${index}`}
                                        >
                                            <Form.Label>Billing Address </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name={`newBillingAddress-${index}`}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="4"
                                            className="mb-3"
                                            controlId={`formBasicNewDeliveryAddress-${index}`}
                                        >
                                            <Form.Label>Delivery Address </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name={`newDeliveryAddress-${index}`}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="4"
                                            className="mb-3"
                                            controlId={`formBasicNewSiteSku-${index}`}
                                        >
                                            <Form.Label>Site Sku</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name={`newSiteSku-${index}`}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="4"
                                            className="mb-3"
                                            controlId={`formBasicNewStoreEmail-${index}`}
                                        >
                                            <Form.Label>Store Email </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name={`newStoreEmail-${index}`}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" className="mb-3">
                                            <i
                                                className="bi bi-trash mt-3"
                                                onClick={handleRemoveNewSite}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            ></i>
                                        </Form.Group>
                                    </React.Fragment>
                                </Row>

                                {/* <Row>
                                    <React.Fragment key={index}>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            className="mb-3"
                                            controlId={`formBasicNewName-${index}`}
                                        >
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                name={`newName-${index}`}
                                                required
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="4"
                                            className="mb-3"
                                            controlId={`formBasicNewBillingAddress-${index}`}
                                        >
                                            <Form.Label>Billing Address </Form.Label>
                                            <Form.Control
                                                name={`newBillingAddress-${index}`}
                                                required
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="4"
                                            className="mb-3"
                                            controlId={`formBasicNewDeliveryAddress-${index}`}
                                        >
                                            <Form.Label>Delivery Address </Form.Label>
                                            <Form.Control
                                                name={`newDeliveryAddress-${index}`}
                                                required
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" className="mb-3">
                                            <i
                                                className="bi bi-trash mt-3"
                                                onClick={handleRemoveNewSite}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            ></i>
                                        </Form.Group>
                                    </React.Fragment>
                                </Row> */}
                            </>
                        ))}
                        <hr />
                        <p
                            onClick={handleNewDeliveryBook}
                            style={{
                                cursor: "pointer",
                                textAlign: "center",
                                fontStyle: "italic",
                            }}
                        >
                            Add New Site
                        </p>
                        <hr />

                        <Button className="mb-3" variant="primary" type="submit">
                            UPDATE
                        </Button>

                        <Link
                            to="/admin/deliveryBooks"
                            className="btn btn-secondary mb-3 ms-5"
                        >
                            Cancel
                        </Link>
                        <p></p>
                        {updateDeliveryBookResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditDeliveryBookComponent;
