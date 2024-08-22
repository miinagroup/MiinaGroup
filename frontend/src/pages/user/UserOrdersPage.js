import UserOrdersPageComponent from "./components/UserOrdersPageComponent";
import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get("/api/orders");
  return data;
};
const getOrdersByCompany = async (userCompany) => {
  const { data } = await axios.get("/api/orders/company" + userCompany);
  return data;
};

const updateApprovedPOnumber = async (orderId, poNumber, date) => {
  const { data } = await axios.put("/api/orders/updateApprovedPO/" + orderId, { poNumber, date })
  return data;
}

const UserOrdersPage = () => {
  return <UserOrdersPageComponent
    getOrders={getOrders}
    getOrdersByCompany={getOrdersByCompany}
    updateApprovedPOnumber={updateApprovedPOnumber}
  />;
};

export default UserOrdersPage;
