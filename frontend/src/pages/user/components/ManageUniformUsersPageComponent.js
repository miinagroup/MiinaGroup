import { Row, Col, Modal, Button, Card, Tooltip, Form, OverlayTrigger } from "react-bootstrap";
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
  getAllUniformRole,
  bulkUpdateUsers,
  bulkUpdateUserRoles
}) => {
  const [uniformRoles, setUniformRoles] = useState()
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
  const [showAlert, setShowAlert] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false)
  const [updatedRoles, setUpdatedRoles] = useState({});
  const [roleUpdated, setRoleUpdated] = useState(false)

  useEffect(() => {
    getUniformCategories()
      .then((categories) => { setUniformCategories(categories) })
    getUniformCartByCompany(userInfo.company)
      .then((userUniforms) => { setUserUniforms(userUniforms) })
    setTotalItems(userUniforms.length)
    setUserCompany(userInfo.company)
    getAllUniformRole()
      .then((uniformRole) => { setUniformRoles(uniformRole) })
  }, [show, addToCartReduxAction, roleUpdated]);

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
      { name: "Name", field: "name", sortable: true },
      {
        name: (
          <>
            Roles
            <button
              className="btn btn-primary  p-0 pe-1 ps-1"
              onClick={() => { setEnableEdit(true); setShowAlert(true); }}
              style={{ marginLeft: "10px" }}
              disabled={enableEdit}
            >
              Edit
            </button>
            <button
              className="btn btn-primary  p-0 pe-1 ps-1"
              onClick={() => handleSaveRoles()}
              style={{ marginLeft: "5px" }}
            >
              Save
            </button>
          </>
        ), field: "role", sortable: false
      }
    ]
    uniformCategories?.map((category) => {
      if (category.display) {
        const field = category.name.split("/")[1]
        headings.push({ name: `${field}`, field: `${field}`, sortable: true })
      }
    })
    setHeaders(headings)
  }, [uniformCategories, updatedRoles])

  const getUniformStyle = (uniform) => ({
    cursor: "pointer"
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

  const handleAlertConfirm = () => {
    setShowAlert(false)
  }
  const handleShow = (userId, userUniform) => {
    setSelectedUserCart(userUniform)
    setSelectedUserId(userId)
    setShow(true);
  };

  // Handle dropdown change
  const handleDropdownChange = (idx, value) => {
    setRoleUpdated(false)
    setUpdatedRoles((prev) => ({
      ...prev,
      [idx]: value, // Update the selected value for the specific row
    }));
  };

  // Handle save button click
  const handleSaveRoles = () => {
    const updatedUniformUsers = userUniforms
      .map((uniform, idx) => ({
        ...uniform,
        updatedRole: updatedRoles[idx], // Temporarily store the updated role
        idx, // Keep the original index
      }))
      .filter(({ userRole, updatedRole }) => updatedRole && updatedRole !== userRole) // Filter only updated items
      .map(({ updatedRole, ...rest }) => ({
        ...rest,
        userRole: updatedRole, // Replace `userRole` with the updated value
      }));

    //Update the updated data to the database
    if (updatedUniformUsers.length > 0) {
      bulkUpdateUsers(updatedUniformUsers)
        .then((result) => {
          if (result.message === "success") {
            bulkUpdateUserRoles(updatedUniformUsers)
              .then((result) => {
                if (result.data.message === "Success") {
                  setRoleUpdated(true)
                  setEnableEdit(false)
                }
              })
          } else {
            console.error("Bulk update failed:", result?.message || "Unknown error");
          }
        })
        .catch((error) => {
          console.error("An error occurred during the bulk update:", error.message);
        });
    } else {
      setEnableEdit(false)
    }
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
                  <td>
                    <Form.Select
                      required
                      name="role"
                      disabled={!enableEdit}
                      value={updatedRoles[idx] || uniform?.userRole} // Use updated value or default
                      onChange={(e) => handleDropdownChange(idx, e.target.value)}
                    >
                      <option>{uniform?.userRole}</option>
                      {
                        uniformRoles?.map((role, roleIdx) => (
                          <option key={roleIdx} value={role.role} >
                            {role.role}
                          </option>))
                      }
                    </Form.Select>
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
      <Modal show={showAlert} onHide={handleAlertConfirm} centered className="order_preview_items_uniform">
        <Modal.Body>
          <p> Changing the user role will clear all cart items associated with the user.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAlertConfirm}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageUniformUsersPageComponent;
