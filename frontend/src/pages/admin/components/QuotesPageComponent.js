import { Row, Col, Tabs, Tab, Modal, Button } from "react-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';


import "./invoicePDF.css";
import QuoteItemForQuotePageComponent from "./QuoteItemForQuotePageComponent";
import CompletedQuotesPageComponent from "./AdminQuoteListComponents/CompletedQuotesPageComponent";
import ProcessingQuotesPageComponent from "./AdminQuoteListComponents/ProcessingQuotesPageComponent";
import PurchasedQuotesPageComponent from "./AdminQuoteListComponents/PurchasedQuotesPageComponent";
import ExpiredQuotesPageComponent from "./AdminQuoteListComponents/ExpiredQuotesPageComponent";
import AdminCreateQuotePageComponenet from "./AdminQuoteListComponents/AdminCreateQuotePageComponenet";

//import { Tooltip } from '@mui/material';

const QuotesPageComponent = ({
  getQuotes,
  deleteQuote,
  markAsProcessing,
  updateQuote,
  getQuote,
  userQuoteAction,
  adminDuplicateQuote,
  getUsers,
  getAdminDeliveryBooks,
  adminCreateQuote,
  handleDownloadQuotePDF,
}) => {
  const [quotes, setQuotes] = useState([]);
  const [completedQuotes, setCompletedQuotes] = useState([]);
  const [purchasedQuotes, setPurchasedQuotes] = useState([]);
  const [processingQuotes, setProcessingQuotes] = useState([]);
  const [expiredQuotes, setExpiredQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loadingQuotes, setLoadingQuotes] = useState(true);

  const navigate = useNavigate();

  const startOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const refreshQuotes = () => {
    getQuotes()
      .then((quotes) => {
        const currentDateTime = startOfDay(new Date());
        const filteredQuotes = quotes.filter(
          (quote) =>
            quote.expireDate &&
            startOfDay(new Date(quote.expireDate)) >= currentDateTime
        );

        const newExpiredQuotes = quotes.filter(
          (quote) =>
            quote.expireDate &&
            startOfDay(new Date(quote.expireDate)) < currentDateTime
        );

        setQuotes(quotes);
        setExpiredQuotes(
          newExpiredQuotes.filter((quote) => quote.purchased !== true)
        );
        setCompletedQuotes(
          filteredQuotes.filter(
            (quote) => quote.status === "Completed" && quote.purchased !== true
          )
        );
        setPurchasedQuotes(quotes.filter((quote) => quote.purchased === true));
        setProcessingQuotes(
          quotes.filter((quote) => quote.status !== "Completed")
        );
        setLoadingQuotes(false);
      })
      .catch((er) => console.log("Error fetching quotes:", er));
  };

  useEffect(() => {
    refreshQuotes();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Received":
        return "#5c8dd1";
      case "Processing":
        return "orange";
      case "Completed":
        return "green";
      default:
        return "black";
    }
  };

  const handleTabChange = (key) => {
    let newUrl = '/admin/quotes';
    switch (key) {
      case '1':
        newUrl += '?tab=processingQuotes&pageNum=1';
        break;
      case '2':
        newUrl += '?tab=completedQuotes&pageNum=1';
        break;
      case '3':
        newUrl += '?tab=purchasedQuotes&pageNum=1';
        break;
      case '4':
        newUrl += '?tab=expiredQuotes&pageNum=1';
        break;
      default:
        break;
    }
    navigate(newUrl);
  };


  if (loadingQuotes) {
    return (
      <div>
        <img
          src="/loading-gif.gif"
          alt="Loading"
          style={{ display: "block", margin: "auto", width: "200px", marginTop: "10%" }}
        />{" "}
      </div>
    );
  }

  return (
    <>
      <Row className="content-container  m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <h1>QUOTES</h1>
              <button
                className="ms-2"
                onClick={() => refreshQuotes()}
                style={{ height: "auto" }}
              >
                Refresh Quotes
              </button>

              <AdminCreateQuotePageComponenet
                getUsers={getUsers}
                getAdminDeliveryBooks={getAdminDeliveryBooks}
                adminCreateQuote={adminCreateQuote}
                refreshQuotes={refreshQuotes}
              />

              <Button className="CTL_btn p-0 pe-2 ps-2" onClick={() => navigate('/product-list?categoryName=CLIENTQUOTE')}>
                Client Quoted Products <i className="bi bi-box-arrow-in-right"></i>
              </Button>
            </div>
            <div className="col-md-6 d-flex flex-row-reverse align-items-end">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                style={{ height: "auto" }}
              />
            </div>
          </div>

          <Tabs
            defaultActiveKey={1}
            id="User_Quote_List_Tabs"
            className="User_Quote_List_Tabs"
            onSelect={handleTabChange}
          >
            {/* Processing Quotes */}
            <Tab eventKey={1} title="Processing Quotes">
              <ProcessingQuotesPageComponent
                deleteQuote={deleteQuote}
                markAsProcessing={markAsProcessing}
                updateQuote={updateQuote}
                getQuote={getQuote}
                quotes={processingQuotes}
                refreshQuotes={refreshQuotes}
                search={search}
                getStatusColor={getStatusColor}
                adminDuplicateQuote={adminDuplicateQuote}
              />
            </Tab>

            {/* Completed Quotes */}
            <Tab
              eventKey={2}
              title="Completed Quotes"
              className="User_Quote_List_Tab_1"
            >
              <CompletedQuotesPageComponent
                deleteQuote={deleteQuote}
                markAsProcessing={markAsProcessing}
                updateQuote={updateQuote}
                getQuote={getQuote}
                quotes={completedQuotes}
                search={search}
                getStatusColor={getStatusColor}
                userQuoteAction={userQuoteAction}
                refreshQuotes={refreshQuotes}
                handleDownloadQuotePDF={handleDownloadQuotePDF}
                getQuotes={getQuotes}
              />
            </Tab>

            {/* Purchased Quotes */}
            <Tab
              eventKey={3}
              title="Purchased Quotes"
              className="User_Quote_List_Tab_1"
            >
              <PurchasedQuotesPageComponent
                deleteQuote={deleteQuote}
                markAsProcessing={markAsProcessing}
                updateQuote={updateQuote}
                getQuote={getQuote}
                quotes={purchasedQuotes}
                search={search}
                getStatusColor={getStatusColor}
              />
            </Tab>

            {/* Expired Quotes */}
            <Tab
              eventKey={4}
              title="Expired Quotes"
              className="User_Quote_List_Tab_1"
            >
              <ExpiredQuotesPageComponent
                deleteQuote={deleteQuote}
                markAsProcessing={markAsProcessing}
                updateQuote={updateQuote}
                getQuote={getQuote}
                quotes={expiredQuotes}
                search={search}
                getStatusColor={getStatusColor}
                userQuoteAction={userQuoteAction}
                refreshQuotes={refreshQuotes}
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default QuotesPageComponent;
