import CreateWeatherComponent from "./components/CreateWeatherComponent";
import axios from "axios";


const createWeatherApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/weather/create`, { ...formInputs });
    return data;
};

const fetchDeliveryBooks = async (abctrl) => {
    const { data } = await axios.get("/api/deliveryBooks/admin", {
        signal: abctrl.signal,
    });
    return data
}

const AdminCreateWeather = () => {

    return (
        <CreateWeatherComponent
        createWeatherApiRequest={createWeatherApiRequest} 
        fetchDeliveryBooks={fetchDeliveryBooks}
        />
    );
};

export default AdminCreateWeather;