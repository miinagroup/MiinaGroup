import { Modal, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { TableHeader, Pagination } from "../../../../components/DataTable";
import { useEffect, useState, useMemo } from "react";
import ClientQuote from "../../../../components/Pdfs/ClientQuote";
import { pdf } from "@react-pdf/renderer";
import { Link } from "react-router-dom";
import "./../invoicePDF.css";
import QuoteItemForQuotePageComponent from "../QuoteItemForQuotePageComponent";
import Spinner from "react-bootstrap/Spinner";

//import { Tooltip } from '@mui/material';

const CompletedQuotesPageComponent = ({
  quotes,
  deleteQuote,
  markAsProcessing,
  updateQuote,
  getQuote,
  search,
  getStatusColor,
  userQuoteAction,
  refreshQuotes,
  handleDownloadQuotePDF,
  getQuotes,
}) => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "expireDate", order: "desc" });
  const [quoteListProducts, setQuoteListProducts] = useState([]);
  const [actionFilter, setActionFilter] = useState("All Action");
  const [clientFilter, setClientFilter] = useState("All Clients");
  const [totalAmount, setTotalAmount] = useState(0);
  const [quoteExpiryDateList, setQuoteExpiryDateList] = useState([]);
  const [quoteExpiryDate, setQuoteExpiryDate] = useState();

  const actionOptions = useMemo(() => {
    const filteredQuotes = quotes.filter((quote) => {
      if (clientFilter === "All Clients") return true;
      return quote.user?.name + " " + quote.user?.lastName === clientFilter;
    });

    const availableActions = new Set(
      filteredQuotes.map((quote) => {
        if (quote.accepted === undefined) return "Waiting";
        if (quote.accepted === true) return "Accepted";
        if (quote.accepted === false) return "Declined";
      })
    );

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

    const allClients = filteredQuotes.map(
      (quote) => quote.user?.name + " " + quote.user?.lastName || "Unknown"
    );
    return ["All Clients", ...new Set(allClients)];
  }, [quotes, actionFilter]);

  const ITEMS_PER_PAGE = 20;

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
          quotes.quoteNumber?.toUpperCase().includes(search.toUpperCase()) ||
          quotes.product?.name?.toUpperCase().includes(search.toUpperCase()) ||
          ""
      );
      setCurrentPage(1);
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
      if (
        clientFilter !== "All Clients" &&
        quote.user?.name + " " + quote.user?.lastName !== clientFilter
      ) {
        return false;
      }

      return true;
    });

    const getNestedProperty = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      if (sorting.field === "expireDate") {
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
      completedQuotes: computedQuotes?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      ),
    };
  }, [quotes, currentPage, search, sorting, actionFilter, clientFilter]);

  /* *********** select quotes ************ */
  // #region
  const [selectedQuotes, setSelectedQuotes] = useState([]);

  const handleQuoteSelectionChange = (quote, isChecked) => {
    if (isChecked) {
      if (!selectedQuotes.some((q) => q._id === quote._id)) {
        setSelectedQuotes([...selectedQuotes, quote]);
      }
    } else {
      setSelectedQuotes(selectedQuotes.filter((q) => q._id !== quote._id));
    }
  };
  //console.log("Selected Quotes", selectedQuotes);

  // select all accepted quotes
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedQuotes(quoteItems.completedQuotes);
    } else {
      setSelectedQuotes([]);
    }
  };

  const isAllSelected = () => {
    const acceptedQuotes = quoteItems.completedQuotes;
    return (
      acceptedQuotes.length > 0 &&
      acceptedQuotes.every((quote) =>
        selectedQuotes.some((selectedQuote) => selectedQuote._id === quote._id)
      )
    );
  };

  // #endregion

  const completedHeaders = [
    {
      name: (
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={isAllSelected()}
        />
      ),
      field: "selectAll",
      sortable: false,
    },
    { name: "No#", field: "index", sortable: false },
    { name: "Client", field: "userName", sortable: true },
    { name: "Company", field: "user.company", sortable: true },
    { name: "Quoted Name", field: "quoteName", sortable: true },
    { name: "Name", field: "product.name", sortable: true },
    { name: "Product Price", field: "price", sortable: false },
    { name: "Expires in", field: "expireDate", sortable: true },
    { name: "Action", field: "accepted", sortable: true },
    { name: "", field: "delete", sortable: false },
  ];



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
    const diffHours = Math.ceil(timeDifference / (1000 * 3600)) + 15;
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
    } else {
      return <span style={{ color: "#1e4881" }}>Expired</span>;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [actionFilter, clientFilter]);

  const columnWidths = [
    "3%",
    "3%",
    "10%",
    "10%",
    "20%",
    "32%",
    "7%",
    "5%",
    "5%",
    "5%",
  ];

  /* ***************** quote pdf download ***************** */

  // #region
  const [base64Data, setBase64Data] = useState([]);
  const [downloadingQuotePDF, setDownloadingQuotePDF] = useState(false);

  // to email
  const generatePdf = async () => {
    try {
      const blob = await pdf(
        <ClientQuote
          selectedQuotes={selectedQuotes}
          quoteListProducts={quoteListProducts}
          totalAmount={totalAmount}
          quoteExpiryDate={quoteExpiryDate}
          quoteNumber={quoteNumber}
        />
      ).toBlob();

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setBase64Data({
          base64data,
        });
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  const [quoteNumber, setQuoteNumber] = useState(undefined);
  const [currentQuoteNumber, setCurrentQuoteNumber] = useState(undefined);

  const handleGetQuoteNumber = async () => {
    return getQuotes().then((quotes) => {
      const quoteNumbers = quotes
        .filter((quote) => quote.quoteNumber)
        .map((quote) => quote.quoteNumber);

      const newQuoteNumbers = quoteNumbers.map((item) =>
        item.replace(/\D/g, "")
      );
      if (newQuoteNumbers.length > 0) {
        setQuoteNumber("Q" + (Math.max(...newQuoteNumbers) + 1));
        setCurrentQuoteNumber("Q" + Math.max(...newQuoteNumbers));
        return "Q" + (Math.max(...newQuoteNumbers) + 1);
      }
      return undefined;
    });
  };

  const handleUpdateQuoteNumber = async (
    quoteNumber,
    quoteIds,
    userEmail,
    base64Data
  ) => {
    return handleDownloadQuotePDF(
      quoteNumber,
      quoteIds,
      userEmail,
      base64Data
    ).then((response) => {
      if (
        response &&
        response.message === "Quotes number have been updated!!!"
      ) {
        refreshQuotes();
        return response;
      }
      throw new Error("Failed to update quote numbers");
    });
  };

  const handlePDFDownload = async (numberFromInput) => {
    // open pdf in new window and download pdf
    console.log("numberFromInput", numberFromInput);
    const documentComponent = (
      <ClientQuote
        selectedQuotes={selectedQuotes}
        quoteListProducts={quoteListProducts}
        totalAmount={totalAmount}
        quoteExpiryDate={quoteExpiryDate}
        quoteNumber={numberFromInput}
      />
    );

    const blob = await pdf(documentComponent).toBlob();
    const url = URL.createObjectURL(blob);

    const width = 1200;
    const height = 800;
    const left = window.innerWidth / 2 - width / 2 + window.screenX;
    const top = window.innerHeight / 2 - height / 2 + window.screenY;

    const pdfWindow = window.open(
      url,
      "_blank",
      `scrollbars=yes,toolbar=no,location=no,width=${width},height=${height},top=${top},left=${left}`
    );

    if (pdfWindow) {
      pdfWindow.document.title = `${numberFromInput}.pdf`;
      pdfWindow.addEventListener("load", () => {
        pdfWindow.document.title = `${numberFromInput}.pdf`;
        const a = pdfWindow.document.createElement("a");
        a.href = url;
        a.download = `${numberFromInput}.pdf`;
        a.click();
      });
    }
  };

  // console.log(selectedQuotes);

  const openPDFInPopup = async () => {
    setDownloadingQuotePDF(true);
    const firstCustomerId = selectedQuotes[0].user._id;
    const allSameCustomer = selectedQuotes.every(
      (quote) => quote.user._id === firstCustomerId
    );

    if (!allSameCustomer) {
      alert("Selected quotes must be from the same client.");
      return;
    }

    if (quoteNumber === undefined) {
      alert("Please try again.");
      return;
    }

    const quotesWithNumbers = selectedQuotes.filter(
      (quote) => quote.quoteNumber !== undefined
    );

    const allSameQuoteNumber =
      quotesWithNumbers.length > 0 &&
      quotesWithNumbers.every(
        (quote, _, arr) => quote.quoteNumber === arr[0].quoteNumber
      );

    console.log("allSameQuoteNumber", allSameQuoteNumber);

    if (allSameQuoteNumber) {
      console.log("Am i here?");
      handlePDFDownload(selectedQuotes[0].quoteNumber);
      setDownloadingQuotePDF(false);
    } else {
      try {
        console.log("Am i here else?");
        const updateResponse = await handleUpdateQuoteNumber(
          quoteNumber,
          selectedQuotes.map((quote) => quote._id),
          selectedQuotes[0].userEmail,
          base64Data
        );
        console.log("updateResponse", updateResponse);
        if (updateResponse.message === "Quotes number have been updated!!!") {
          handlePDFDownload(quoteNumber);
          setQuoteNumber(quoteNumber);
        }
      } catch (error) {
        alert(
          "An error occurred while download pdf, please refresh page and try again."
        );
        console.error(error);
      } finally {
        setDownloadingQuotePDF(false);
      }
    }
  };

  const PDFPopupButton = ({ loadingText }) => (
    <div className="ms-0 me-2" style={{ float: "left" }}>
      <Button
        hidden={selectedQuotes?.length < 1}
        className="ctl_blue_button"
        onClick={() => openPDFInPopup()}
      >
        {downloadingQuotePDF ? (
          <>
            Downloading...
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            {loadingText}
            <i className="bi bi-file-earmark-pdf-fill"></i>
          </>
        )}
      </Button>
    </div>
  );

  useEffect(() => {
    setTotalAmount(0);
    quoteListProducts.length = 0;
    quoteExpiryDateList.length = 0;
    selectedQuotes.map((data, index) => {
      if (data.product !== null)
        setQuoteListProducts((current) => [...current, data.product]);
      setQuoteExpiryDateList((current) => [...current, data.expireDate]);
    });
  }, [selectedQuotes]);

  useEffect(() => {
    let amountTotal = 0;
    quoteListProducts.map((item, idx) => {
      amountTotal += item.stock[0].price;
    });
    setTotalAmount(amountTotal);
  }, [quoteListProducts]);

  useEffect(() => {
    const sorted = quoteExpiryDateList?.sort(
      (a, b) => new Date(a) - new Date(b)
    );
    setQuoteExpiryDate(sorted[0]);
  }, [quoteExpiryDateList]);

  useEffect(() => {
    handleGetQuoteNumber();
    generatePdf();
  }, [
    selectedQuotes,
    quoteListProducts,
    quoteExpiryDateList,
    totalAmount,
    quotes,
  ]);

  // console.log("quoteNumber", quoteNumber);
  // console.log("base64Data", base64Data);
  // console.log("selectedQuotes", selectedQuotes);
  // console.log(totalAmount);
  // #endregion

  return (
    <>
      <div
        className="d-flex justify-content-between m-1 me-3"
        style={{ float: "right" }}
      >
        <select
          id="clientFilter"
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          className="form-select me-2"
        >
          {clientOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          id="actionFilter"
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="form-select"
        >
          {actionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-striped">
        <TableHeader
          headers={completedHeaders}
          onSorting={(field, order) => setSorting({ field, order })}
          widths={columnWidths}
        />
        <tbody>
          {quoteItems.completedQuotes?.map((quoteItem, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedQuotes.some((q) => q._id === quoteItem._id)}
                  onChange={(e) =>
                    handleQuoteSelectionChange(quoteItem, e.target.checked)
                  }
                />
              </td>
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
              <td onClick={() => handleShow(quoteItem._id)}>
                {quoteItem.name}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {quoteItem.product ? quoteItem.product.name : quoteItem.name}
              </td>
              <td
                onClick={() => handleShow(quoteItem._id)}
                style={{ cursor: "pointer" }}
              >
                {quoteItem.product &&
                quoteItem.product?.displayPrice &&
                quoteItem.product?.displayPrice !== 0
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

      {/* <Button
        className="CTL_btn p-1 ps-2 pe-2 m-2"
        onClick={() => handlePDFDownload()}
        hidden={selectedQuotes?.length < 1}
      >
        Download Quote <i class="bi bi-file-earmark-pdf-fill"></i>
      </Button> */}

      <PDFPopupButton
        fileName={"Quote"}
        loadingText="Download Quote"
        // onClick={() => openPDFInPopup()}
      />
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
          handleClose={handleClose}
        />
      </Modal>
    </>
  );
};

export default CompletedQuotesPageComponent;
