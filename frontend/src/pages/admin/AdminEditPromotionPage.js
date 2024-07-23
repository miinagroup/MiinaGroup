import EditPromotionComponent from "./components/EditPromotionComponent";
import axios from "axios";


const fetchPromotions = async (promotionId) => {
    const { data } = await axios.get(`/api/promotion/admin/get-one/${promotionId}`);
    return data;
}

const updatePromotionApiRequest = async (promotionId, formInputs) => {
    const { data } = await axios.put(`/api/promotion/admin/update/${promotionId}`, { ...formInputs, });
    return data;
}

const AdminEditPromotionPage = () => {

    return (
        <EditPromotionComponent
        fetchPromotions={fetchPromotions} 
        updatePromotionApiRequest={updatePromotionApiRequest}
        />
    );
};

export default AdminEditPromotionPage;