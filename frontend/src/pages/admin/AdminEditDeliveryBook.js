import EditDeliveryBookComponent from "./components/EditDeliveryBookComponent";
import axios from "axios";

const fetchDeliveryBook = async (deliveryBookId) => {
    const { data } = await axios.get(`/api/deliveryBooks/get-one/${deliveryBookId}`);
    return data;
}

const updateDeliveryBookApiRequest = async (deliveryBookId, formInputs) => {
    const { data } = await axios.put(`/api/deliveryBooks/admin/${deliveryBookId}`, { ...formInputs, });
    return data;
}

const AdminEditDeliveryBook = () => {

    return <EditDeliveryBookComponent updateDeliveryBookApiRequest={updateDeliveryBookApiRequest} fetchDeliveryBook={fetchDeliveryBook} />;
};

export default AdminEditDeliveryBook;