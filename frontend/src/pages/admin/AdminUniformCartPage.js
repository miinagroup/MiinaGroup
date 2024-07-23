import AdminUniformCartPageComponent from "./components/AdminUniformCartPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const fetchUniformCart = async () => {
    const { data } = await axios.get(`/api/UniformCart`);
    return data;
}

const adminRemoveUniformCart = async (id) => {
    const { data } = await axios.delete(`/api/UniformCart/admin/${id}`);
    return data;
}

const AdminUniformCartPage = () => {
    return <AdminUniformCartPageComponent
        fetchUniformCart={fetchUniformCart}
        adminRemoveUniformCart={adminRemoveUniformCart}
    />
};
export default AdminUniformCartPage;