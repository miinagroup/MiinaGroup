import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import UserLinksComponent from "../../../components/user/UserLinksComponent";
import { Search } from "../../../components/DataTable";
import CompletedQuotesTable from "./QuoteListComponents/CompletedQuotesTable";
import ExpiredQuotesTable from "./QuoteListComponents/ExpiredQuotesTable";
import ProcessingQuotesTable from "./QuoteListComponents/ProcessingQuotesTable";
import ArchivedQuotesTable from "./QuoteListComponents/ArchivedQuotesTable";
import { useNavigate } from 'react-router-dom';

import styles from "./UserProfilePageComponent.module.css";

const UserQuotesPageComponent = ({
  getQuotes,
  userQuoteAction,
  userReRquestQuote,
  userRequestPdf,
  deleteQuote,
  handleDownloadQuotePDF,
}) => {
  const [quotes, setQuotes] = useState([]);
  const [completedQuotes, setCompletedQuotes] = useState([]);
  const [requestedQuotes, setRequestedQuotes] = useState([]);
  const [processingQuotes, setProcessingQuotes] = useState([]);
  const [archivedQuotes, setArchivedQuotes] = useState([]);
  const [expiredQuotes, setExpiredQuotes] = useState([]);
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
        // console.log("startOfDay for currentDateTime", currentDateTime);

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

        setQuotes(filteredQuotes);
        setExpiredQuotes(newExpiredQuotes);
        setCompletedQuotes(
          filteredQuotes.filter(
            (quote) =>
              (quote.status === "Completed" && quote.purchased !== true)
          )
        );
        setRequestedQuotes(
          filteredQuotes.filter((quote) => quote.requested === true)
        );
        setProcessingQuotes(
          quotes.filter((quote) => quote.status !== "Completed")
        );
        setArchivedQuotes(quotes.filter((quote) => quote.accepted === false));
        setLoadingQuotes(false);
      })
      .catch((er) => console.log("Error fetching quotes:", er));
  };

  useEffect(() => {
    refreshQuotes();
  }, []);

  // console.log("quotes", quotes);
  // console.log("quotesData", completedQuotes);

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
    let newUrl = '/user/my-quotes';
    switch (key) {
      case '1':
        newUrl += '?tab=completedQuotes&pageNum=1';
        break;
      case '2':
        newUrl += '?tab=processingQuotes&pageNum=1';
        break;
      case '3':
        newUrl += '?tab=expiredQuotes&pageNum=1';
        break;
      case '4':
        newUrl += '?tab=archivedQuotes&pageNum=1';
        break;
      default:
        break;
    }
    navigate(newUrl);
  };

  return (
    <>
      <Row className={`m-5 ${styles.userQuotesPageWrapper}`}>
        <Col md={2}>
          <UserLinksComponent />
        </Col>
        <Col md={10}>
          <div className="row">
            <div className="col-md-6">
              <h1>MY QUOTES</h1>
            </div>
            <div className="col-md-6 d-flex flex-row-reverse align-items-end">
              <Search
                onSearch={(value) => {
                  setSearch(value);
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
            {/* Completed Quotes */}
            <Tab eventKey={1} title={`Completed Quotes (${completedQuotes?.length})`}>
              <CompletedQuotesTable
                quotes={completedQuotes}
                getStatusColor={getStatusColor}
                search={search}
                userQuoteAction={userQuoteAction}
                refreshQuotes={refreshQuotes}
                userRequestPdf={userRequestPdf}
                loadingQuotes={loadingQuotes}
                deleteQuote={deleteQuote}
                handleDownloadQuotePDF={handleDownloadQuotePDF}
                getQuotes={getQuotes}
              />
            </Tab>

            {/* Processing Quotes */}
            <Tab eventKey={2} title={`Processing Quotes (${processingQuotes?.length})`}>
              <ProcessingQuotesTable
                quotes={processingQuotes}
                getStatusColor={getStatusColor}
                search={search}
                loadingQuotes={loadingQuotes}
                refreshQuotes={refreshQuotes}
                deleteQuote={deleteQuote}
              />
            </Tab>

            {/* Expired Quotes */}
            <Tab eventKey={3} title={`Expired Quotes (${expiredQuotes?.length})`}>
              <ExpiredQuotesTable
                quotes={expiredQuotes}
                search={search}
                userQuoteAction={userQuoteAction}
                refreshQuotes={refreshQuotes}
                userReRquestQuote={userReRquestQuote}
                deleteQuote={deleteQuote}
              />
            </Tab>

            {/* Archived Quotes */}
            <Tab eventKey={4} title={`Archived Quotes (${archivedQuotes?.length})`}>
              <ArchivedQuotesTable
                quotes={archivedQuotes}
                getStatusColor={getStatusColor}
                search={search}
                refreshQuotes={refreshQuotes}
                deleteQuote={deleteQuote}
              />
            </Tab>
            {/* Purchased Quotes */}
            {/*             <Tab eventKey={4} title="Purchased Quotes">
              <RequestedQuotesTable quotes={requestedQuotes} getStatusColor={getStatusColor} search={search} userRequestPdf={userRequestPdf} />
            </Tab> */}
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default UserQuotesPageComponent;