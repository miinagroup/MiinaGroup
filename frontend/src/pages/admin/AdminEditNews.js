import EditNewsComponent from "./components/EditNewsComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const fetchNews = async (id) => {
  const { data } = await axios.get(`/api/news/get-one/${id}`);
  return data;
}

const updateNewsApiRequest = async (newsId, formInputs) => {
  const { data } = await axios.put(`/api/news/admin/updateNews/${newsId}`, {
    ...formInputs,
  });
  return data;
};

const AdminEditNews = () => {

  return <EditNewsComponent
    fetchNews={fetchNews}
    updateNewsApiRequest={updateNewsApiRequest}
  />

};

export default AdminEditNews;
