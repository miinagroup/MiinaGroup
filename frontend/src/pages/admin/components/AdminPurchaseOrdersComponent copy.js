import {
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  ButtonGroup,
  ListGroupItem,
} from "react-bootstrap";
import { unmountComponentAtNode } from "react-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import PurchaseOrderPdf from "../../../components/Pdfs/PurchaseOrder";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

const AdminPurchaseOrdersComponentCopy = ({ getPruchasedItemSupplier, fetchPO }) => {
  const [eptBtnText, setEptBtnText] = useState("Export Supplier Excel");

  
  const exportSupplierExcel = () => {
    setEptBtnText("Exporting...");
    getPruchasedItemSupplier()
      .then((data) => {
        exportToExcel(data);
        setEptBtnText("Done!");
        setTimeout(() => setEptBtnText("Export Supplier Excel"), 1000);
      })
      .catch((error) => {
        console.error(error);
        setEptBtnText("Export Supplier Excel"); 
      });
  };
  
  const exportToExcel = (suppliers) => {
    const ws = XLSX.utils.json_to_sheet(suppliers);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    FileSaver.saveAs(data, "Purchased Supplier List" + ".xlsx");
  };
  


  const [buttonText, setButtonText] = useState("Generate   ");
  const [exGstTotal, setExGstTotal] = useState(0);
  const [gstamount, setGstAmount] = useState(0);
  const [incGstTotal, setIncGstTotal] = useState(0);
  const [purchaseOrderTotal, setPurchaseOrderTotal] = useState({
    exGstTotal,
    gstamount,
    incGstTotal,
  });
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [validated, setValidated] = useState(false);

  const [rowCount, setRowCount] = useState(1);
  const handleNewProduct = () => {
    setRowCount(rowCount + 1);
  };
  const handleRemoveProduct = () => {
    setRowCount(rowCount - 1);
  };

  function handleGeneratePO(event) {
    setButtonText("Generating...");
    setButtonText("Generated!");
    setTimeout(() => setButtonText("Generate  "), 1000);
  }

  const openPDFInPopup = async (documentComponent, fileName) => {
    const blob = await pdf(documentComponent).toBlob();
    const url = URL.createObjectURL(blob);

    const width = 1200;
    const height = 800;

    const left = window.innerWidth / 2 - width / 2 + window.screenX;
    const top = window.innerHeight / 2 - height / 2 + window.screenY;

    window.open(
      url,
      "_blank",
      `scrollbars=yes,toolbar=no,location=no,width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const PDFPopupButton = ({ documentComponent, fileName, loadingText }) => (
    <div className="ms-4" style={{ float: "left" }}>
      <Button
        className="ctl_blue_button"
        onClick={() => openPDFInPopup(documentComponent, fileName)}
      >
        {loadingText}
      </Button>
      <Link to="/admin/purchaseOrders" className="btn btn-secondary ms-4">
        Cancel
      </Link>
    </div>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const products = [];
    for (
      let i = 0;
      i < document.querySelectorAll(".text-primary").length;
      i++
    ) {
      const itemCode = document.getElementsByName(`itemCode-${i}`)[0]?.value;
      const supplierItemCode = document.getElementsByName(
        `supplierItemCode-${i}`
      )[0]?.value;
      const name = document.getElementsByName(`itemName-${i}`)[0]?.value;
      const UOM = document.getElementsByName(`itemUOM-${i}`)[0]?.value;

      const quantity = document.getElementsByName(`itemQuantity-${i}`)[0]
        ?.value;
      const unitCost = document.getElementsByName(`itemUnitCost-${i}`)[0]
        ?.value;
      const lineTotal = (
        document.getElementsByName(`itemUnitCost-${i}`)[0]?.value *
        document.getElementsByName(`itemQuantity-${i}`)[0]?.value
      ).toFixed(2);

      // console.log("line total AAAA", lineTotal);

      document.getElementById(`formBasicItemLineTotal-${i}`).value = lineTotal;

      // var lineTotalComponent = document.getElementById(`formBasicItemLineTotal-${i}`).value
      // console.log(lineTotalComponent);
      // lineTotalComponent.value = lineTotal;

      products.push({
        itemCode,
        supplierItemCode,
        name,
        quantity,
        UOM,
        unitCost,
        lineTotal,
      });
    }

    const formInputs = {
      supplierName: form.supplierName.value,
      deliverTo: form.deliverTo.value,
      orderNumber: form.orderNumber.value,
      wareHouse: form.wareHouse.value,
      accountCode: form.accountCode.value,
      currency: form.currency.value,
      orderTerm: form.orderTerm.value,
      requiredBy: form.requiredBy.value,
      specialNote: form.specialNotes.value,
      products: products,
    };

    setPurchaseOrderData(formInputs);
    setValidated(true);
  };

  useEffect(() => {
    let totalamount = 0;
    purchaseOrderData.products?.forEach((order) => {
      const lineTotal = parseFloat(order.lineTotal);
      if (!isNaN(lineTotal)) {
        totalamount += lineTotal;
      }
    });

    setExGstTotal(totalamount);
  }, [purchaseOrderData]);

  useEffect(() => {
    setGstAmount((exGstTotal * 1.1).toFixed(2) - exGstTotal);
    setIncGstTotal(exGstTotal * 1.1);
  }, [exGstTotal]);

  useEffect(() => {
    setPurchaseOrderTotal({ exGstTotal, gstamount, incGstTotal });
  }, [exGstTotal, gstamount, incGstTotal]);

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  console.log(purchaseOrderData);

  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <Button
            className="p-0 ps-1 pe-1 CTL_btn"
            disabled={eptBtnText !== "Export Supplier Excel"}
            onClick={exportSupplierExcel}
          >
            {eptBtnText}
          </Button>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicSupplierName">
                  <Form.Label>Supplier</Form.Label>
                  <Form.Control name="supplierName" required as="textarea" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3" controlId="formBasicDeliverTo">
                  <Form.Label>Deliver To</Form.Label>
                  <Form.Control name="deliverTo" required as="textarea" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <Form.Group className="mb-3" controlId="formBasicOrderNumber">
                  <Form.Label>Order No.</Form.Label>
                  <Form.Control name="orderNumber" required type="text" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3" controlId="formBasicAccountCode">
                  <Form.Label>Account Code</Form.Label>
                  <Form.Control name="accountCode" required type="text" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3" controlId="formBasicCurrency">
                  <Form.Label>Currency</Form.Label>
                  <Form.Control
                    name="currency"
                    required
                    type="text"
                    value="AUD"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <Form.Group className="mb-3" controlId="formBasicWarehouse">
                  <Form.Label>Warehouse</Form.Label>
                  <Form.Control name="wareHouse" required type="text" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3" controlId="formBasicRequiredBy">
                  <Form.Label>Required By</Form.Label>
                  <Form.Control name="requiredBy" required type="text" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group className="mb-3" controlId="formBasicOrderTerms">
                  <Form.Label>Order Terms</Form.Label>
                  <Form.Control name="orderTerm" required type="text" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicSpecialNotes">
                  <Form.Label>Special Notes </Form.Label>
                  <Form.Control name="specialNotes" required as="textarea" />
                </Form.Group>
              </Col>
            </Row>

            {[...Array(rowCount)].map((_, index) => (
              <>
                <div className="card card-body mt-1" style={{ width: "75%" }}>
                  <div style={{ display: "block", clear: "both" }}>
                    <span className="text-primary" style={{ float: "left" }}>
                      Product: {index + 1}
                    </span>
                    <span style={{ float: "right" }}>
                      <i
                        className="bi bi-trash mt-3"
                        onClick={handleRemoveProduct}
                        style={{
                          cursor: "pointer",
                        }}
                      ></i>
                    </span>
                  </div>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      className="mb-3"
                      controlId={`formBasicItemName-${index}`}
                    >
                      <Form.Label>Item Description</Form.Label>
                      <Form.Control
                        type="text"
                        name={`itemName-${index}`}
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <React.Fragment key={index}>
                      <Form.Group
                        as={Col}
                        md="4"
                        className="mb-3"
                        controlId={`formBasicItemCode-${index}`}
                      >
                        <Form.Label>Item Code</Form.Label>
                        <Form.Control
                          type="text"
                          name={`itemCode-${index}`}
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        className="mb-3"
                        controlId={`formBasicSupplierItemCode-${index}`}
                      >
                        <Form.Label>Supplier Item Code</Form.Label>
                        <Form.Control
                          type="text"
                          name={`supplierItemCode-${index}`}
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        className="mb-3"
                        controlId={`formBasicUOM-${index}`}
                      >
                        <Form.Label>UOM</Form.Label>
                        <Form.Control
                          type="text"
                          name={`itemUOM-${index}`}
                          required
                        />
                      </Form.Group>
                    </React.Fragment>
                  </Row>
                  <Row>
                    <React.Fragment>
                      <Form.Group
                        as={Col}
                        md="4"
                        className="mb-3"
                        controlId={`formBasicItemQuantity-${index}`}
                      >
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          step="any"
                          name={`itemQuantity-${index}`}
                          min={0}
                          required
                          // onBlur={setQuantityValue}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md="4"
                        className="mb-3"
                        controlId={`formBasicItemUnitCost-${index}`}
                      >
                        <Form.Label>Unit Cost</Form.Label>
                        <Form.Control
                          type="number"
                          step={0.01}
                          name={`itemUnitCost-${index}`}
                          min={0}
                          required
                          // onBlur={setUnitCostValue}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        className="mb-3"
                        controlId={`formBasicItemLineTotal-${index}`}
                      >
                        <Form.Label>Line Total</Form.Label>
                        <Form.Control
                          type="number"
                          name={`itemLineTotal-${index}`}
                          required
                          disabled
                        />
                      </Form.Group>
                    </React.Fragment>
                  </Row>
                </div>
              </>
            ))}
            <hr />
            <p
              onClick={handleNewProduct}
              style={{
                cursor: "hand",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Add New Product
            </p>
            <hr />

            <div style={{ display: "inline-block" }}>
              <div style={{ float: "left" }}>
                <Button
                  className="ps-3 pe-3"
                  variant="primary"
                  type="submit"
                  onClick={handleGeneratePO}
                  style={{ width: "150px" }}
                >
                  {buttonText}
                </Button>
              </div>
              <PDFPopupButton
                documentComponent={
                  <PurchaseOrderPdf
                    purchaseOrderData={purchaseOrderData}
                    purchaseOrderTotal={purchaseOrderTotal}
                  />
                }
                fileName={"PO"}
                loadingText="Print Purchase Order"
              />
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AdminPurchaseOrdersComponentCopy;
