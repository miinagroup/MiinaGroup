import { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination } from "../../../../components/DataTable";
import "./../invoicePDF.css";

const ProcessingQuotesTable = ({
  quotes,
  getStatusColor,
  search,
  loadingQuotes,
  refreshQuotes,
  deleteQuote
}) => {
  //Archived Quotes
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "status", order: "desc" });

  const ITEMS_PER_PAGE = 20;

  const columnWidths = ["10%", "60%", "15%", "15%"];

  const processingHeaders = [
    { name: "No#", field: "index", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Status", field: "status", sortable: true },
    { name: "Submitted Date", field: "submittedAt", sortable: true },
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
    const getNestedProperty = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedQuotes = computedQuotes.sort((a, b) => {
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
    }

    return {
      processingQuotes: computedQuotes?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      ),
    };
  }, [quotes, currentPage, search, sorting]);

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
          headers={processingHeaders}
          onSorting={(field, order) => setSorting({ field, order })}
          widths={columnWidths}
        />
        <tbody>
          {quoteItems.processingQuotes?.map((quoteItem, idx) => (
            <tr key={"processingQuotes" + idx}>
              <td>{idx + 1} </td>
              <td>
                {quoteItem.product ? quoteItem.product.name : quoteItem.name}
              </td>
              <td
                style={{
                  color: getStatusColor(quoteItem.status),
                  fontWeight: "bold",
                }}
              >
                {quoteItem.status}
              </td>
              <td>{quoteItem.submittedAt?.substring(0, 10)}</td>
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
      {quotes.length === 0 && (
        <div className="fs-3 m-2">No Quotes Found</div>
      )}

      <Pagination
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default ProcessingQuotesTable;
