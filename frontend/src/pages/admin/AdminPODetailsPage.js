import PODetailsPageComponent from "./components/PODetailsPageComponent";
import axios from "axios";



const AdminPODetailsPage = () => {

  const getOrder = async (id) => {
    const { data } = await axios.get("/api/purchaseOrders/get-one/" + id);
    return data;
  };
  
  const markAsDelivered = async (id, trackLink) => {
    const { data } = await axios.put("/api/orders/delivered/" + id, {
      trackLink: trackLink,
    });
    if (data) {
      return data;
    }
  };
  
  const sendInv = async (id) => {
    const { data } = await axios.put("/api/orders/sendInv/" + id);
    if (data) {
      return data;
    }
  };
  
  const updateBackOrder = async (orderId, itemId, price, suppliedQty) => {
    const { data } = await axios.put(
      "/api/orders/updateBackOrder/" + orderId + "/" + itemId,
      { price, suppliedQty }
    );
    if (data) {
      return data;
    }
  };
  
  const updateInvoiceNumber = async (orderId, invoiceNumber) => {
    const { data } = await axios.put(
      "/api/orders/updateInvoiceNumber/" + orderId + "/",
      { invoiceNumber }
    );
    if (data) {
      return data;
    }
  };

  return (
    <PODetailsPageComponent
      getOrder={getOrder}
      markAsDelivered={markAsDelivered}
      sendInv={sendInv}
      updateBackOrder={updateBackOrder}
      updateInvoiceNumber={updateInvoiceNumber}
    />
  );
};

export default AdminPODetailsPage;
