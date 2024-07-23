import InvoicesPageComponent from "./components/InvoicesPageComponent";

import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get("/api/orders/admin");
  return data
}

const deleteOrder = async (orderId, itemId) => {
  const { data } = await axios.delete("/api/orders/delete/" + orderId);
  if (data) {
      return data;
  }
}

const AdminInvoicesPage = () => {
  return <InvoicesPageComponent getOrders={getOrders} deleteOrder={deleteOrder}/>
};

export default AdminInvoicesPage;

