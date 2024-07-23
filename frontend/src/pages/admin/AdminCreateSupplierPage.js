import React from "react";
import CreateSupplierComponent from "./components/CreateSupplierComponent";
import axios from "axios";

const AdminCreateSupplierPage = () => {
  const createSupplierApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/suppliers/add`, { ...formInputs });
    return data;
  };
  return <CreateSupplierComponent createSupplierApiRequest={createSupplierApiRequest} />;
};

export default AdminCreateSupplierPage;
