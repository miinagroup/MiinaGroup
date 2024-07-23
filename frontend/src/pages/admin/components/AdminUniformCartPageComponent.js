import { Row, Col, Form, Modal, Button, ListGroup, ButtonGroup, ListGroupItem, ButtonToolbar, Tab, Tabs, Nav, Container, Table } from "react-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { LinkContainer } from "react-router-bootstrap";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import React, { useState, useRef, useEffect, useMemo } from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { useSelector } from "react-redux";

const AdminUniformCartPageComponent = ({
    fetchUniformCart, adminRemoveUniformCart
}) => {

    const [validated, setValidated] = useState(true);
    const [UniformCart, setUniformCart] = useState();
    const [uniformDeleted, setUniformDeleted] = useState(false);

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "category", order: "asc" });

    const ITEMS_PER_PAGE_OPTIONS = [40, 60, 100, 200];
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]);

    const ITEMS_PER_PAGE = itemsPerPage;
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
    };

    const headers = [
        { name: "No#", field: "index", sortable: false },
        { name: "UserID", field: "userId", sortable: true },
        { name: "TopSKU", field: "topSKU", sortable: true },
        { name: "BottomSKU", field: "bottomSKU", sortable: true },
        { name: "maxTopQty", field: "maxTopQty", sortable: true },
        { name: "maxBottomQty", field: "maxBottomQty", sortable: true },
        { name: "extraTopQty", field: "extraTopQty", sortable: true },
        { name: "extraBottomQty", field: "extraBottomQty", sortable: true },
        { name: "purchasedTopQty", field: "purchasedTopQty", sortable: true },
        { name: "purchasedBottomQty", field: "purchasedBottomQty", sortable: true },
        { name: "Edit/Delete", field: "", sortable: false },
    ];

    const uniformsData = useMemo(() => {
        let uniformsList = UniformCart;

        if (search) {
            uniformsList = uniformsList.filter(
                (uniforms) =>
                    UniformCart.userId?.toLowerCase().includes(search.toLowerCase()) ||
                    UniformCart.topSKU?.toLowerCase().includes(search.toLowerCase()) ||
                    UniformCart.bottomSKU?.toLowerCase().includes(search.toLowerCase()) ||
                    UniformCart.maxTopQty?.toLowerCase().includes(search.toLowerCase()) ||
                    UniformCart.maxBottomQty?.toLowerCase().includes(search.toLowerCase()) ||
                    UniformCart.extraTopQty?.toLowerCase().includes(search.toLowerCase()) ||
                    UniformCart.extraBottomQty?.toLowerCase().includes(search.toLowerCase()) ||
                    UniformCart.purchasedTopQty?.toLowerCase().includes(search.toLowerCase()) ||
                    UniformCart.purchasedBottomQty?.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(uniformsList?.length);

        //Sorting products
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            uniformsList = uniformsList?.sort((a, b) => {
                const fieldA = a[sorting.field];
                const fieldB = b[sorting.field];

                if (typeof fieldA === "number" && typeof fieldB === "number") {
                    return reversed * (fieldA - fieldB);
                } else if (typeof fieldA === "string" && typeof fieldB === "string") {
                    return reversed * fieldA.localeCompare(fieldB);
                } else {
                    // If field types are different, compare their string representations
                    return reversed * String(fieldA).localeCompare(String(fieldB));
                }
            });
        }
        return uniformsList?.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [UniformCart, currentPage, search, sorting]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure?")) {
            const data = await adminRemoveUniformCart(id);
            if (data.message === "Uniform Deleted") {
                setUniformDeleted(!uniformDeleted);
            }
        }
    };

    useEffect(() => {
        const abctrl = new AbortController();
        fetchUniformCart(abctrl)
            .then((data) => {
                setUniformCart(data);
            })
            .catch((er) =>
                console.log(
                    er.response.data.message ? er.response.data.message : er.response.data
                ));
        return () => abctrl.abort();
    }, [uniformDeleted, itemsPerPage]);


    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                <h1>
                    Uniform Purchase History{" "}
                    <LinkContainer to="/admin/create-new-uniform">
                        <Button
                            variant="success"
                            className="m-0 me-4 ms-4 p-0 pe-1 ps-1"
                            size="lg"
                        >
                            Create New
                        </Button>
                    </LinkContainer>

                    <select
                        className="ms-4 mt-1 fs-6"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        {ITEMS_PER_PAGE_OPTIONS?.map((option) => (
                            <option key={option} value={option}>
                                {option} per page
                            </option>
                        ))}
                    </select>
                </h1>
                <div className="row">
                    <div className="col-md-6">
                        <Pagination
                            total={totalItems}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                    <div className="col-md-6 d-flex flex-row-reverse mb-1">
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
                        {/* 这里需要去到product controller 找到adminGetProducts 改一些数据，才能显示出来 */}
                        {uniformsData?.map((item, idx) => (
                            <tr key={idx} id="uniform-row">
                                <td>{idx + 1}</td>
                                <td>
                                    <a href={`/uniform-details/${item._id}`}>
                                        <text className="text-uppercase" style={{ color: "black" }}>
                                            {item.userId}
                                        </text>
                                    </a>
                                </td>
                                <td>
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        {item.topSKU}
                                    </text>
                                </td>
                                <td>
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        {item.bottomSKU}
                                    </text>
                                </td>
                                <td>
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        {item.maxTopQty}
                                    </text>
                                </td>
                                <td>
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        {item.maxBottomQty}
                                    </text>
                                </td>
                                <td>
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        {item.extraTopQty}
                                    </text>
                                </td>
                                <td>
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        {item.extraBottomQty}
                                    </text>
                                </td>
                                <td>
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        {item.purchasedTopQty}
                                    </text>
                                </td>
                                <td>
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        {item.purchasedBottomQty}
                                    </text>
                                </td>

                                <td>
                                    <LinkContainer to={`/admin/UniformCart-details/${item._id}`}>
                                        <Button className="btn-sm btn-light">
                                            <i className="bi bi-box-arrow-up-right"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <LinkContainer to={`/admin/edit-UniformCart/${item._id}`}>
                                        <Button className="btn-sm btn-light">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button
                                        variant="danger"
                                        className="btn-sm btn-light"
                                        onClick={() => deleteHandler(item._id)}
                                    >
                                        <i className="bi bi-x-circle"></i>
                                    </Button>
                                </td>
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
                    {/* <div className="col-md-6 d-flex flex-row-reverse mb-1">
                        <Button
                            onClick={(e) => exportToExcel("products_List")}
                            style={{ cursor: "pointer", fontSize: 14 }}
                        >
                            Excel Export
                        </Button>
                    </div> */}
                </div>

            </Col>
        </Row>
    )
};

export default AdminUniformCartPageComponent;