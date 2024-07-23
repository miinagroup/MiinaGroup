import CreateNewsComponent from "./components/CreateNewsComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const fetchNews = async () => {
  const { data } = await axios.get(`/api/news`);
  return data;
}

const createNews = async (title, details, author) => {
  const { data } = await axios.post(`/api/news/admin`, { title, details, author });
  return data;
};

const AdminCreateNews = () => {

  return <CreateNewsComponent
    createNews={createNews}
    fetchNews={fetchNews}
  />

};

export default AdminCreateNews;
