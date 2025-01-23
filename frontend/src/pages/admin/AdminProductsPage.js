import ProductsPageComponent from "./components/ProductsPageComponent";

import axios from "axios";

const fetchProducts = async (abctrl) => {
  const { data } = await axios.get("/api/products/admin", {
    signal: abctrl.signal,
  });
  return data;
};

const getOrders = async () => {
  const { data } = await axios.get("/api/orders/admin");
  return data
}

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`/api/products/admin/${productId}`);
  return data;
};

const productReplenishment = async (barcode, suppliersku, replenishment) => {
  try {
    const { data } = await axios.put(`/api/products/admin/replenishment`, {
      barcode, suppliersku, replenishment
    });
    return data;
  } catch (error) {
    console.error("Error in product replenishment:", error);
    throw error;
  }
};

const productStockTake = async (barcode, count) => {
  try {
    const { data } = await axios.put(`/api/products/admin/stocktake`, {
      barcode, count
    });
    return data;
  } catch (error) {
    console.error("Error in product stock take:", error);
    throw error;
  }
};

const AdminProductsPage = () => {
  return (
    <ProductsPageComponent
      fetchProducts={fetchProducts}
      deleteProduct={deleteProduct}
      productReplenishment={productReplenishment}
      productStockTake={productStockTake}
      getOrders={getOrders}
    />
  );
};

export default AdminProductsPage;
