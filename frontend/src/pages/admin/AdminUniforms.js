import AdminUniformsPageComponent from "./components/AdminUniformsPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const fetchUniforms = async () => {
    const { data } = await axios.get(`/api/uniforms`);
    return data;
}


const adminRemoveUniforms = async (uniformId) => {
    const { data } = await axios.delete(`/api/uniforms/admin/${uniformId}`);
    return data;
}

const AdminUniforms = () => {
    return <AdminUniformsPageComponent
        fetchUniforms={fetchUniforms}
        adminRemoveUniforms={adminRemoveUniforms}
    />
};

export default AdminUniforms;