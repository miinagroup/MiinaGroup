import React from "react";
import { Container, Row, Col, Form, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import POCartItemComponent from "../../../components/POCartItemComponent";
import Decimal from "decimal.js";
import { useNavigate } from "react-router-dom";

const AdminPOCartDetailsPageComponent = ({
  getPOCart,
  changeCount,
  removeFromPOCartHandler,
  emptyCart,
  fetchSuppliers,
  createPO,
  getLargestPONumber,
}) => {
  const [poCartItems, setPoCartItems] = useState([]);
  const [totalPocartItems, setTotalPocartItems] = useState([]);
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [nonGSTPrice, setNonGSTPrice] = useState(0);
  const [GST, setGST] = useState(0);
  const [incGSTPrice, setIncGSTPrice] = useState(0);
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [purchaseOrderTotal, setPurchaseOrderTotal] = useState(0);
  const [refreshingData, setRefreshingData] = useState(false);
  const [fcDataBtnText, setFcDataBtnText] = useState("Refresh PO Cart");
  const [emptyCartBtnText, setEmptyCartBtnText] = useState("Empty Cart");
  const [noItemsMessage, setNoItemsMessage] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({});
  const [selectedSupplierName, setSelectedSupplierName] =
    useState("selectSupplier");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  const navigate = useNavigate();

  const removeAllItems = () => {
    setEmptyCartBtnText("Emptying...");
    emptyCart().then(() => {
      setEmptyCartBtnText("Empty Cart");
      fetchPOCartData();
    });
  };

  const fetchPOCartData = async () => {
    setRefreshingData(true);
    setFcDataBtnText("Refreshing...");
    getPOCart().then((data) => {
      if (data.data.cart && data.data.cart.poCartItems?.length > 0) {
        const poCartItems = data.data.cart.poCartItems;
        setNoItemsMessage("");
        if (selectedSupplierName !== "selectSupplier") {
          const selectedSupplierProducts = poCartItems.filter(
            (item) => item.supplier === selectedSupplierName
          );
          setPoCartItems(selectedSupplierProducts);
        } else {
          setPoCartItems(poCartItems);
        }
        setTotalPocartItems(poCartItems);
        const uniqueSuppliers = [
          ...new Set(poCartItems.map((item) => item.supplier)),
        ];

        setSupplierList(uniqueSuppliers);
        setRefreshingData(false);
        setFcDataBtnText("Refresh PO Cart");
      } else {
        setNoItemsMessage("NO ITEMS IN PO CART");
        setRefreshingData(false);
        setFcDataBtnText("Refresh PO Cart");
      }
    });
  };


  useEffect(() => {
    fetchPOCartData();
    fetchSuppliersHandler();
    getLargestPONumber()
      .then((data) => {
        if (data && data.poNumber) {
          const largestPONumber = data.poNumber;
          const ponNumber = largestPONumber.split("-");
          const newPONumber = parseInt(ponNumber[1]) + 1;
          setPurchaseNumber(`${ponNumber[0]}-${newPONumber}`);
        } else if (
          data &&
          data.message === "No purchase orders found for today."
        ) {
          const today = new Date();
          const formattedDate = [
            ("0" + today.getDate()).slice(-2),
            ("0" + (today.getMonth() + 1)).slice(-2),
            today.getFullYear().toString().slice(-2),
          ].join("");
          setPurchaseNumber(`PO${formattedDate}-1`);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch largest PO number:", error);
      });
  }, []);

  const fetchSuppliersHandler = async () => {
    const abctrl = new AbortController();
    fetchSuppliers(abctrl)
      .then((res) => setSuppliers(res.data.suppliers))
      .catch((er) => {
        if (er.code === "ERR_CANCELED") {
        } else if (er.response) {
          console.log(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          );
        } else {
          console.log(er);
        }
      });
    return () => abctrl.abort();
  };

  useEffect(() => {
    const nonGSTPrice = poCartItems.reduce((acc, item) => {
      const purchasePrice = new Decimal(item.poCartProducts[0].purchaseprice);
      const quantity = new Decimal(item.poCartProducts[0].quantity);
      return acc.plus(purchasePrice.times(quantity));
    }, new Decimal(0));
    setNonGSTPrice(nonGSTPrice.toNumber());

    const GST = nonGSTPrice.times(new Decimal(0.1)).toFixed(2);
    setGST(parseFloat(GST));

    const incGSTPrice = nonGSTPrice.plus(GST);
    setIncGSTPrice(incGSTPrice.toNumber());
  }, [poCartItems]);

  const selectSupplierHandler = (e) => {
    const supplierName = e.target.value;
    setSelectedSupplierName(supplierName);
    if (supplierName === "selectSupplier") {
      setPoCartItems(totalPocartItems);
      setSupplier({});
      return;
    }

    const selectedSupplierProducts = totalPocartItems.filter(
      (item) => item.supplier === supplierName
    );
    setPoCartItems(selectedSupplierProducts);

    const selectedSupplier = suppliers.find(
      (supplier) =>
        supplier.supplierName.toUpperCase() === supplierName.toUpperCase()
    );
    setSupplier(selectedSupplier || {});
  };

  const selectDeliveryMethodHandler = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: poCartItems.length,
        cartSubtotal: incGSTPrice.toFixed(2),
        taxAmount: GST.toFixed(2),
      },
      poCartItems: poCartItems.map((item) => {
        return {
          productId: item.productId,
          name: item.name,
          saleunit: item.saleunit,
          image: item.image ? item.image ?? null : null,
          poCartProducts: [
            {
              attrs: item.poCartProducts[0].attrs,
              uom: item.poCartProducts[0].uom,
              ctlsku: item.poCartProducts[0].ctlsku,
              purchaseprice: item.poCartProducts[0].purchaseprice,
              quantity: item.poCartProducts[0].quantity,
              receivedQty: 0,
              backOrderQty: 0,
              suppliersku: item.poCartProducts[0].suppliersku,
              _id: item.poCartProducts[0]._id,
            },
          ],
        };
      }),
      supplierId: supplier._id,
      supplierName: supplier.supplierName,
      supplierSalesEmail: supplier.supplierSalesEmail,
      supplierSalesPhone: supplier.supplierSalesPhone,
      supplierAddress: `${supplier.supplierAddress}, ${supplier.supplierCity}, ${supplier.supplierState}, ${supplier.supplierPostcode}, ${supplier.supplierCountry}`,
      ctlCreditAccount: supplier.ctlCreditAccount,
      supplierABN: supplier.supplierABN,
      poDate: new Date(),
      poNumber: purchaseNumber,
      deliveryMethod: deliveryMethod,
    };

    createPO(orderData)
      .then(async (data) => {
        if (data) {
          setTimeout(() => {
            navigate("/admin/purchaseOrders");
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  // console.log("totalPocartItems.lengt",":", totalPocartItems.length);

  return (
    <Container>
      <Row className="mt-4">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between",
          }}
        >
          <h1>PO CART DETAILS:</h1>
          <Button
            className="CTL_btn ms-4 p-0 ps-1 pe-1"
            onClick={() => {
              fetchPOCartData();
              fetchSuppliersHandler();
            }}
            disabled={refreshingData}
          >
            {" "}
            {fcDataBtnText}{" "}
          </Button>
        </div>
        <Col md={9}>
          <ListGroup>
            <ListGroup.Item className="mt-1">
              <Row>
                <Col md={4}>
                  <Form.Label className="fw-bold">
                    Suppliers {`(${supplierList.length}) `}:
                  </Form.Label>
                  <Form.Select
                    required
                    name="supplierNames"
                    aria-label="Default select example"
                    className="p-0 ps-2"
                    onChange={selectSupplierHandler}
                  >
                    <option value="selectSupplier">
                      {" "}
                      --Select Supplier--{" "}
                    </option>
                    {supplierList &&
                      supplierList.map((supplier, idx) => {
                        return supplier !== "" ? (
                          <option key={idx} value={supplier}>
                            {" "}
                            {supplier}
                          </option>
                        ) : (
                          <option key={idx} value={supplier}>
                            {" "}
                            {supplier}
                          </option>
                        );
                      })}
                  </Form.Select>
                </Col>
                <Col md={1}></Col>
                <Col md={7} hidden={selectedSupplierName !== "selectSupplier"}>
                  {/* <h4>Please Select a Supplier</h4> */}
                </Col>
                <Col md={7} hidden={selectedSupplierName === "selectSupplier"}>
                  {supplier !== undefined && supplier.supplierName ? (
                    <div>
                      <Row className="">
                        <Col xs={3}>
                          <strong>Supplier:</strong>
                        </Col>
                        <Col>{supplier.supplierName}</Col>
                      </Row>
                      <Row className="">
                        <Col xs={3}>
                          <strong>Sales Email:</strong>
                        </Col>
                        <Col>{supplier.supplierSalesEmail}</Col>
                      </Row>
                      <Row className="">
                        <Col xs={3}>
                          <strong>Sales Phone:</strong>
                        </Col>
                        <Col>{supplier.supplierSalesPhone}</Col>
                      </Row>
                      <Row className="">
                        <Col xs={3}>
                          <strong>Address:</strong>
                        </Col>
                        <Col>
                          {supplier.supplierAddress}, {supplier.supplierCity},{" "}
                          {supplier.supplierState},{supplier.supplierPostcode},{" "}
                          {supplier.supplierCountry}
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div>
                      <p className="p-0 mb-1">
                        <strong>NO Supplier found in Database, please: </strong>
                      </p>
                      <LinkContainer to="/admin/create-new-supplier">
                        <Button
                          variant="success"
                          className="m-0 p-0 pe-1 ps-1"
                          size="md"
                        >
                          Create New Supplier
                        </Button>
                      </LinkContainer>
                    </div>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item className="mt-2">
            <Row>
              <Col md={12}>
                <ListGroup>
                  {noItemsMessage ? (
                    <ListGroup.Item className="text-center">
                      <h4>{noItemsMessage}</h4>
                    </ListGroup.Item>
                  ) : (
                    poCartItems.map((item, idx) => (
                      <POCartItemComponent
                        item={item}
                        key={idx}
                        changeCount={changeCount}
                        fetchPOCartData={fetchPOCartData}
                        fromPOCart={true}
                        removeFromPOCartHandler={removeFromPOCartHandler}
                      />
                    ))
                  )}
                </ListGroup>
                <Button
                  type="button"
                  onClick={removeAllItems}
                  className="p-1 ps-1 pe-1 mt-1 empty_cart_btn"
                  disabled={poCartItems.length === 0 || refreshingData}
                >
                  {emptyCartBtnText} <i className="bi bi-trash" />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </Col>
        <Col md={3} className="cart_detail_right">
          <ListGroup className="">
            <ListGroup.Item className="p-1 ps-2">
              <h4 className="m-0">PO Summary</h4>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              <p className="p-0 m-0">
                Total:{" "}
                <span className="float-end">
                  <span className="fw-bold ">{poCartItems.length}</span>{" "}
                  {poCartItems.length === 1 ? "Product" : "Products"}
                </span>
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="p-1 ps-2">
              Item Price:{" "}
              <span className="fw-bold float-end"> $ {nonGSTPrice}</span>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              Total GST <span className="fw-bold float-end">$ {GST}</span>
            </ListGroup.Item>
            <ListGroup.Item className="p-1 ps-2">
              Invoice Amount:{" "}
              <span className="fw-bold text-danger float-end">
                $ {incGSTPrice}
              </span>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex justify-content-between align-items-center px-2 p-1">
              <span className="me-2">Shipping:</span>
              <Form.Select
                required
                name="deliveryMethod"
                aria-label="Default select example"
                className="p-0 ps-2 w-50"
                onChange={selectDeliveryMethodHandler}
              >
                <option value="delivery">-- DELIVERY --</option>
                <option value="pick up">-- PICK UP --</option>
              </Form.Select>
            </ListGroup.Item>

            <ListGroup.Item
              controlid="validationSLRPurchaseNum"
              className="p-1 ps-2"
            >
              <Form.Label className="fw-bold text-danger">PO Number</Form.Label>
              <Form.Control
                className="p-0 ps-1"
                value={purchaseNumber}
                onChange={(e) => setPurchaseNumber(e.target.value)}
                type="string"
                name="SLRPurchaseNumber"
                placeholder="PO Number"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please Enter Your Purchase Number.{" "}
              </Form.Control.Feedback>
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </ListGroup.Item>

            <ListGroup.Item className="p-1 ps-2">
              <div className="d-grid gap-2">
                <button
                  size="sm"
                  onClick={orderHandler}
                  disabled={supplier?.supplierName === undefined}
                  className="btn btn-success p-0 ps-1 pe-1 download_cart_btn"
                >
                  Create PO
                </button>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <br />
          <label>
            <u>
              <a href="/admin/purchaseOrders">Go to Purchase Orders </a>
            </u>
          </label>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPOCartDetailsPageComponent;
