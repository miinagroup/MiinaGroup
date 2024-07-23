import UniformDetailsPageComponent from "./components/UniformDetailsPageComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartUniform } from "../redux/actions/cartActions";
import axios from "axios";

const getUniformDetails = async (id) => {
    const { data } = await axios.get(`/api/uniforms/get-one/${id}`);
    return data;
};


const UniformDetailsPage = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id);
        return data;
    };

    const getUniformRoleByRole = async (userRole) => {
        const { data } = await axios.get(`/api/uniformRoles/get-one/${userRole}`);
        return data;
    };

    const getUniformCart = async (userId) => {
        const { data } = await axios.get(`/api/uniformCarts/getByUser/${userId}`);
        return data;
    };

    const updateUniformCart = async (id, purchaseData) => {
        const { data } = await axios.put(`/api/uniformCarts/updateOne/${id}`, { purchaseData });
        return data;
    };

    const getUniformCategories = async () => {
        const { data } = await axios.get("/api/uniformCategories/");
        return data;
    };

    return (
        <UniformDetailsPageComponent
            getUniformDetails={getUniformDetails}
            getUniformCategories={getUniformCategories}
            getUser={getUser}
            getUniformCart={getUniformCart}
            updateUniformCart={updateUniformCart}
            getUniformRole={getUniformRoleByRole}
            addToCartReduxAction={addToCartUniform}
            reduxDispatch={dispatch} />

    );
};

export default UniformDetailsPage;