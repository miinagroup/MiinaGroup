import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import POCartItemForOrderComponent from "../../../components/POCartItemForOrderComponent";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import PurchaseOrderPdf from "../../../components/Pdfs/PurchaseOrder";
import { pdf } from "@react-pdf/renderer";

import axios from "axios";

const PODetailsPageComponent = ({ getOrder, sendInv, updateBackOrder }) => {
  const { id } = useParams();

  const [order, setOrder] = useState();
  const [refreshOrder, setRefreshOrder] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);

  const [invoiceSent, setInvoiceSent] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState();
  const [sentInvButtonDisabled, setSentInvButtonDisabled] = useState(false);

  const [invSentButton, setInvSentButton] = useState("Send PO");
  const [cartItems, setCartItems] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [backOrderStatus, setBackOrderStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        console.log("getOrder", data);

        setOrder(data.purchaseOrder);
        setBackOrderStatus(data.purchaseOrder.backOrderStatus);
        setCreatedAt(data.purchaseOrder.createdAt);
        setCartSubtotal(data.purchaseOrder.orderTotal.cartSubtotal);
        if (data.purchaseOrder.orderTotal.taxAmount) {
          setTaxAmount(data.purchaseOrder.orderTotal.taxAmount);
        }
        if (data.purchaseOrder.poSent) {
          setInvSentButton("Re-send PO");
          setSentInvButtonDisabled(true);
        }
        setCartItems(data.purchaseOrder.poCartItems);
        setOrderData(order);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [invoiceSent, id, refreshOrder]);

  const nonGSTPrice = (cartSubtotal / 1.1).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const GST = ((cartSubtotal / 1.1) * 0.1).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const incGSTPrice = cartSubtotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const orderNetAmount = (cartSubtotal - taxAmount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const TAX = taxAmount?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  /* ************* Print PDF documents ************* */

  useEffect(() => {
    setPurchaseOrderData(order);
  }, [order]);

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
    <ListGroup.Item className="p-1 ps-2">
      <div className="d-grid gap-2">
        <Button
          className="p-0 m-0 pe-2 ps-2 w-50 ctl_blue_button"
          onClick={() => openPDFInPopup(documentComponent, fileName)}
        >
          {loadingText}
        </Button>
      </div>
    </ListGroup.Item>
  );

  const [base64Data, setBase64Data] = useState([]);
  const [purchaseOrderTotal, setPurchaseOrderTotal] = useState({
    incGSTPrice,
    orderNetAmount,
    TAX,
  });

  useEffect(() => {
    setPurchaseOrderTotal({ incGSTPrice, orderNetAmount, TAX });

    const updatedPoCartItems = purchaseOrderData?.poCartItems?.map((item) => {
      const product = item.poCartProducts[0];
      const lineTotal = (
        product.quantity * product.purchaseprice
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      let purchaseprice = product.purchaseprice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return {
        ...item,
        poCartProducts: [{ ...product, purchaseprice, lineTotal }],
      };
    });

    if (
      JSON.stringify(purchaseOrderData?.poCartItems) !==
      JSON.stringify(updatedPoCartItems)
    ) {
      setPurchaseOrderData((prevData) => ({
        ...prevData,
        poCartItems: updatedPoCartItems,
      }));
    }
  }, [incGSTPrice, orderNetAmount, TAX, purchaseOrderData]);

  const generatePdf = async () => {
    try {
      const blob = await pdf(
        <PurchaseOrderPdf
          purchaseOrderData={purchaseOrderData}
          purchaseOrderTotal={purchaseOrderTotal}
        />
      ).toBlob();

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setBase64Data({
          base64data,
        });
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  const [invData, setInvData] = useState();

  useEffect(() => {
    generatePdf();
  }, [order, id]);

  useEffect(() => {
    setInvData({
      sentInvButtonDisabled,
      base64data: base64Data.base64data,
      totalPrice: incGSTPrice,
      poNumber: order?.poNumber,
      supplierSalesEmail: order?.supplierSalesEmail,
      supplier: order?.supplierName,
      poID: id,
    });
  }, [base64Data, incGSTPrice, orderNetAmount, TAX, purchaseOrderData]);

  const [sendingPO, setSendingPO] = useState(false);

  console.log(invData);

  const sendInvoiceEmail = async (invData) => {
    setSendingPO(true);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formDataToSend = new FormData();
    formDataToSend.append("totalPrice", `${invData.totalPrice}`);
    formDataToSend.append(
      "supplierSalesEmail",
      `${invData.supplierSalesEmail}`
    );
    formDataToSend.append("poNumber", `${invData.poNumber}`);
    formDataToSend.append("supplier", `${invData.supplier}`);
    formDataToSend.append("base64data", `${invData.base64data}`);
    formDataToSend.append("poID", `${id}`);
    try {
      const res = await axios.post(
        "/api/sendemail/emailPO",
        formDataToSend,
        config
      );
      // console.log(res.data);
      setSendingPO(false);
      setRefreshOrder(!refreshOrder);
      return true;
    } catch (err) {
      console.error(err);
      setSendingPO(false);
      return false;
    }
  };

  const handleSentInv = async () => {
    sendInvoiceEmail(invData)
      .then((res) => {
        if (res) {
          setInvoiceSent(true);
        }
      })
      .catch((er) => {
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        );
        setInvSentButton("Something Went Wrong! Contact Tech Team!!!");
      });
  };

  return (
    <Container fluid style={{ width: "80%" }}>
      <Row className="mt-4">
        <h1>PURCHASE ORDER DETAILS:</h1>
        <br />
        <br />
        <br />
        <Col md={9}>
          <ListGroup variant="flush">
            <table style={{ width: "100%" }} className="mt-1">
              <thead>
                <tr>
                  <th style={{ width: "6%" }}></th>
                  <th style={{ width: "22%" }}>Product</th>
                  <th style={{ width: "8%" }}>Supplier SKU</th>
                  <th style={{ width: "8%" }}>CTLSKU</th>
                  <th style={{ width: "7%" }}>Unit Price</th>
                  <th style={{ width: "7%" }}>Order Qty</th>
                  <th style={{ width: "7%" }}>Received Qty</th>
                  <th style={{ width: "7%" }}>Back Order</th>
                </tr>
              </thead>
              {cartItems.map((item, idx) => (
                <POCartItemForOrderComponent
                  key={idx}
                  item={item}
                  orderCreated={true}
                  id={id}
                  backOrderStatus={backOrderStatus}
                />
              ))}
            </table>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item className="p-1 ps-2">
              <h3>ORDER SUMMARY</h3>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              <b>Supplier</b>: {order?.supplierName} <br />
              <b>Phone</b>: {order?.supplierSalesPhone} <br />
              <b>Email</b>: {order?.supplierSalesEmail} <br />
              <b>Address</b>: {order?.supplierAddress}
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              Item Price:{" "}
              <span className="fw-bold float-end">
                {" "}
                $ {taxAmount ? orderNetAmount : nonGSTPrice}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              Total GST{" "}
              <span className="fw-bold float-end">
                $ {taxAmount ? TAX : GST}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              Invoice Amount:{" "}
              <span className="fw-bold text-danger float-end">
                $ {incGSTPrice}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              Shipping:{" "}
              <span className="fw-bold float-end">
                {order?.deliveryMethod.toUpperCase()}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              PO Number:{" "}
              <span className="fw-bold float-end">{order?.poNumber}</span>
            </ListGroup.Item>
            <PDFPopupButton
              documentComponent={
                <PurchaseOrderPdf
                  purchaseOrderData={purchaseOrderData}
                  purchaseOrderTotal={purchaseOrderTotal}
                />
              }
              fileName={order?.poNumber}
              loadingText="Print Purchase Order"
            />

            <ListGroup.Item className="p-1 ps-2">
              <div className="d-grid gap-2">
                <Button
                  className="p-0 m-0 w-50"
                  onClick={
                    sentInvButtonDisabled
                      ? () => sendInvoiceEmail(invData)
                      : handleSentInv
                  }
                  variant={sentInvButtonDisabled ? "secondary" : "success"}
                  type="button"
                  disabled={sendingPO}
                >
                  {sendingPO ? "Sending..." : invSentButton}{" "}
                  <span hidden={!order?.poHasSent}>({order?.poHasSent})</span>{" "}
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default PODetailsPageComponent;
