import axios from "axios";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utils";
import QuoteSubmitComponent from "./components/QuoteSubmitComponent";

const createQuote = async (formInputs) => {
  //   console.log("submitQuoteApiRequest formInputs", formInputs);
  const { data } = await axios.post(`/api/quotes/create`, { ...formInputs });
  // console.log(data);
  return data;
};

const UserQuoteSubmitPage = ({
  // userInfo, 
  fromProductList
  }) => {


  return (
    <QuoteSubmitComponent
      createQuote={createQuote}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      fromProductList={fromProductList}
      // userInfo={userInfo}
    />
  );
};

export default UserQuoteSubmitPage;
