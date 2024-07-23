import NewsDetailsPageComponent from "./components/NewsDetailsPageComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const fetchNews = async (id) => {
    const { data } = await axios.get(`/api/news/get-one/${id}`);
    return data;
}
// console.log("i m");

const NewsDetailsPage = () => {
    return (
        <NewsDetailsPageComponent
            fetchNews={fetchNews}
        />
    );
};

export default NewsDetailsPage;