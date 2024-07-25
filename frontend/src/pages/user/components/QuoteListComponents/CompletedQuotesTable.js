import { useEffect, useState, useMemo } from "react";
import { addToCart } from "../../../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { TableHeader, Pagination } from "../../../../components/DataTable";
import { Modal, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import "./../invoicePDF.css";
import QuoteProductPreviewComponent from "./QuoteProductPreviewComponent";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import ClientQuote from "../../../../components/Pdfs/ClientQuote";

const CompletedQuotesTable = ({
  quotes,
  getStatusColor,
  search,
  userQuoteAction,
  loadingQuotes,
  refreshQuotes,
  deleteQuote,
  handleDownloadQuotePDF,
  getQuotes,
}) => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "status", order: "desc" });
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quoteListProducts, setQuoteListProducts] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [quoteExpiryDate, setQuoteExpiryDate] = useState()
  const [quoteExpiryDateList, setQuoteExpiryDateList] = useState([])

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
          return reversed * String(fieldA).localeCompare(String(fieldB));
        }
      });
    }

    return {
      completedQuotes: computedQuotes?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      ),
    };
  }, [quotes, currentPage, search, sorting]);

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

  const handlePDFDownload = () => {
    console.log("selectedQuotes", selectedQuotes);
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
    { name: "Quoted Name", field: "name", sortable: true },
    { name: "Product Name", field: "product.name", sortable: true },
    { name: "Price", field: "price", sortable: false },
    { name: "Status", field: "status", sortable: true },
    { name: "Expires in", field: "submittedAt", sortable: true },
    { name: "", field: "activity", sortable: false },
    { name: "", field: "delete", sortable: false },
  ];

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
    }
  };

  const toggleModal = (productId) => {
    if (!showModal) {
      setShowModal(true);
      axios
        .get(`/api/products/get-one/${productId}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    } else {
      setProduct(null);
      setShowModal(false);
      setLoading(true);
    }
  };


  const [accpeting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);

  const handleUserAcceptQuote = (quote, accept, idx) => {
    if (idx === 1) {
      setAccepting(true);
    } else if (idx === 2) {
      setDeclining(true);
    }
    userQuoteAction(quote, accept)
      .then(() => {
        refreshQuotes();
        setAccepting(false);
        setDeclining(false);
      })
      .catch((err) => console.error("Error in userQuoteAction:", err));
  };

  const [buttonStates, setButtonStates] = useState({});
  const dispatch = useDispatch();

  const addToCartHandler = async (productId, qty, productStock, quoteId) => {
    setButtonStates((prevState) => ({ ...prevState, [quoteId]: "Adding..." }));

    try {
      await dispatch(addToCart(productId, qty, productStock, quoteId));
      setButtonStates((prevState) => ({ ...prevState, [quoteId]: "Added!" }));
      setTimeout(
        () =>
          setButtonStates((prevState) => ({
            ...prevState,
            [quoteId]: (
              <span>
                Add to cart <i className="bi bi-minecart-loaded"></i>
              </span>
            ),
          })),
        1000
      );
    } catch (error) {
      setButtonStates((prevState) => ({
        ...prevState,
        [quoteId]: (
          <span>
            Add to cart <i className="bi bi-minecart-loaded"></i>
          </span>
        ),
      }));
    }
  };

  const deleteHandler = async (quoteId) => {
    if (window.confirm("Are you sure?")) {
      deleteQuote(quoteId).then(() => {
        refreshQuotes();
      });
    }
  };

  const columnWidths = [
    "3%",
    "3%",
    "20%",
    "29%",
    "10%",
    "10%",
    "10%",
    "10%",
    "5%",
  ];

  /* ***************** quote pdf download ***************** */

  // #region
  const [base64Data, setBase64Data] = useState([]);
  const [downloadingQuotePDF, setDownloadingQuotePDF] = useState(false);

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
        return "Q" + (Math.max(...newQuoteNumbers) + 1);
      }
      return undefined;
    });
  };

  const handleUpdateQuoteNumber = async (quoteNumber, quoteIds, userEmail, base64Data) => {
    return handleDownloadQuotePDF(quoteNumber, quoteIds, userEmail, base64Data)
      .then((response) => {
        if (response && response.message === "Quotes number have been updated!!!") {
          refreshQuotes();
          return response;
        }
        throw new Error("Failed to update quote numbers");
      });
  };



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



    // const newQuoteNumber = await handleGetQuoteNumber();

    if (quoteNumber === undefined) {
      alert("Please try again.");
      return;
    }

    // generatePdf(newQuoteNumber);

    try {
      const updateResponse = await handleUpdateQuoteNumber(
        quoteNumber,
        selectedQuotes.map((quote) => quote._id),
        selectedQuotes[0].userEmail,
        base64Data
      );
      console.log("updateResponse", updateResponse);
      if (updateResponse.message === "Quotes number have been updated!!!") {
        setQuoteNumber(quoteNumber);

        const documentComponent = (
          <ClientQuote
            selectedQuotes={selectedQuotes}
            quoteListProducts={quoteListProducts}
            totalAmount={totalAmount}
            quoteExpiryDate={quoteExpiryDate}
            quoteNumber={quoteNumber}
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
          pdfWindow.document.title = `${quoteNumber}.pdf`;
          pdfWindow.addEventListener("load", () => {
            pdfWindow.document.title = `${quoteNumber}.pdf`;
            const a = pdfWindow.document.createElement("a");
            a.href = url;
            a.download = `${quoteNumber}.pdf`;
            a.click();
          });
        }
      }
    } catch (error) {
      alert(
        "An error occurred while download pdf, please refresh page and try again."
      );
      console.error(error);
    } finally {
      setDownloadingQuotePDF(false);
    }
  };

  const PDFPopupButton = ({ loadingText }) => (
    <div className="ms-0 me-2" style={{ float: "left" }}>
      <Button
        hidden={selectedQuotes?.length < 1}
        className="ctl_blue_button"
        onClick={() => openPDFInPopup()}
      >
        {downloadingQuotePDF ? "Downloading..." : loadingText}
        <i class="bi bi-file-earmark-pdf-fill"></i>
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
  }, [selectedQuotes, quoteListProducts, quoteExpiryDateList, totalAmount]);

  // console.log("quoteNumber", quoteNumber);
  // console.log("base64Data", base64Data);
  // console.log("selectedQuotes", selectedQuotes);
  // console.log(totalAmount);
  // #endregion


  return (
    <>
      <table className="table table-striped">
        <TableHeader
          headers={completedHeaders}
          onSorting={(field, order) => setSorting({ field, order })}
          widths={columnWidths}
        />
        <tbody>
          {quoteItems.completedQuotes?.map((quoteItem, idx) => (
            <tr key={"completedQuotes" + idx}>
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
              <td>{quoteItem.name}</td>
              <td
                className="clickable"
                onClick={() => toggleModal(quoteItem.product?._id)}
              >
                {quoteItem.product?.name}
              </td>
              <td>
                {quoteItem.product &&
                  quoteItem.product.displayPrice &&
                  quoteItem.product.displayPrice !== 0
                  ? `$ ${quoteItem.product.stock[0]?.price.toFixed(2)}`
                  : ""}
              </td>
              <td
                style={{
                  color: getStatusColor(quoteItem.status),
                  fontWeight: "bold",
                }}
              >
                {quoteItem.status}
              </td>
              <td>{calculateDueInDays(quoteItem.expireDate)}</td>
              <td>
                {quoteItem.accepted === true ? (
                  <button
                    className="btn-sm btn-light w-100"
                    style={{
                      border: "1px solid #1e4881",
                      borderRadius: "5px",
                      color: "#1e4881",
                    }}
                    onClick={() =>
                      addToCartHandler(
                        quoteItem.product._id,
                        quoteItem.product.saleunit,
                        quoteItem.product.stock[0],
                        quoteItem._id
                      )
                    }
                  >
                    {buttonStates[quoteItem._id] || (
                      <span>
                        Add to cart <i className="bi bi-minecart-loaded"></i>
                      </span>
                    )}
                  </button>
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      className="btn-sm btn-light"
                      style={{
                        width: "48%",
                        border: "1px solid #1e4881",
                        borderRadius: "5px",
                        color: "#1e4881",
                      }}
                      onClick={() => {
                        handleUserAcceptQuote(quoteItem._id, true, 1);
                      }}
                      disabled={accpeting === true}
                    >
                      {accpeting ? "Accepting" : "Accept"}
                    </button>
                    <button
                      className="btn-sm btn-light"
                      style={{
                        width: "48%",
                        border: "1px solid #1e4881",
                        borderRadius: "5px",
                        color: "#1e4881",
                      }}
                      onClick={() => {
                        handleUserAcceptQuote(quoteItem._id, false, 2);
                      }}
                      disabled={declining === true}
                    >
                      {declining ? "Declining" : "Decline"}
                    </button>
                  </div>
                )}
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
      {loadingQuotes === true ? (
        <div className="fs-3 ms-2">Loading Quotes...</div>
      ) : (
        quotes.length === 0 && <div className="fs-3 ms-2">No Quotes Found</div>
      )}

      {/* <Button
        className="CTL_btn p-1 ps-2 pe-2 m-2"
        onClick={() => handlePDFDownload()}
        hidden={selectedQuotes?.length < 1}
      >
        Download Quote <i class="bi bi-file-earmark-pdf-fill"></i>
      </Button> */}

      <PDFPopupButton
        documentComponent={
          <ClientQuote
            selectedQuotes={selectedQuotes}
            quoteListProducts={quoteListProducts}
            totalAmount={totalAmount}
            quoteExpiryDate={quoteExpiryDate}
          />
        }
        fileName={"Quote"}
        loadingText="Download Quote"
      />

      <Pagination
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <Modal
        show={showModal}
        onHide={toggleModal}
        className="preview_quote_product_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
            {product?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          {loading ? (
            <img
              src="/loading-gif.gif"
              alt="Loading"
              style={{ display: "block", margin: "auto", width: "200px" }}
            />
          ) : (
            <QuoteProductPreviewComponent product={product} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CompletedQuotesTable;
