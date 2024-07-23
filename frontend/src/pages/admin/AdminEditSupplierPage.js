import React from "react";
import EditSupplierComponent from "./components/EditSupplierComponent";
import axios from "axios";

const AdminEditSupplierPage = () => {

  const getSupplier = async (supplierId) => {
      const { data } = await axios.get(`/api/suppliers/get-one/${supplierId}`);
    return data;
  };

  const updateSupplierApi = async (supplierId, formInputs) => {
    const { data } = await axios.put(`/api/suppliers/${supplierId}`, { ...formInputs, });
    return data;
}

  return <EditSupplierComponent getSupplier={getSupplier} updateSupplierApi={updateSupplierApi} />;
};

export default AdminEditSupplierPage;
