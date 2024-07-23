import React, { useState, useMemo, useEffect } from "react";
import { Row, Col, Form, Button, ListGroup, ButtonGroup, ListGroupItem } from "react-bootstrap";
import {
    TableHeader,
    Pagination,
    Search,
    PaginationPopUp,
} from "../../../components/DataTable";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";
import OverdueInvoicesPrint from "../../../components/Pdfs/OverdueInvoicesPrint";

import "./invoicePDF.css";

const InvoicesOverDuePageComponent = ({
    overDueInv,
    calculateDueInDays,
    currentTotalAmount,
    notDueInv,
}) => {
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({
        field: "deliveredAt",
        order: "asc",
    });
    const [companyFilter, setCompanyFilter] = useState("");

    const [selectedInvoices, setSelectedInvoices] = useState([]);

    const [billingAddress, setBillingAddress] = useState({});
    const [userEmail, setUserEmail] = useState("");

    const navigate = useNavigate();

    const uniqueCompanies = useMemo(() => {
        const companyNames = new Set(
            overDueInv.map((invoice) => invoice.userCompany)
        );
        return Array.from(companyNames);
    }, [overDueInv]);

    const totalAmount = useMemo(() => {
        return selectedInvoices.reduce((sum, invoice) => {
            const amount =
                invoice.orderTotal && invoice.orderTotal.cartSubtotal
                    ? parseFloat(invoice.orderTotal.cartSubtotal)
                    : 0;
            return sum + amount;
        }, 0);
    }, [selectedInvoices]);

    const companyCurrentTotalAmount = useMemo(() => {
        const filteredNotDueInvoices = notDueInv.filter(
            (invoice) => invoice.userCompany === companyFilter
        );

        const totalAmount = filteredNotDueInvoices.reduce((sum, invoice) => {
            const amount =
                invoice.orderTotal && invoice.orderTotal.cartSubtotal
                    ? parseFloat(invoice.orderTotal.cartSubtotal)
                    : 0;
            return sum + amount;
        }, 0);

        return parseFloat(totalAmount.toFixed(2));
    }, [companyFilter, notDueInv]);

    const [past30TotalAmount, setPast30TotalAmount] = useState(0);
    const [past60TotalAmount, setPast60TotalAmount] = useState(0);
    const [past90TotalAmount, setPast90TotalAmount] = useState(0);

    useEffect(() => {
        const now = new Date().getTime();
        let past30Amount = 0;
        let past60Amount = 0;
        let past90Amount = 0;

        selectedInvoices.forEach(invoice => {
            const deliveryDate = new Date(invoice.deliveredAt).getTime();
            const dueDate = deliveryDate + (parseInt(invoice.dueDays, 10) * 86400000);
            const dueDatePlus30 = dueDate + (30 * 86400000);
            const dueDatePlus60 = dueDate + (60 * 86400000);
            const dueDatePlus90 = dueDate + (90 * 86400000);

            const amount = invoice.orderTotal && invoice.orderTotal.cartSubtotal
                ? parseFloat(invoice.orderTotal.cartSubtotal)
                : 0;

            if (now >= dueDate && now < dueDatePlus30) {
                past30Amount += amount;
            }
            else if (now >= dueDatePlus30 && now < dueDatePlus60) {
                past60Amount += amount;
            }
            else if (now >= dueDatePlus60 && now < dueDatePlus90) {
                past90Amount += amount;
            }
        });

        const formattedPast30Amount = past30Amount.toFixed(2);
        const formattedPast60Amount = past60Amount.toFixed(2);
        const formattedPast90Amount = past90Amount.toFixed(2);

        // console.log("past30Amount", formattedPast30Amount);
        // console.log("past60Amount", formattedPast60Amount);
        // console.log("companyCurrentTotalAmount", companyCurrentTotalAmount);

        setPast30TotalAmount(formattedPast30Amount);
        setPast60TotalAmount(formattedPast60Amount);
        setPast90TotalAmount(formattedPast90Amount);
    }, [selectedInvoices]);



    const toggleInvoiceSelection = (invoice) => {
        setSelectedInvoices((prevSelected) => {
            const isAlreadySelected = prevSelected.find(
                (selectedInvoice) =>
                    selectedInvoice.invoiceNumber === invoice.invoiceNumber
            );
            if (isAlreadySelected) {
                return prevSelected.filter(
                    (selectedInvoice) =>
                        selectedInvoice.invoiceNumber !== invoice.invoiceNumber
                );
            } else {
                return [...prevSelected, invoice];
            }
        });
    };

    const filterInvoicesByCompany = (invoices, company) => {
        return company
            ? invoices.filter((invoice) => invoice.userCompany === company)
            : invoices;
    };

    const handleSelectAll = (selectAll) => {
        const filteredInvoices = filterInvoicesByCompany(overDueInv, companyFilter);
        if (selectAll) {
            setSelectedInvoices(filteredInvoices);
            setUserEmail(filteredInvoices[0]?.user?.email);
        } else {
            setSelectedInvoices([]);
            setUserEmail("");
            setBillingAddress({})
        }
    };

    const numberOfSelectedInvoices = selectedInvoices.length;

    const handleDownload = () => {
        selectedInvoices.sort((a, b) => {
            return a.deliveredAt - b.deliveredAt;
        });
        console.log(
            "overDueInv",
            numberOfSelectedInvoices,
            companyCurrentTotalAmount,
            past30TotalAmount,
            past60TotalAmount,
            selectedInvoices
        );
    };

    /* *************** data table *************** */

    const ITEMS_PER_PAGE = 40;

    const headers = [
        { name: "", field: "checkBox", sortable: false },
        { name: "No#", field: "index", sortable: false },
        { name: "Invoice#", field: "invoiceNumber", sortable: true },
        { name: "Company", field: "userCompany", sortable: true },
        { name: "Inv Date", field: "deliveredAt", sortable: true },
        { name: "Over Due Days", field: "overDueDays", sortable: true },
        {
            name: "Original Amount",
            field: "orderTotal.cartSubtotal",
            sortable: true,
        },
        { name: "Balance", field: "payment", sortable: true },
    ];

    const invData = useMemo(() => {
        let computedOrders = filterInvoicesByCompany(
            // overDueInv.filter((invoice) => invoice.quickBooksInvID),
            overDueInv,
            companyFilter
        );

        // console.log("computedOrders", computedOrders);

        if (search) {
            computedOrders = computedOrders.filter(
                (orders) =>
                    orders.createdAt.toUpperCase().includes(search.toUpperCase()) ||
                    orders.purchaseNumber.toUpperCase().includes(search.toUpperCase()) ||
                    orders.userCompany?.toUpperCase().includes(search.toUpperCase()) ||
                    orders.deliverySite?.toUpperCase().includes(search.toUpperCase()) ||
                    orders.userName?.toUpperCase().includes(search.toUpperCase()) ||
                    String(orders.orderTotal.cartSubtotal)
                        .toUpperCase()
                        .includes(search.toUpperCase()) ||
                    orders.invoiceNumber?.toUpperCase().includes(search.toUpperCase()) ||
                    orders.userCompany?.toUpperCase().includes(search.toUpperCase()) ||
                    orders.adminNote?.toUpperCase().includes(search.toUpperCase()) ||
                    (
                        orders.user?.name.toUpperCase() +
                        " " +
                        orders.user?.lastName.toUpperCase()
                    ).includes(search.toUpperCase()) ||
                    orders.cartItems.some((cartItem) =>
                        cartItem.name?.toLowerCase().includes(search.toLowerCase())
                    )
            );
        }

        setTotalItems(computedOrders.length);
        const getNestedProperty = (obj, path) => {
            return path.split(".").reduce((acc, part) => acc && acc[part], obj);
        };

        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedOrders = computedOrders.sort((a, b) => {
                const fieldA = getNestedProperty(a, sorting.field);
                const fieldB = getNestedProperty(b, sorting.field);

                if (typeof fieldA === "number" && typeof fieldB === "number") {
                    return reversed * (fieldA - fieldB);
                } else if (typeof fieldA === "string" && typeof fieldB === "string") {
                    return reversed * fieldA.localeCompare(fieldB);
                } else {
                    return reversed * String(fieldA).localeCompare(String(fieldB));
                }
            });
        }

        return computedOrders.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [overDueInv, currentPage, search, sorting, companyFilter]);

    // console.log(filterInvoicesByCompany(overDueInv, companyFilter), invData);

    const openPDFInPopup = async (documentComponent, fileName) => {

        const firstInoviceCompany = selectedInvoices[0]?.userCompany;
        const allSameCompany = selectedInvoices.every(
            (invoice) => invoice.userCompany === firstInoviceCompany
        );

        if (!allSameCompany) {
            alert("Selected invoices must be from the same company.");
            return;
        }

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
                className="ctl_blue_button p-1"
                onClick={() => {
                    const sortedInvoices = [...selectedInvoices].sort((a, b) => {
                        const dateA = new Date(a.deliveredAt);
                        const dateB = new Date(b.deliveredAt);
                        return dateA - dateB;
                    });
    
                    let runningTotal = 0; 
                    const updatedInvoices = sortedInvoices.map(invoice => {
                        runningTotal += parseFloat(invoice.orderTotal.cartSubtotal);
                        return { ...invoice, overDueBalance: runningTotal.toFixed(2) };
                    });
    
                    openPDFInPopup(
                        React.cloneElement(documentComponent, { selectedInvoices: updatedInvoices }), 
                        fileName
                    );
                }}
                disabled={Object.keys(billingAddress).length === 0}
            >
                {loadingText}
            </Button>
        </div>
    );

    useEffect(() => {
        setUserEmail(selectedInvoices[0]?.user?.email);
    }, [selectedInvoices]);

    useEffect(() => {
        if (userEmail) {
            getdeliveryBooks(userEmail).then((deliveryBooks) => {
                setBillingAddress(deliveryBooks[0].sites[0].billingAddress);
            });
        }
    }, [userEmail]);

    const getdeliveryBooks = async (userEmail) => {
        const { data } = await axios.get(
            "/api/deliveryBooks/deliveryBook/" + userEmail
        );
        // console.log(data);
        return data;
    };

    // console.log(billingAddress, selectedInvoices);

    return (
        <>
            <div>
                <div class="d-flex justify-content-between">
                    <div>
                        Company: &nbsp;
                        <select
                            id="company-filter"
                            value={companyFilter}
                            onChange={(e) => { setCompanyFilter(e.target.value); setSelectedInvoices([]); setUserEmail(""); setBillingAddress({}); }}
                        >
                            <option value="">All Companies</option>
                            {uniqueCompanies.map((company, index) => (
                                <option key={index} value={company}>
                                    {company}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="search">
                        <Search
                            onSearch={(value) => {
                                setSearch(value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <button
                        type="button"
                        className="btn btn-outline-primary me-2 p-0 pe-1 ps-1"
                        onClick={() =>
                            handleSelectAll(
                                Object.keys(selectedInvoices).length !==
                                filterInvoicesByCompany(overDueInv, companyFilter).length
                            )
                        }
                    >
                        {Object.keys(selectedInvoices).length !==
                            filterInvoicesByCompany(overDueInv, companyFilter).length
                            ? "Select All"
                            : "Deselect All"}
                    </button>
                    {/* <button
                        type="button"
                        className="btn btn-outline-primary me-2 p-0 pe-1 ps-1"
                        onClick={() => handleDownload()}
                    >
                        Download Overdue Report
                    </button> */}
                    <PDFPopupButton
                        documentComponent={
                            <OverdueInvoicesPrint
                                selectedInvoices={selectedInvoices}
                                totalAmount={totalAmount}
                                billingAddress={billingAddress}
                                past30TotalAmount={past30TotalAmount}
                                past60TotalAmount={past60TotalAmount}
                                past90TotalAmount={past90TotalAmount}
                                companyCurrentTotalAmount={companyCurrentTotalAmount}
                            />
                        }
                        fileName={"IO"}
                        loadingText="Download Overdue Report"
                    />
                    <strong className="me-1 ms-2">Total Amount:</strong>$
                    {totalAmount.toLocaleString()}
                </div>

                <table className="table table-striped mt-2">
                    <TableHeader
                        headers={headers}
                        onSorting={(field, order) => setSorting({ field, order })}
                    />
                    <tbody>
                        {invData.map((invoice, idx) => (
                            <tr key={idx}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedInvoices.some(
                                            (selectedInvoice) =>
                                                selectedInvoice.invoiceNumber === invoice.invoiceNumber
                                        )}
                                        onChange={() => toggleInvoiceSelection(invoice)}
                                    />
                                </td>
                                <td>{idx + 1}</td>
                                <td
                                    style={{
                                        color:
                                            invoice.balance !== invoice.orderTotal.cartSubtotal
                                                ? "red"
                                                : "",
                                    }}
                                >
                                    {invoice.invoiceNumber}
                                </td>
                                <td>{invoice.userCompany}</td>
                                <td>{invoice.deliveredAt.substring(0, 10)}</td>
                                <td>
                                    {calculateDueInDays(invoice.deliveredAt, invoice.dueDays)}
                                </td>
                                <td>${invoice.orderTotal.cartSubtotal}</td>
                                <td>${invoice.balance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <PaginationPopUp
                    total={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </>
    );
};

export default InvoicesOverDuePageComponent;
