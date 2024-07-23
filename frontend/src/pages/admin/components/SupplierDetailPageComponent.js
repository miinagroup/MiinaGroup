import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

const SupplierDetailPageComponent = ({ id }) => {
  const [supplier, setSupplier] = useState({});

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const { data } = await axios.get(`/api/suppliers/get-one/${id}`);
        setSupplier(data.data.supplier);
      } catch (e) {
        console.error(e);
      }
    };
    getSupplier();
  }, [id]);

  return (
    <div className="m-3 ">
      <Row className="mb-3 justify-content-center">
        <Col md="auto">
          <h3>{supplier.supplierName || "N/A"}</h3>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <strong>Sales Email:</strong>
        </Col>
        <Col>{supplier.supplierSalesEmail || "N/A"}</Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <strong>Sales Phone:</strong>
        </Col>
        <Col>{supplier.supplierSalesPhone || "N/A"}</Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <strong>Address:</strong>
        </Col>
        <Col>
          {supplier.supplierAddress}, {supplier.supplierCity},{" "}
          {supplier.supplierState},{supplier.supplierPostcode},{" "}
          {supplier.supplierCountry || "N/A"}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <strong>Billing Email:</strong>
        </Col>
        <Col>{supplier.supplierBillingEmail || "N/A"}</Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <strong>Billing Phone:</strong>
        </Col>
        <Col>{supplier.supplierBillingPhone || "N/A"}</Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <strong>CTL Credit Acc:</strong>
        </Col>
        <Col>{supplier.ctlCreditAccount || "N/A"}</Col>
      </Row>
      <Row className="">
        <Col xs={4}>
          <strong>ABN:</strong>
        </Col>
        <Col>{supplier.supplierABN || "N/A"}</Col>
      </Row>
    </div>
  );
};

export default SupplierDetailPageComponent;
