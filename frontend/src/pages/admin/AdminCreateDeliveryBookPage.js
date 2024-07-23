import CreateDeliveryBookComponent from "./components/CreateDeliveryBookComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const createDeliveryBookApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/deliveryBooks/admin`, { ...formInputs });
    return data;
};

const AdminCreateDeliveryBookPage = () => {

    return (
        <CreateDeliveryBookComponent
            createDeliveryBookApiRequest={createDeliveryBookApiRequest}
        />
    );
};

export default AdminCreateDeliveryBookPage;