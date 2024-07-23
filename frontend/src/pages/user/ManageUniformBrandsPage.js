import ManageUniformBrandsPageComponent from "./components/ManageUniformBrandsPageComponent";
import axios from "axios";

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


const ManageUniformBrandsPage = () => {
  return <ManageUniformBrandsPageComponent
    getUniformCategories={getUniformCategories}
    getUniforms={getUniforms}
    getSelectedSuppliers={getSelectedSuppliers}
    getSelectedSuppliersByCompanyName={getSelectedSuppliersByCompanyName}
    addSelectedSuppliers={addSelectedSuppliers}
    updateSelectedSuppliers={updateSelectedSuppliers}
  />;
};
export default ManageUniformBrandsPage;
