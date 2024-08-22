import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";
import AdminPurchaseOrdersComponent from "./components/AdminPurchaseOrdersComponent";

const AdminPurchaseOrder = () => {
  const getOrders = async () => {
    const { data } = await axios.get("/api/purchaseOrders/");
    return data;
  };
  const getPruchasedItemSupplier = async () => {
    const { data } = await axios.get(`/api/orders/supplier`);
    return data;
  };

  const updatePO = async (id, cartItems) => {
    const { data } = await axios.put(`/api/purchaseOrders/update/${id}`, { cartItems });
    return data;
  };

  const updatePOStatus = async (order) => {
    const { data } = await axios.put(`/api/purchaseOrders/updateStatus`, { order });
    return data;
  };

  const deletePurchaseOrder = async (orderId, itemId) => {
    const { data } = await axios.delete("/api/purchaseOrders/delete/" + orderId);
    if (data) {
      return data;
    }
  }

  return (
    <AdminPurchaseOrdersComponent
      getPruchasedItemSupplier={getPruchasedItemSupplier}
      getOrders={getOrders}
      updatePO={updatePO}
      deletePurchaseOrder={deletePurchaseOrder}
      updatePOStatus={updatePOStatus}
    />
  );
};

export default AdminPurchaseOrder;
