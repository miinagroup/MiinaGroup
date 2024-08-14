import { Modal } from "react-bootstrap";
import { TableHeader, Pagination, Search } from "../../../../components/DataTable";
import { useEffect, useState, useMemo } from "react";

import "./../invoicePDF.css";
import QuoteItemForQuotePageComponent from "../QuoteItemForQuotePageComponent";

//import { Tooltip } from '@mui/material';

const ProcessingQuotesPageComponent = ({
  quotes,
  deleteQuote,
  markAsProcessing,
  updateQuote,
  getQuote,
  refreshQuotes,
  search,
  getStatusColor,
  adminDuplicateQuote,
}) => {

  /* sort table */
  // #region
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "status", order: "desc" });

  const ITEMS_PER_PAGE = 20;

  const columnWidths = ["4%", "10", "12%", "30%", "8%", "5%", "8%", "10%", "8%", "5%"];

  const processingHeaders = [
    { name: "No#", field: "index", sortable: false },
    { name: "Client", field: "name", sortable: true },
    { name: "Company", field: "userCompany", sortable: true },
    { name: "Name", field: "name", sortable: true },
    { name: "Product", field: "existingProduct", sortable: true },
    { name: "Qty", field: "quantity", sortable: true },
    { name: "Status", field: "status", sortable: true },
    { name: "Quoted At", field: "submittedAt", sortable: true },
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
          (quotes.product?.name?.toUpperCase().includes(search.toUpperCase()) || "")
      );
      setCurrentPage(1)
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
      processingQuotes: computedQuotes?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      ),
    };
  }, [quotes, currentPage, search, sorting]);
  // #endregion



  const deleteHandler = async (quoteId) => {
    if (window.confirm("Are you sure?")) {
      deleteQuote(quoteId)
        .then(() => {
          refreshQuotes();
        })
    }
  };

  const receivedHandler = async (quoteId) => {
    markAsProcessing(quoteId)
      .then(() => {
        refreshQuotes();
      })
      .catch((err) => console.error("Error in userQuoteAction:", err));
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


  /* *********** Date *********** */
  const calculateSubmittedDays = (createAt) => {
    const today = new Date();
    const dueDate = new Date(createAt);
    const timeDifference = today.getTime() - dueDate.getTime();
    const diffDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    if (diffDays > 0) {
      return <span style={{ color: `${Math.abs(diffDays) < 2 ? '' : 'red'}`, fontWeight: "bold" }}>{`${diffDays}`}</span>
    }
  };

  return (
    <>
      <table className="table table-striped admin_processing_quotes_table">
        <TableHeader
          headers={processingHeaders}
          onSorting={(field, order) => setSorting({ field, order })}
          widths={columnWidths}
        />
        <tbody>
          {quoteItems.processingQuotes?.map((quoteItem, idx) => (
            <tr key={idx} style={{ backgroundColor: quoteItem.repeatPurchase.length > 0 ? "#f0ead2" : "", }}>
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
              <td className="table_overflow_hidden"
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {quoteItem.user !== null ? (
                  <>{quoteItem.user.company}</>
                ) : null}
              </td>
              <td className="table_overflow_hidden"
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {quoteItem.product
                  ? quoteItem.product.name
                  : quoteItem.name}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{
                  cursor: "pointer",
                  color: quoteItem.existingProduct ? "green" : "red",
                }}
              >
                {quoteItem.existingProduct ? "Existing" : "New"}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{
                  cursor: "pointer",
                }}
              >
                {quoteItem.quantity}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{
                  color: getStatusColor(quoteItem.status),
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {quoteItem.status}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {quoteItem.submittedAt?.substring(0, 10)}{" ("}{calculateSubmittedDays(quoteItem.submittedAt)}{")"}
              </td>

              <td>
                {quoteItem.status === "Received" ? (
                  <button
                    variant="danger"
                    className="btn-sm btn-light"
                    onClick={() => receivedHandler(quoteItem._id)}
                    style={{
                      width: "100%",
                      border: "1px solid #1e4881",
                      borderRadius: "5px",
                      color: "#1e4881",
                    }}
                  >
                    Process
                  </button>
                ) : (
                  <button
                    variant="danger"
                    className="btn-sm btn-light"
                    onClick={() => handleShow(quoteItem._id)}
                    style={{
                      width: "100%",
                      border: "1px solid #1e4881",
                      borderRadius: "5px",
                      color: "#1e4881",
                    }}
                  >
                    Edit
                  </button>
                )}
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
      {quoteItems.processingQuotes.length === 0 && (
        <div className="fs-3 m-2">No Processing Quotes Found</div>
      )}

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
          adminDuplicateQuote={adminDuplicateQuote}
          handleClose={handleClose}
          refreshQuotes={refreshQuotes}
        />
      </Modal>
    </>
  );
};

export default ProcessingQuotesPageComponent;
