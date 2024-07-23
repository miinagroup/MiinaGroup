import NewsListPageComponent from "./components/NewsListPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const fetchNews = async () => {
    const { data } = await axios.get(`/api/news`);
    return data;
}

const NewsListPage = () => {
    return (
        <NewsListPageComponent
            fetchNews={fetchNews}
        />

    );
};

export default NewsListPage;