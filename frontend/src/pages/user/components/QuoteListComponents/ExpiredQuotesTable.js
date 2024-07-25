import { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination } from "../../../../components/DataTable";
import "./../invoicePDF.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const ExpiredQuotesTable = ({
  quotes,
  search,
  userReRquestQuote,
  refreshQuotes,
  deleteQuote,
}) => {
  /* sort table */
  // #region
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "status", order: "desc" });

  const ITEMS_PER_PAGE = 20;

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
      expiredQuotes: computedQuotes?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      ),
    };
  }, [quotes, currentPage, search, sorting]);
  // #endregion

  const expiredHeaders = [
    { name: "No#", field: "index", sortable: false },
    { name: "Quoted Name", field: "name", sortable: true },
    { name: "Product Name", field: "product.name", sortable: true },
    { name: "Status", field: "status", sortable: true },
    { name: "", field: "activity", sortable: false },
    { name: "", field: "delete", sortable: false },
  ];

  const handleReRequest = (quoteId) => {
    userReRquestQuote(quoteId)
      .then(() => {
        refreshQuotes();
      })
      .catch((err) => console.error("Error in userQuoteAction:", err));
  };

  const deleteHandler = async (quoteId) => {
    if (window.confirm("Are you sure?")) {
      deleteQuote(quoteId).then(() => {
        refreshQuotes();
      });
    }
  };

  return (
    <>
      <table className="table table-striped">
        <TableHeader
          headers={expiredHeaders}
          onSorting={(field, order) => setSorting({ field, order })}
        />
        <tbody>
          {quoteItems.expiredQuotes?.map((quoteItem, idx) => (
            <tr key={"expiredQuotes" + idx}>
              <td>{idx + 1} </td>
              <td>{quoteItem.name}</td>
              <td className="">{quoteItem.product?.name}</td>
              <td style={{ color: "#1e4881", fontWeight: "bold" }}>Expired</td>
              <td>
                <button
                  className="btn-sm btn-light w-100"
                  style={{
                    width: "48%",
                    border: "1px solid #1e4881",
                    borderRadius: "5px",
                    color: "#1e4881",
                  }}
                  onClick={() => handleReRequest(quoteItem._id)}
                >
                  Re-request
                </button>
              </td>
              {/* <td>
                <button
                  variant="danger"
                  className="btn-sm btn-light"
                  onClick={() => deleteHandler(quoteItem._id)}
                  style={{ border: "none" }}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {quotes.length === 0 && <div className="fs-3 m-2">No Quotes Found</div>}
      <Pagination
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default ExpiredQuotesTable;
