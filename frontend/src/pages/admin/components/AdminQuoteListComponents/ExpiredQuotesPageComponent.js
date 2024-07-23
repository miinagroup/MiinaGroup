import { Modal } from "react-bootstrap";
import { TableHeader, Pagination } from "../../../../components/DataTable";
import { useEffect, useState, useMemo } from "react";

import "./../invoicePDF.css";
import QuoteItemForQuotePageComponent from "../QuoteItemForQuotePageComponent";

//import { Tooltip } from '@mui/material';

const ExpiredQuotesPageComponent = ({
  quotes,
  deleteQuote,
  markAsProcessing,
  updateQuote,
  getQuote,
  search,
  getStatusColor,
  userQuoteAction,
  refreshQuotes,
}) => {

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "status", order: "desc" });

  const [actionFilter, setActionFilter] = useState("All Action");
  const [clientFilter, setClientFilter] = useState("All Clients");

  const actionOptions = useMemo(() => {
    const filteredQuotes = quotes.filter((quote) => {
      if (clientFilter === "All Clients") return true;
      return (quote.user?.name + " " + quote.user?.lastName) === clientFilter;
    });

    const availableActions = new Set(filteredQuotes.map((quote) => {
      if (quote.accepted === undefined) return "Waiting";
      if (quote.accepted === true) return "Accepted";
      if (quote.accepted === false) return "Declined";
    }));

    return ["All Action", ...availableActions];
  }, [quotes, clientFilter]);


  const clientOptions = useMemo(() => {
    const filteredQuotes = quotes.filter((quote) => {
      switch (actionFilter) {
        case "Waiting":
          return quote.accepted === undefined;
        case "Accepted":
          return quote.accepted === true;
        case "Declined":
          return quote.accepted === false;
        default:
          return true;
      }
    });

    const allClients = filteredQuotes.map((quote) => (quote.user?.name + " " + quote.user?.lastName) || "Unknown");
    return ["All Clients", ...new Set(allClients)];
  }, [quotes, actionFilter]);



  const ITEMS_PER_PAGE = 20;

  const expiredHeaders = [
    { name: "No#", field: "index", sortable: false },
    { name: "Client", field: "userName", sortable: true },
    { name: "Company", field: "user.company", sortable: true },
    { name: "Quoted Name", field: "quoteName", sortable: true },
    { name: "Name", field: "product.name", sortable: true },
    { name: "Price", field: "price", sortable: false },
    { name: "Expires in", field: "submittedAt", sortable: true },
    { name: "Action", field: "activity", sortable: false },
    { name: "", field: "delete", sortable: false },

  ];

  const calculateTimeUntilExpire = (expireDate) => {
    const today = new Date();
    const dueDate = new Date(expireDate);
    return dueDate.getTime() - today.getTime();
  };
  

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

    // filters
    computedQuotes = computedQuotes?.filter((quote) => {
      // Filter by action
      switch (actionFilter) {
        case "Waiting":
          if (quote.accepted !== undefined) return false;
          break;
        case "Accepted":
          if (quote.accepted !== true) return false;
          break;
        case "Declined":
          if (quote.accepted !== false) return false;
          break;
        default:
          break;
      }

      // Filter by client
      if (clientFilter !== "All Clients" && (quote.user?.name + " " + quote.user?.lastName) !== clientFilter) {
        return false;
      }

      return true;
    });




    const getNestedProperty = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      if (sorting.field === "submittedAt") {
        computedQuotes = computedQuotes.sort((a, b) => {
          const timeA = calculateTimeUntilExpire(a.expireDate);
          const timeB = calculateTimeUntilExpire(b.expireDate);
          return reversed * (timeA - timeB);
        });
      } else {
        computedQuotes = computedQuotes.sort((a, b) => {
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


    }

    return {
      expiredQuotes: computedQuotes?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      ),
    };
  }, [quotes, currentPage, search, sorting, actionFilter, clientFilter]);
  // #endregion


  const deleteHandler = async (quoteId) => {
    if (window.confirm("Are you sure?")) {
      deleteQuote(quoteId)
        .then(() => {
          refreshQuotes();
        })
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
    const diffHours = Math.ceil(timeDifference / (1000 * 3600)) + 15;
    if (diffDays === 0) {
      return <span style={{ color: `${Math.abs(diffDays) > 1 ? '' : 'red'}`, fontWeight: "bold" }}>{diffHours} hours</span>;
    } else if (diffDays > 0) {
      return <span style={{ color: `${Math.abs(diffDays) > 7 ? '' : 'red'}` }}>{diffDays} days</span>
    } else {
      return <span style={{ color: "#1e4881" }}>Expired</span>;
    }
  };



  useEffect(() => {
    setCurrentPage(1);
  }, [actionFilter, clientFilter]);


  return (
    <>
      <div className="d-flex justify-content-between m-1 me-3" style={{ float: "right" }}>
        {/* <label htmlFor="clientFilter" className="ms-2 me-1">Client: </label> */}
        <select
          id="clientFilter"
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          className="form-select me-2"
        >
          {clientOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* <label htmlFor="actionFilter" className="ms-2 me-1">Action: </label> */}
        <select
          id="actionFilter"
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="form-select"
        >
          {actionOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <table className="table table-striped">
        <TableHeader
          headers={expiredHeaders}
          onSorting={(field, order) => setSorting({ field, order })}
        />
        <tbody>
          {quoteItems?.expiredQuotes?.map((quoteItem, idx) => (
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
                {quoteItem.user !== null ? (
                  <>{quoteItem.user.company}</>
                ) : null}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
              >
                {quoteItem.name}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {quoteItem.product
                  ? quoteItem.product.name
                  : quoteItem.name}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {quoteItem.product &&
                  quoteItem.product.displayPrice &&
                  quoteItem.product.displayPrice !== 0
                  ? `$ ${quoteItem.product.stock[0]?.price.toFixed(2)}`
                  : ""}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {calculateDueInDays(quoteItem.expireDate)}
              </td>
              <td
                style={{
                  color: quoteItem.accepted
                    ? "green"
                    : quoteItem.accepted === undefined
                      ? "black"
                      : "red",
                }}
              >
                {quoteItem.accepted === undefined
                  ? "Waiting"
                  : quoteItem.accepted
                    ? "Accepted"
                    : "Declined"}
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
          userQuoteAction={userQuoteAction}
          refreshQuotes={refreshQuotes}
        />
      </Modal>
    </>
  );
};

export default ExpiredQuotesPageComponent;
