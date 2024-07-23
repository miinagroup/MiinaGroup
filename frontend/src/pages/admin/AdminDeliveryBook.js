import DeliveryBookComponent from "./components/DeliveryBookComponent";
import axios from "axios";

const fetchDeliveryBooks = async (abctrl) => {
    const { data } = await axios.get("/api/deliveryBooks/admin", {
        signal: abctrl.signal,
    });
    return data
}

const deleteDeliveryBook = async (deliveryBookId) => {
    const { data } = await axios.delete(`/api/deliveryBooks/admin/${deliveryBookId}`);
    return data
}

const AdminDeliveryBook = () => {
    return <DeliveryBookComponent fetchDeliveryBooks={fetchDeliveryBooks} deleteDeliveryBook={deleteDeliveryBook} />;
};

export default AdminDeliveryBook;