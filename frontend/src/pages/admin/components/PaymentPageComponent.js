import React, { useState, useMemo } from "react";
import { TableHeader, PaginationPopUp, Search } from "../../../components/DataTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./invoicePDF.css";

const PaymentPageComponent = ({ unPaidInv, refreshOrders }) => {
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "invoiceNumber", order: "asc" });
    const [companyFilter, setCompanyFilter] = useState("");

    const [selectedInvoices, setSelectedInvoices] = useState({});
    const [editableAmounts, setEditableAmounts] = useState({});
    const [selectedDate, setSelectedDate] = useState("");
    const [showSelected, setShowSelected] = useState(false);


    const navigate = useNavigate();

    const uniqueCompanies = useMemo(() => {
        const companyNames = new Set(
            unPaidInv.map((invoice) => invoice.userCompany)
        );
        return Array.from(companyNames);
    }, [unPaidInv]);

    const totalAmount = useMemo(() => {
        return Object.values(selectedInvoices)
            .filter(Boolean)
            .reduce((sum, invoice) => {
                const amount =
                    parseFloat(editableAmounts[invoice.quickBooksInvID]) ||
                    invoice.orderTotal.cartSubtotal;
                return sum + amount;
            }, 0);
    }, [selectedInvoices, editableAmounts]);

    const toggleInvoiceSelection = (invoice) => {
        setSelectedInvoices((prevSelected) => ({
            ...prevSelected,
            [invoice.quickBooksInvID]: !prevSelected[invoice.quickBooksInvID]
                ? invoice
                : undefined,
        }));
    };

    const handleAmountChange = (quickBooksInvID, value) => {
        setEditableAmounts((prevAmounts) => ({
            ...prevAmounts,
            [quickBooksInvID]: value,
        }));
    };

    const [paymentBtnMessage, setPaymentBtnMessage] = useState("Submit");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selected = Object.values(selectedInvoices).filter(Boolean);

        if (selected.length === 0) {
            alert("No invoices selected.");
            return;
        }

        const firstCustomerId = selected[0].quickBooksCustomerId;
        const allSameCustomer = selected.every(
            (invoice) => invoice.quickBooksCustomerId === firstCustomerId
        );

        if (!allSameCustomer) {
            alert("Selected invoices must be from the same company.");
            return;
        }

        const invoices = selected.map((invoice) => ({
            quickBooksInvID: invoice.quickBooksInvID,
            invoiceID: invoice._id,
            quickBooksCustomerId: invoice.quickBooksCustomerId,
            amount:
                parseFloat(editableAmounts[invoice.quickBooksInvID]) ||
                invoice.orderTotal.cartSubtotal,
        }));

        const submission = {
            date: selectedDate,
            invoices: invoices,
            quickBooksCustomerId: firstCustomerId,
            totalAmount: totalAmount,
        };
        // console.log(submission);
        try {
            setPaymentBtnMessage("Submitting...");

            const response = await axios.post(
                "/api/quickBooks/processPayment",
                submission
            );
            // console.log(response);

            if (response.status === 200) {
                setPaymentBtnMessage("Payment Made Success!!!");
                refreshOrders();
                // setCompanyFilter("");
                setSearch("");
                setSelectedInvoices({});
                setEditableAmounts({});
                setSelectedDate("");
                // setShowSelected(false);
                // setPaymentBtnMessage("Submit");

                setTimeout(() => {
                setPaymentBtnMessage("Submit");
                // navigate("/admin/invoices");
                }, 1000);
            }
        } catch (error) {
            console.error("There was an error processing the payment", error);
        }
    };

    /* data table */

    // #region
    const ITEMS_PER_PAGE = 60;

    const headers = [
        { name: "", field: "checkBox", sortable: false },
        { name: "No#", field: "index", sortable: false },
        { name: "Invoice#", field: "invoiceNumber", sortable: true },
        { name: "Company", field: "userCompany", sortable: true },
        { name: "Inv Date", field: "orderTotal.cartSubtotal", sortable: true },
        {
            name: "Original Amount",
            field: "orderTotal.cartSubtotal",
            sortable: true,
        },
        { name: "Payment", field: "orderTotal.cartSubtotal", sortable: true },
    ];

    const invData = useMemo(() => {
        let computedOrders = unPaidInv;
        if (companyFilter) {
            computedOrders = computedOrders.filter(
                (invoice) => invoice.userCompany === companyFilter
            );
        } else if (showSelected === true) {
            computedOrders = computedOrders.filter(
                (invoice) => selectedInvoices[invoice.quickBooksInvID]
            );
        }

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
    }, [unPaidInv, currentPage, search, sorting, companyFilter, showSelected]);

    // #endregion


    // select all
    const handleSelectAll = (selectAll) => {
        if (selectAll) {
            const newSelectedInvoices = {};
            unPaidInv.forEach((invoice) => {
                newSelectedInvoices[invoice.quickBooksInvID] = invoice;
            });
            setSelectedInvoices(newSelectedInvoices);
        } else {
            setSelectedInvoices({});
        }
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div class="d-flex justify-content-between">
                    <div className="date-selector">
                        <label htmlFor="invoice-date">Payment Date: </label>
                        <input
                            type="date"
                            id="invoice-date"
                            value={selectedDate}
                            className="ms-3"
                            onChange={(e) => setSelectedDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <select
                            id="company-filter"
                            value={companyFilter}
                            onChange={(e) => setCompanyFilter(e.target.value)}
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
                                        checked={!!selectedInvoices[invoice.quickBooksInvID]}
                                        onChange={() => toggleInvoiceSelection(invoice)}
                                    />
                                </td>
                                <td>{idx + 1}</td>
                                <td>{invoice.invoiceNumber}</td>
                                <td>{invoice.userCompany}</td>
                                <td>{invoice.createdAt.substring(0, 10)}</td>
                                <td>${invoice.orderTotal.cartSubtotal}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={
                                            editableAmounts[invoice.quickBooksInvID] ||
                                            invoice.orderTotal.cartSubtotal.toFixed(2)
                                        }
                                        onChange={(e) =>
                                            handleAmountChange(
                                                invoice.quickBooksInvID,
                                                e.target.value
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="QBs_Payment_total_amount mb-3 d-flex align-items-center">
                    <button
                        type="button"
                        className="btn btn-outline-primary me-2 p-0 pe-1 ps-1"
                        onClick={() => handleSelectAll(Object.keys(selectedInvoices).length !== unPaidInv.length)}
                    >
                        {Object.keys(selectedInvoices).length !== unPaidInv.length ? 'Select All' : 'Deselect All'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary me-2 p-0 pe-1 ps-1"
                        onClick={() => setShowSelected(!showSelected)}
                    >
                        {showSelected ? 'Show All' : 'Show Selected'}
                    </button>
                    <strong className="me-1">Total Amount:</strong>${totalAmount.toLocaleString()}
                </div>
                <PaginationPopUp
                    total={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
                <div className="d-flex justify-content-end w-100">
                    <button
                        type="submit"
                        className="QBs_Payment_btn btn CTL_btn btn-primary"
                        disabled={paymentBtnMessage === "Submitting..." || paymentBtnMessage === "Payment Made Success!!!"}
                    >
                        {paymentBtnMessage}
                    </button>
                </div>


            </form>
        </>
    );
};

export default PaymentPageComponent;
