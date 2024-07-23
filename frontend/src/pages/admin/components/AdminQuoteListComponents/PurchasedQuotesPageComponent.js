import { Modal } from "react-bootstrap";
import {
  TableHeader,
  Pagination,
  Search,
} from "../../../../components/DataTable";
import { useEffect, useState, useMemo } from "react";

import "./../invoicePDF.css";
import QuoteItemForQuotePageComponent from "../QuoteItemForQuotePageComponent";

//import { Tooltip } from '@mui/material';

const PurchasedQuotesPageComponent = ({
  quotes,
  deleteQuote,
  markAsProcessing,
  updateQuote,
  getQuote,
  search,
  getStatusColor,
  refreshQuotes,
}) => {
  /* sort table */
  // #region
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "status", order: "desc" });

  const ITEMS_PER_PAGE = 20;

  const purchasedHeaders = [
    { name: "No#", field: "index", sortable: false },
    { name: "Client", field: "userName", sortable: true },
    { name: "Company", field: "userCompany", sortable: true },
    { name: "Name", field: "name", sortable: true },
    { name: "Price", field: "price", sortable: false },
    // { name: "Status", field: "status", sortable: true },
    { name: "Expires in", field: "submittedAt", sortable: true },
    { name: "Action", field: "activity", sortable: false },
    { name: "", field: "delete", sortable: false },
  ];

  const quoteItems = useMemo(() => {
    let computedQuotes = quotes;

    if (search) {
      computedQuotes = computedQuotes?.filter(
        (quotes) =>
          quotes.submittedAt?.toUpperCase().includes(search.toUpperCase()) ||
          quotes.ctlsku?.toUpperCase().includes(search.toUpperCase()) ||
          quotes.name?.toUpperCase().includes(search.toUpperCase()) ||
          quotes.product?.name?.toUpperCase().includes(search.toUpperCase()) ||
          ""
      );
      setCurrentPage(1);
    }

    setTotalItems(computedQuotes?.length);

    //Sorting products
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedQuotes = computedQuotes?.sort((a, b) => {
        const fieldA = a[sorting.field];
        const fieldB = b[sorting.field];

        if (typeof fieldA === "number" && typeof fieldB === "number") {
          return reversed * (fieldA - fieldB);
        } else if (typeof fieldA === "string" && typeof fieldB === "string") {
          return reversed * fieldA.localeCompare(fieldB);
        } else {
          return reversed * String(fieldA).localeCompare(String(fieldB));
        }
      });
    }

    return {
      purchasedQuotes: computedQuotes?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      ),
    };
  }, [quotes, currentPage, search, sorting]);
  // #endregion

  const deleteHandler = async (quoteId) => {
    if (window.confirm("Are you sure?")) {
      deleteQuote(quoteId).then(() => {
        refreshQuotes();
      });
    }
  };

  /* *************** Preview Quote *************** */
  const [show, setShow] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (quoteId) => {
    setSelectedQuoteId(quoteId);
    setShow(true);
  };

  /* *********** Expire Date *********** */

  const calculateDueInDays = (expireDate) => {
    const today = new Date();
    const dueDate = new Date(expireDate);
    const timeDifference = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const diffHours = Math.ceil(timeDifference / (1000 * 3600)) + 9;
    if (diffDays === 0) {
      return (
        <span
          style={{
            color: `${Math.abs(diffDays) > 1 ? "" : "red"}`,
            fontWeight: "bold",
          }}
        >
          {diffHours} hours
        </span>
      );
    } else if (diffDays > 0) {
      return (
        <span style={{ color: `${Math.abs(diffDays) > 7 ? "" : "red"}` }}>
          {diffDays} days
        </span>
      );
    }
  };

  return (
    <>
      <table className="table table-striped">
        <TableHeader
          headers={purchasedHeaders}
          onSorting={(field, order) => setSorting({ field, order })}
        />
        <tbody>
          {quoteItems.purchasedQuotes?.map((quoteItem, idx) => (
            <tr key={idx}>
              <td>{idx + 1} </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {quoteItem.user !== null ? (
                  <>
                    {quoteItem.user.name} {quoteItem.user.lastName}
                  </>
                ) : null}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {quoteItem.user !== null ? <>{quoteItem.user.company}</> : null}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{
                  cursor: "pointer",
                  color:
                    quoteItem.product?.category === "QUOTE" ||
                    quoteItem.product?.category === "CLIENTQUOTE"
                      ? "red"
                      : "black",
                }}
              >
                {quoteItem.product ? quoteItem.product.name : quoteItem.name}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {quoteItem.product &&
                quoteItem.product.displayPrice &&
                quoteItem.product.displayPrice !== 0
                  ? `$ ${quoteItem.product.stock[0].price.toFixed(2)}`
                  : ""}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {calculateDueInDays(quoteItem.expireDate)}
              </td>
              <td
                className="fw-bold text-success"
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                Purchased
              </td>
              <td>
                <button
                  variant="danger"
                  className="btn-sm btn-light"
                  onClick={() => deleteHandler(quoteItem._id)}
                  style={{ border: "none" }}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <Modal show={show} onHide={handleClose} className="order_preview_items">
        <QuoteItemForQuotePageComponent
          id={selectedQuoteId}
          updateQuote={updateQuote}
          getQuote={getQuote}
          markAsProcessing={markAsProcessing}
          getStatusColor={getStatusColor}
        />
      </Modal>
    </>
  );
};

export default PurchasedQuotesPageComponent;
