import { Row, Col, Table, Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";
import SupplierDetailPageComponent from "./SupplierDetailPageComponent";

const AdminSuppliersPageComponent = ({ fetchSuppliers, deleteSupplier }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierDeleted, setSupplierDeleted] = useState(false);

  const deleteHandler = async (supplierId) => {
    if (window.confirm("Are You Sure")) {
      const data = await deleteSupplier(supplierId);
      if (data.message === "Supplier Deleted") {
        setSupplierDeleted(!supplierDeleted);
        window.location.reload(false);
      }
    }
  };

  useEffect(() => {
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
  }, [supplierDeleted]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (orderId) => {
    setSelectedSupplierId(orderId);
    setShow(true);
  };

  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  return (
    <>
      <Row className="content-container  m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h1>
            Suppliers List{" "}
            <LinkContainer to="/admin/create-new-supplier">
              <Button
                variant="success"
                className="m-0 me-4 ms-4 p-0 pe-1 ps-1"
                size="lg"
              >
                Create new
              </Button>
            </LinkContainer>
          </h1>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th width="15%">Company Name</th>
                <th width="15%">Sales Email</th>
                <th width="25%">Sales Account</th>
                <th width="35%">Location</th>
                <th width="10%">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{supplier.supplierName}</td>
                  <td>{supplier.supplierSalesEmail}</td>
                  <td
                    onClick={() => handleShow(supplier._id)}
                    style={{ cursor: "pointer" }}
                  >
                    {supplier.supplierSalesPhone}
                  </td>
                  <td>
                    {supplier.supplierAddress}, {supplier.supplierCity},{" "}
                    {supplier.supplierState}, {supplier.supplierPostcode},{" "}
                    {supplier.supplierCountry}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/edit-supplier/${supplier._id}`}>
                      <Button className="btn-sm btn-light">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {" / "}
                    <Button
                      variant="danger"
                      className="btn-sm btn-light"
                      onClick={() => deleteHandler(supplier._id)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} style={{ marginTop: "5%" }}>
        <SupplierDetailPageComponent id={selectedSupplierId} />
      </Modal>
    </>
  );
};

export default AdminSuppliersPageComponent;
