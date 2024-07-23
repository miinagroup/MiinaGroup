import PromotionComponent from "./components/PromotionComponent";
import axios from "axios";

const fetchPromotions = async (abctrl) => {
    const { data } = await axios.get("/api/promotion/admin/fetchPromotions", {
        signal: abctrl.signal,
    });
    return data
}

// const deleteDeliveryBook = async (deliveryBookId) => {
//     const { data } = await axios.delete(`/api/deliveryBooks/admin/${deliveryBookId}`);
//     return data
// }

const AdminPromotion = () => {
    return <PromotionComponent fetchPromotions={fetchPromotions} />;
};

export default AdminPromotion;