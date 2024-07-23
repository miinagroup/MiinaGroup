import ManageUniformUsersPageComponent from "./components/ManageUniformUsersPageComponent";
import { addToCartUniformByManager } from "../../redux/actions/cartActions"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const getUniformCategories = async () => {
  const { data } = await axios.get("/api/uniformCategories")
  return data;
}

const getUniforms = async () => {
  const { data } = await axios.get("/api/uniforms");
  return data;
}

const getSelectedSuppliers = async () => {
  const { data } = await axios.get("/api/UniformSelectedSuppliers");
  return data;
}

const getSelectedSuppliersByCompanyName = async (companyName) => {
  const { data } = await axios.get("/api/UniformSelectedSuppliers/getByCompanyName/" + companyName);
  return data;
}

const addSelectedSuppliers = async (selectedData) => {
  const { data } = await axios.post("/api/UniformSelectedSuppliers/add", { ...selectedData });
  return data;
}

const updateSelectedSuppliers = async (id, selectedData) => {
  const { data } = await axios.put("/api/UniformSelectedSuppliers/update/" + id, { ...selectedData });
  return data;
}

const getUniformCartByCompany = async (userCompany) => {
  const { data } = await axios.get("/api/uniformCarts/getByCompany/" + userCompany);
  return data;
}

const updateUniformCart = async (id, purchaseData) => {
  const { data } = await axios.put(`/api/uniformCarts/updateOne/${id}`, { purchaseData });
  return data;
};

const ManageUniformUsersPage = () => {
  const dispatch = useDispatch();

  return <ManageUniformUsersPageComponent
    getUniformCartByCompany={getUniformCartByCompany}
    getUniformCategories={getUniformCategories}
    getSelectedSuppliersByCompanyName={getSelectedSuppliersByCompanyName}
    getUniforms={getUniforms}
    addToCartReduxAction={addToCartUniformByManager}
    reduxDispatch={dispatch}
    updateUniformCart={updateUniformCart}
  />
};
export default ManageUniformUsersPage;
