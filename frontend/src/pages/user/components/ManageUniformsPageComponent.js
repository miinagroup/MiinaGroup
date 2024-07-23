import { Row, Col, Modal, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLinksComponent from "../../../components/user/UserLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import UserOrderItemForOrderPageComponent from "./UserOrderItemForOrderPageComponent";
import { TbColorPicker } from "react-icons/tb";
import ManageUniformsListPage from "./ManageUniformsListPage";

const ManageUniformsPageComponent = ({
  getUniformCartByCompany,
  getUniformCategories,
  getUniforms,
  getSelectedSuppliersByCompanyName,
  addToCartReduxAction,
  reduxDispatch,
  updateUniformCart,
}) => {

  const [userUniforms, setUserUniforms] = useState([])
  const [uniformCategories, setUniformCategories] = useState([])
  const [headers, setHeaders] = useState([])
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "Item", order: "desc" });
  const ITEMS_PER_PAGE = 20;

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const [save, setSave] = useState("Save Changes")
  const [userCompany, setUserCompany] = useState()
  const [selectedUserId, setSelectedUserId] = useState()
  const [selectedUserCart, setSelectedUserCart] = useState([])
  const [show, setShow] = useState(false);
  // const headers = [
  //   { name: "Name", field: "name", sortable: true }
  // ];

  useEffect(() => {
    getUniformCategories()
      .then((categories) => { setUniformCategories(categories) })
    getUniformCartByCompany(userInfo.company)
      .then((userUniforms) => { setUserUniforms(userUniforms) })
    setUserCompany(userInfo.company)
  }, [show, addToCartReduxAction]);
  //console.log("userUniforms", userUniforms);
  // order items Modal and Back Order
  //console.log(uniformCategories);
  useEffect(() => {
    var headings = [
      { name: "No:", field: "", sortable: true },
      { name: "Name", field: "name", sortable: true }
    ]
    uniformCategories?.map((category) => {
      if (category.display) {
        const field = category.name.split("/")[1]
        headings.push({ name: `${field}`, field: `${field}`, sortable: true })
      }
    })
    setHeaders(headings)
  }, [uniformCategories])

  //console.log(headers);

  const getUniformStyle = (uniform) => ({
    cursor: "pointer",
    //color: order.user === order.storeId ? order.secondOwnerId !== " " ? "green" : "blue" : order.secondOwnerId !== " " ? "black" : "blue",
    //fontWeight: uniform.backOrder ? "bold" : "normal",

  });

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const styles = {
    purchased: {
      color: "blue",
    },
    edit: {
      cursor: "pointer"
    },
  };


  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (userId, userUniform) => {
    setSelectedUserCart(userUniform)
    setSelectedUserId(userId)
    setShow(true);
  };

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  //   if (!showModal && !product) {
  //     axios.get(`/api/products/get-one/${productId}`).then((response) => {
  //       setProduct(response.data);
  //     });
  //   }
  // };

  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <UserLinksComponent />
        </Col>
        <Col md={10}>
          <h1>USER UNIFORMS</h1>
          {/* {userInfo.isUniformManager === true ? (
            <>
              <LinkContainer to="/manage-uniformBrands" className="me-3">
                <Button >Manage Uniform Brands</Button>
              </LinkContainer>
              <LinkContainer to="/manage-uniforms">
                <Button >Manage Uniforms</Button>
              </LinkContainer>
            </>

          ) : ""} */}
          <div className="row">
            <div className="col-md-6">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="col-md-6 d-flex flex-row-reverse mb-2">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <table className="table table-striped">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {userUniforms?.map((uniform, idx) => (
                <tr key={idx}>
                  <td style={getUniformStyle(uniform)}>{idx + 1} </td>
                  <td>
                    {uniform?.userName}
                  </td>
                  <td>
                    {
                      uniform.stock.map((uStock) => (
                        (uStock.itemName === headers[2].name) ? (
                          <>
                            <td >
                              {
                                (uStock?.purchaseCount > 0) ? (
                                  <>
                                    <label className="purchased" style={styles.purchased}>Purchased : {uStock?.purchaseCount} / {uStock?.purchaseLimit}</label>
                                  </>
                                ) : (
                                  <>
                                    <label> Purchased : {uStock?.purchaseCount} / {uStock?.purchaseLimit}</label>
                                  </>
                                )
                              }

                            </td>
                          </>
                        ) : ("")
                      ))
                    }
                  </td>
                  <td>
                    {
                      uniform.stock.map((uStock) => (
                        (uStock.itemName === headers[3].name) ? (
                          <>
                            <td >
                              {
                                (uStock?.purchaseCount > 0) ? (
                                  <>
                                    <label className="purchased" style={styles.purchased}>Purchased : {uStock?.purchaseCount} / {uStock?.purchaseLimit}</label>
                                  </>
                                ) : (
                                  <>
                                    <label> Purchased : {uStock?.purchaseCount} / {uStock?.purchaseLimit}</label>
                                  </>
                                )
                              }
                            </td>
                          </>
                        ) : ("")
                      ))
                    }
                  </td>
                  <td>
                    {
                      uniform.stock.map((uStock) => (
                        (uStock.itemName === headers[4].name) ? (
                          <>
                            <td >
                              {
                                (uStock?.purchaseCount > 0) ? (
                                  <>
                                    <label className="purchased" style={styles.purchased}>Purchased : {uStock?.purchaseCount} / {uStock?.purchaseLimit}</label>
                                  </>
                                ) : (
                                  <>
                                    <label> Purchased : {uStock?.purchaseCount} / {uStock?.purchaseLimit}</label>
                                  </>
                                )
                              }
                            </td>
                          </>
                        ) : ("")
                      ))
                    }
                  </td>
                  <td>
                    {
                      uniform.stock.map((uStock) => (
                        (uStock.itemName === headers[5].name) ? (
                          <>
                            <td >
                              {
                                (uStock?.purchaseCount > 0) ? (
                                  <>
                                    <label className="purchased" style={styles.purchased}>Purchased : {uStock?.purchaseCount} / {uStock?.purchaseLimit}</label>
                                  </>
                                ) : (
                                  <>
                                    <label> Purchased : {uStock?.purchaseCount} / {uStock?.purchaseLimit}</label>
                                  </>
                                )
                              }
                            </td>
                          </>
                        ) : ("")
                      ))
                    }
                  </td>
                  <td>
                    {
                      uniform.stock.map((uStock) => (
                        (uStock.itemName === headers[6].name) ? (
                          <>
                            <td >
                              {
                                (uStock?.purchaseCount > 0) ? (
                                  <>
                                    <label className="purchased" style={styles.purchased}>Purchased : {uStock?.purchaseCount} / {uStock?.purchaseLimit}</label>
                                  </>
                                ) : (
                                  <>
                                    <label> Purchased : {uStock?.purchaseCount} / {uStock?.purchaseLimit}</label>
                                  </>
                                )
                              }
                            </td>
                          </>
                        ) : ("")
                      ))
                    }
                  </td>
                  <td>
                    <span onClick={() => handleShow(uniform?.userId, uniform)}><i class="bi bi-pencil-square" style={styles.edit}></i></span>
                  </td>

                  {/* <td>
                    <Link
                      to={`/uniform-list/?categoryName=UNIFORM&subCategoryName=${uniform?.itemName}`}
                      rel="noreferrer"
                    >
                      Resume Purchase <i className="bi bi-box-arrow-in-right"></i>
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-6">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </Col>
      </Row >
      <Modal show={show} onHide={handleClose} className="order_preview_items">
        <ManageUniformsListPage
          getSelectedSuppliersByCompanyName={getSelectedSuppliersByCompanyName}
          getUniforms={getUniforms}
          userCompany={userCompany}
          selectedUserId={selectedUserId}
          uniformCategories={uniformCategories}
          selectedUserCart={selectedUserCart}
          reduxDispatch={reduxDispatch}
          addToCartReduxAction={addToCartReduxAction}
          updateUniformCart={updateUniformCart} />

      </Modal>
    </>
  );
};

export default ManageUniformsPageComponent;
