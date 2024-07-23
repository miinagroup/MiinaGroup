import AdminAnalyticsPageComponent from "./components/AdminAnalyticsPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AdminNewsHubPageComponent from "./components/AdminNewsHubPageComponent";

const fetchNews = async () => {
    const { data } = await axios.get(`/api/news`);
    return data;
}


const adminRemoveNews = async (id) => {
    const { data } = await axios.delete(`/api/news/admin/${id}`);
    return data;
}

const AdminNewsHub = () => {
    return <AdminNewsHubPageComponent
        fetchNews={fetchNews}
        adminRemoveNews={adminRemoveNews}
    />
};
export default AdminNewsHub;