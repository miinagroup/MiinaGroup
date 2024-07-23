import CreatePromotionComponent from "./components/CreatePromotionComponent";
import axios from "axios";


const createWeatherApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/weather/create`, { ...formInputs });
    return data;
};


const AdminCreatePromotionPage = () => {

    return (
        <CreatePromotionComponent
        createWeatherApiRequest={createWeatherApiRequest} 
        />
    );
};

export default AdminCreatePromotionPage;