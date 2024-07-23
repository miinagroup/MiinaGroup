import React from "react";
import AdminPOCartDetailsPageComponent from "./components/AdminPOCartDetailsPageComponent";
import axios from "axios";

const AdminPOCartDetailsPage = () => {
  const getPOCart = async () => {
    const { data } = await axios.get("/api/poCart/");
    return data;
  };

  const changeCount = async (id, qty) => {
    const { data } = await axios.put("/api/poCart/update/" + id, {
      quantity: qty,
    });
    console.log("changeCount", data);
    return data;
  };

  const removeFromPOCartHandler = async (itemId) => {
    const { data } = await axios.delete("/api/poCart/delete/" + itemId);
    console.log("removeFromPOCartHandler", data);
    return data;
  };

  const emptyCart = async () => {
    const { data } = await axios.delete("/api/poCart/remove");
    return data;
  };

  const fetchSuppliers = async (abctrl) => {
    const { data } = await axios.get("/api/suppliers/",{
        signal: abctrl.signal,
    });
    return data
  };

  const createPO = async (poData) => {
    const { data } = await axios.post("/api/purchaseOrders/add", { ...poData });
    return data;
  };

  const getLargestPONumber = async () => {
    const { data } = await axios.get("/api/purchaseOrders/getPON");
    return data;
  };



  return (
    <AdminPOCartDetailsPageComponent
      getPOCart={getPOCart}
      changeCount={changeCount}
      removeFromPOCartHandler={removeFromPOCartHandler}
      emptyCart={emptyCart}
      fetchSuppliers={fetchSuppliers}
      createPO={createPO}
      getLargestPONumber={getLargestPONumber}
    />
  );
};

export default AdminPOCartDetailsPage;
