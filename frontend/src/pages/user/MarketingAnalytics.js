import axios from "axios";
import MarketingAnalyticsPageComponent from "./components/MarketingAnalyticsPageComponent";

const fetchCharts = async () => {
  const { data } = await axios.get(`/api/charts`);
  return data;
};

const getOrders = async () => {
  const { data } = await axios.get("/api/orders/admin");
  return data;
};

const createChartApiRequest = async (name, baseUrl, chartId, adminUse) => {
  const { data } = await axios.post(`/api/charts/admin`, {
    name,
    baseUrl,
    chartId,
    adminUse,
  });
  return data;
};

const adminRemoveChart = async (chartId) => {
  console.log("I am father", chartId);
  const { data } = await axios.delete(`/api/charts/admin/${chartId}`);
  return data;
};

const MarketingAnalytics = () => {
  return (
    <MarketingAnalyticsPageComponent
      fetchCharts={fetchCharts}
      getOrders={getOrders}
      adminRemoveChart={adminRemoveChart}
    />
  );
};

export default MarketingAnalytics;
