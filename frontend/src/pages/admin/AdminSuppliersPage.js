import React from "react";
import AdminSuppliersPageComponent from "./components/AdminSuppliersPageComponent";
import axios from "axios";

const AdminSuppliersPage = () => {
  const fetchSuppliers = async (abctrl) => {
    const { data } = await axios.get("/api/suppliers/",{
        signal: abctrl.signal,
    });
    return data
  };

  const deleteSupplier = async (supplierId) => {
    const { data } = await axios.delete(`/api/suppliers/delete/${supplierId}`);
    return data;
  };

  return (
    <AdminSuppliersPageComponent
      fetchSuppliers={fetchSuppliers}
      deleteSupplier={deleteSupplier}
    />
  );
};

export default AdminSuppliersPage;
