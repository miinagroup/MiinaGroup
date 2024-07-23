import {
    Container, Row, Col, Form, Alert, ListGroup, Modal, Button, ListGroupItem,
} from "react-bootstrap";
import CartItemForOrderComponent from "../../../components/CartItemForOrderComponent";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useReactToPrint } from "react-to-print";
import DeliveryNotePrint from "../../../components/Pdfs/DeliveryNotePrint";
import PickingPackingPrint from "../../../components/Pdfs/PickingPackingPrint";
import InvoicePrint from "../../../components/Pdfs/InvoicePrint";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import SendInvoice from "../../../components/SendEmail/SendInvoice";
import { emptyCart } from "../../../redux/actions/cartActions";
import { useSelector } from "react-redux";

import axios from "axios";

const AdminUniformCartDetailsPageComponent = ({
    fetchUniformCart
}) => {
    return (
        <Container fluid style={{ width: "80%" }}>
            <Row className="mt-4">
                <h1>Uniform Purchase Details</h1>
                <Col md={9}>
                    <br />
                    <Row>
                        <Col md={6} className="mb-0">

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
};

export default AdminUniformCartDetailsPageComponent;
