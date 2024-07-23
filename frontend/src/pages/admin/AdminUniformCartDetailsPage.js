import AdminUniformCartDetailsPageComponent from "./components/AdminUniformCartDetailsPageComponent";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

const fetchUniformCart = async () => {
    const { data } = await axios.get(`/api/UniformCart`);
    return data;
}

const AdminUniformCartDetailsPage = () => {
    return (
        <AdminUniformCartDetailsPageComponent
            fetchUniformCart={fetchUniformCart} />
    );
};

export default AdminUniformCartDetailsPage;