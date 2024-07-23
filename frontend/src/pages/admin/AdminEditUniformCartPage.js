import AdminEditUniformCartPageComponent from "./components/AdminEditUniformCartPageComponent";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const fetchUniformCart = async () => {
    const { data } = await axios.get(`/api/UniformCart`);
    return data;
}

const AdminEditUniformCartPage = () => {
    return (
        <AdminEditUniformCartPageComponent
            fetchUniformCart={fetchUniformCart} />
    )
}

export default AdminEditUniformCartPage;