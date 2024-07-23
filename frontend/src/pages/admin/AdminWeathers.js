import WeathersComponent from "./components/WeathersComponent";
import axios from "axios";

const fetchWeathers = async (abctrl) => {
    const { data } = await axios.get("/api/weather/admin", {
        signal: abctrl.signal,
    });
    return data
}

const deleteDeliveryBook = async (deliveryBookId) => {
    const { data } = await axios.delete(`/api/deliveryBooks/admin/${deliveryBookId}`);
    return data
}

const AdminWeathers = () => {
    return <WeathersComponent fetchWeathers={fetchWeathers} deleteDeliveryBook={deleteDeliveryBook} />;
};

export default AdminWeathers;