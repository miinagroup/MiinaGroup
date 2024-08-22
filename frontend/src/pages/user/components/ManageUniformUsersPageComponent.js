import { Row, Col, Modal, Button, Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLinksComponent from "../../../components/user/UserLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import UserOrderItemForOrderPageComponent from "./UserOrderItemForOrderPageComponent";
import { TbColorPicker } from "react-icons/tb";
import ManageUniformsListPage from "./ManageUniformsListPage";

const ManageUniformUsersPageComponent = ({
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
    setTotalItems(userUniforms.length)
    setUserCompany(userInfo.company)
  }, [show, addToCartReduxAction]);

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    var sortOrder = ['SHIRTS', 'JACKETS', 'PANTS', 'OVERALLS', 'BOOTS'];
    uniformCategories?.sort(
      function (a, b) {
        if (a.name.split("/")[1] == b.name.split("/")[1]) {
          return a.name.split("/")[1].localeCompare(b.name.split("/")[1]);
        } else {
          return sortOrder.indexOf(a.name.split("/")[1]) - sortOrder.indexOf(b.name.split("/")[1]);
        }
      }
    );
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

  //console.log(uniformCategories);

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
    editDisabled: {
      color: "orange"
    },
    activeEdit: {
      cursor: "pointer",
      color: "green"
    }
  };


  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (userId, userUniform) => {
    setSelectedUserCart(userUniform)
    setSelectedUserId(userId)
    setShow(true);
  };

  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <UserLinksComponent />
        </Col>
        <Col md={10}>
          <h1>USER UNIFORMS</h1>

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

                  {
                    uniform.stock.map((uStock) => (
                      uniformCategories?.map((category) => (
                        (uStock.itemName === (category.name.split("/")[1])) ? (

                          <td>
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

                        )
                          : ("")
                      ))
                    )

                    )}
                  {
                    ((cartItems?.length !== 0) && (cartItems[0].uniformUserId === uniform?.userId)) ? (
                      < td >
                        <span onClick={() => handleShow(uniform?.userId, uniform)}><i class="bi bi-pencil-square" style={styles.activeEdit}></i></span>
                      </td>
                    ) : (
                      cartItems?.length === 0 ? (
                        < td >
                          <span onClick={() => handleShow(uniform?.userId, uniform)}><i class="bi bi-pencil-square" style={styles.edit}></i></span>
                        </td>
                      ) : (
                        < td >
                          {/* <span ><i class="bi bi-pencil-square" style={styles.editDisabled} ></i></span>&nbsp; */}
                          <OverlayTrigger
                            delay={{ hide: 450, show: 200 }}
                            overlay={(props) => (
                              <Tooltip {...props} >
                                You Are Already Processing {cartItems[0]?.uniformUserName} Cart.<br /> Please Complete Existing Cart <br />( OR )<br /> Empty Your Cart
                              </Tooltip>
                            )}
                            placement="bottom"
                          ><i class="bi bi-exclamation-circle-fill fa-lg" style={{ color: "orange" }}></i>
                          </OverlayTrigger>
                        </td>
                      )

                    )
                  }

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
        </Col >
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

export default ManageUniformUsersPageComponent;
