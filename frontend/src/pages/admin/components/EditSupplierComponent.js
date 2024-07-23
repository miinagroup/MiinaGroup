import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import GoBackButton from "./GoBackButton";

const EditSupplierComponent = ({ getSupplier, updateSupplierApi }) => {
  const [validated, setValidated] = useState(false);
  const [createSupplierResponseState, setCreateSupplierResponseState] =
    useState({
      message: "",
      error: "",
    });
  const [supplier, setDeliveryBook] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getSupplier(id)
      .then((data) => {
        setDeliveryBook(data.data.supplier);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const formInputs = {
      supplierName: form.supplierName.value.toUpperCase(),
      supplierSalesEmail: form.supplierSalesEmail.value,
      supplierSalesPhone: form.supplierSalesPhone.value,
      supplierAddress: form.supplierAddress.value,
      supplierCity: form.supplierCity.value,
      supplierState: form.supplierState.value,
      supplierPostcode: form.supplierPostcode.value,
      supplierCountry: form.supplierCountry.value,
      supplierBillingEmail: form.supplierBillingEmail.value,
      supplierBillingPhone: form.supplierBillingPhone.value,
      ctlCreditAccount: form.ctlCreditAccount.value,
      supplierABN: form.supplierABN.value,
    };

    if (event.currentTarget.checkValidity() === true) {
      updateSupplierApi(id, formInputs)
        .then((data) => {
          if (data.message === "Supplier Updated") navigate(-1);
        })
        .catch((er) => {
          setCreateSupplierResponseState({
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
  return (
    <Container>
      <Row className="justify-content-md-center mt-5 content-container">
        <Col md={1}>
          <GoBackButton />
        </Col>
        <Col md={8}>
          <h1>Edit Supplier</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSupplierName">
                <Form.Label>Supplier Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="supplierName"
                  required
                  defaultValue={supplier.supplierName}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSupplierSalesEmail">
                <Form.Label>Supplier Sales Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Sales Email"
                  name="supplierSalesEmail"
                  required
                  defaultValue={supplier.supplierSalesEmail}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSupplierSalesPhone">
                <Form.Label>Supplier Sales Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Sales Phone"
                  name="supplierSalesPhone"
                  required
                  defaultValue={supplier.supplierSalesPhone}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSupplierAddress">
                <Form.Label>Supplier Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="supplierAddress"
                  required
                  defaultValue={supplier.supplierAddress}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSupplierCity">
                <Form.Label>Supplier City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="supplierCity"
                  required
                  defaultValue={supplier.supplierCity}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSupplierState">
                <Form.Label>Supplier State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="supplierState"
                  required
                  defaultValue={supplier.supplierState}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSupplierPostcode">
                <Form.Label>Supplier Postcode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Postcode"
                  name="supplierPostcode"
                  required
                  defaultValue={supplier.supplierPostcode}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSupplierCountry">
                <Form.Label>Supplier Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Country"
                  name="supplierCountry"
                  required
                  defaultValue={supplier.supplierCountry}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSupplierBillingEmail">
                <Form.Label>Supplier Billing Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Billing Email"
                  name="supplierBillingEmail"
                  required
                  defaultValue={supplier.supplierBillingEmail}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSupplierBillingPhone">
                <Form.Label>Supplier Billing Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Billing Phone"
                  name="supplierBillingPhone"
                  defaultValue={supplier.supplierBillingPhone}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCtlCreditAccount">
                <Form.Label>CTL Credit Account</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CTL Credit Account"
                  name="ctlCreditAccount"
                  defaultValue={supplier.ctlCreditAccount}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSupplierABN">
                <Form.Label>Supplier ABN</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ABN"
                  name="supplierABN"
                  defaultValue={supplier.supplierABN}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Update
            </Button>

            <Link to="/admin/deliveryBooks" className="btn btn-secondary ms-5">
              Cancel
            </Link>
            <p></p>
            {createSupplierResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditSupplierComponent;
