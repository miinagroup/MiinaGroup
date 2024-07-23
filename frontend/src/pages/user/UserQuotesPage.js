import UserQuotesPageComponent from "./components/UserQuotesPageComponent";
import axios from "axios";

const getQuotes = async () => {
  const { data } = await axios.get("/api/quotes/user/");
  return data;
};

const userQuoteAction = async (quoteId, accept) => {
  const response = await axios.post("/api/quotes/accept?quoteId=" + quoteId, { userAction: accept });
  // console.log("response", response);
  if (response.data) {
    return response.data;
  }
}

const userReRquestQuote = async (quoteId) => {
  const response = await axios.post("/api/quotes/rerequest?quoteId=" + quoteId);
  console.log("response", response);
  if (response.data) {
    return response.data;
  }
}

const userRequestPdf = async (quoteIds) => {
  const response = await axios.post("/api/quotes/requestPdf", {quoteIds: quoteIds});
  console.log("response", response);
  if (response.data) {
    return response.data;
  }
}

const deleteQuote = async (quoteId) => {
  const { data } = await axios.delete("/api/quotes/delete/" + quoteId);
  if (data) {
    return data;
  }
};

const handleDownloadQuotePDF = async (quoteNumber, quoteIds, userEmail, base64Data) => {
  const { data } = await axios.post("/api/quotes/download?quoteNumber=" + quoteNumber, {quoteIds, userEmail, base64Data});
  return data;
}

const UserQuotesPage = () => {
  return <UserQuotesPageComponent
    getQuotes={getQuotes}
    userQuoteAction={userQuoteAction} 
    userReRquestQuote={userReRquestQuote}
    userRequestPdf={userRequestPdf}
    deleteQuote={deleteQuote}
    handleDownloadQuotePDF={handleDownloadQuotePDF}
    />;
};

export default UserQuotesPage;
