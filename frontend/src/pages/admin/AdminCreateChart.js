import CreateChartComponent from "./components/CreateChartComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const fetchCharts = async () => {
  const { data } = await axios.get(`/api/charts`);
  return data;
}

const createChartApiRequest = async (name, baseUrl, chartId, adminUse) => {
  const { data } = await axios.post(`/api/charts/admin`, { name, baseUrl, chartId, adminUse });
  return data;
};


const AdminCreateChart = () => {
  return <CreateChartComponent
    createChartApiRequest={createChartApiRequest}
    fetchCharts={fetchCharts}
  />
};

export default AdminCreateChart;
