import UserUniformsPageComponent from "./components/UserUniformsPageComponent";
import axios from "axios";

const getUniformCart = async (userId) => {
  const { data } = await axios.get(`/api/uniformCarts/getByUser/${userId}`);
  return data;
};

const getAllUniformCart = async (userId) => {
  const { data } = await axios.get("/api/uniformCarts");
  return data;
};
const updateUniformCartLimit = async (id, purchaseData) => {
  const { data } = await axios.put(`/api/uniformCarts/updateLimit/${id}`, { purchaseData });
  console.log("purchaseData", purchaseData);
  return data;
};


const getAllUniformRole = async (userRole) => {
  const { data } = await axios.get("/api/uniformRoles");
  return data;
}
const getUniformRoleByRole = async (userRole) => {
  const { data } = await axios.get(`/api/uniformRoles/get-one/${userRole}`);
  return data;
}

const getUniformCategories = async () => {
  const { data } = await axios.get("/api/uniformCategories");
  return data;
}

const getdeliveryBooks = async (email) => {
  const { data } = await axios.get("/api/deliveryBooks/deliveryBook/" + email);
  return data;
};

const UserUniformsPage = () => {
  return <UserUniformsPageComponent
    getUniformCart={getUniformCart}
    getUniformRoleByRole={getUniformRoleByRole}
    getUniformCategories={getUniformCategories}
    getAllUniformCart={getAllUniformCart}
    getAllUniformRole={getAllUniformRole}
    updateUniformCart={updateUniformCartLimit}
    getdeliveryBooks={getdeliveryBooks}
  />;
};

export default UserUniformsPage;
