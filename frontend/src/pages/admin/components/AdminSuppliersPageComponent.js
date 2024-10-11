import { Row, Col, Table, Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";
import SupplierDetailPageComponent from "./SupplierDetailPageComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";

const AdminSuppliersPageComponent = ({ fetchSuppliers, deleteSupplier }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [fineSlicedSuppliers, setFineSlicedSuppliers] = useState([]);
  const [supplierDeleted, setSupplierDeleted] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [show, setShow] = useState(false);
  const [sorting, setSorting] = useState({ field: "createdAt", order: "desc" });
  //const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 40;

  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Company Name", field: "supplierName", sortable: true },
    { name: "Sales Email", field: "supplierSalesEmail", sortable: true },
    { name: "Sales Account", field: "supplierSalesPhone", sortable: true },
    { name: "Location", field: "supplierAddress", sortable: true },
    { name: "Edit/Delete", field: "", sortable: false }
  ];

  const columnWidths = [
    "3%",
    "20%",
    "20%",
    "15%",
    "35%",
    "5%",
  ];

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

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (orderId) => {
    setSelectedSupplierId(orderId);
    setShow(true);
  };

  useEffect(() => {
    let filterSuppliers = suppliers.filter((supplier) =>
      supplier.supplierName?.toUpperCase().includes(search.toUpperCase())
    );
    setFilteredSuppliers(filterSuppliers)
  }, [search, suppliers])

  const getNestedProperty = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  useEffect(() => {
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      let filterSuppliers = fineSlicedSuppliers.sort((a, b) => {
        const fieldA = getNestedProperty(a, sorting.field);
        const fieldB = getNestedProperty(b, sorting.field);

        if (typeof fieldA === "number" && typeof fieldB === "number") {
          return reversed * (fieldA - fieldB);
        } else if (typeof fieldA === "string" && typeof fieldB === "string") {
          return reversed * fieldA.localeCompare(fieldB);
        } else {
          // If field types are different, compare their string representations
          return reversed * String(fieldA).localeCompare(String(fieldB));
        }
      });
      setFineSlicedSuppliers(filterSuppliers)
    }
  }, [sorting])

  const totalItems = filteredSuppliers.length
  useEffect(() => {
    let slicedSuppliers = filteredSuppliers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
    setFineSlicedSuppliers(slicedSuppliers)
  }, [currentPage, filteredSuppliers])

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
          <div className="row">
            <div className="col-md-5">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="col-md-5"></div>
            <Search
              onSearch={(value) => {
                setSearch(value);
              }}
            />
          </div>
          <table className="table table-striped table-sm">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
              widths={columnWidths}
            />
            <tbody>
              {fineSlicedSuppliers.map((supplier, idx) => (
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
          </table>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} style={{ marginTop: "5%" }}>
        <SupplierDetailPageComponent id={selectedSupplierId} />
      </Modal>
    </>
  );
};

export default AdminSuppliersPageComponent;
