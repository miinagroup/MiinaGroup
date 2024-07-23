import QuotesPageComponent from "./components/QuotesPageComponent";

import axios from "axios";

const getQuotes = async () => {
  const { data } = await axios.get("/api/quotes/admin");
  return data;
};

const getQuote = async (quoteId) => {
  const { data } = await axios.get(
    `/api/quotes/admin/quoteItem?quoteId=${quoteId}`
  );
  return data;
};

const markAsProcessing = async (quoteId, expiryDateString, adminMessage) => {
  console.log("Am i here?", expiryDateString, adminMessage);
  const response = await axios.post(
    "/api/quotes/admin/status?quoteId=" + quoteId,
    { expireDate: expiryDateString, adminMessage:adminMessage }
  );

  if (response.data) {
    return response.data;
  }
};

const updateQuote = async (quoteId, quote) => {
  const { data } = await axios.post(
    "/api/quotes/admin/update?quoteId=" + quoteId,
    quote
  );
  if (data) {
    return data;
  }
};

const deleteQuote = async (quoteId) => {
  const { data } = await axios.delete("/api/quotes/delete/" + quoteId);
  if (data) {
    return data;
  }
};

const userQuoteAction = async (quoteId, accept) => {
  const response = await axios.post("/api/quotes/accept?quoteId=" + quoteId, {
    userAction: accept,
  });
  if (response.data) {
    return response.data;
  }
};

const adminDuplicateQuote = async (quoteId, number) => {
  try {
    const response = await axios.post("/api/quotes/admin/duplicate?quoteId=" + quoteId, {
      number: number,
    });
    return response.data;
  } catch (error) {
    console.error("Error in adminDuplicateQuote:", error);
    throw error;
  }
};

const adminCreateQuote = async (quoteDetails) => {
  try {
    const response = await axios.post("/api/quotes/admin/create", {
      ...quoteDetails,
    });
    return response.data;
  } catch (error) {
    console.error("Error in adminCreateQuote:", error);
    throw error;
  }
};

const getUsers = async (company) => {
  const { data } = await axios.get("/api/users/");
  return data
};

const getAdminDeliveryBooks = async () => {
  const { data } = await axios.get("/api/deliveryBooks/admin");
  return data;
}

const handleDownloadQuotePDF = async (quoteNumber, quoteIds, userEmail, base64Data) => {
  const { data } = await axios.post("/api/quotes/download?quoteNumber=" + quoteNumber, {quoteIds, userEmail, base64Data});
  return data;
}


const AdminQuotesPage = () => {
  return (
    <QuotesPageComponent
      getQuotes={getQuotes}
      markAsProcessing={markAsProcessing}
      getQuote={getQuote}
      updateQuote={updateQuote}
      userQuoteAction={userQuoteAction}
      deleteQuote={deleteQuote}
      adminDuplicateQuote={adminDuplicateQuote}
      getUsers={getUsers}
      getAdminDeliveryBooks={getAdminDeliveryBooks}
      adminCreateQuote={adminCreateQuote}
      handleDownloadQuotePDF={handleDownloadQuotePDF}
    />
  );
};

export default AdminQuotesPage;
