import ManageUniformsPageComponent from "./components/ManageUniformsPageComponent";
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



// const getUniforms = async (
//   categoryName = "",
//   pageNumParam = null,
//   searchQuery = "",
//   subCategoryName = "",
//   childCategoryName = "",
//   fourCategoryName = "",
//   fiveCategoryName = "",
//   brandName = ""
// ) => {
//   const search = searchQuery ? `search/${searchQuery}/` : "";
//   const category = categoryName ? `category/${categoryName}/` : "";
//   const brand = brandName ? `brand/${brandName}/` : "";
//   const url = `/api/uniforms/${category}${search}${brand}?pageNum=${pageNumParam}&subCategoryName=${subCategoryName}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}&brandName=${brandName}`;
//   try {
//     var { data } = await axios.get(url);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
//   return data;
// };


const ManageUniformsPage = () => {
  const dispatch = useDispatch();

  return <ManageUniformsPageComponent
    getUniformCartByCompany={getUniformCartByCompany}
    getUniformCategories={getUniformCategories}
    getSelectedSuppliersByCompanyName={getSelectedSuppliersByCompanyName}
    getUniforms={getUniforms}
    addToCartReduxAction={addToCartUniformByManager}
    reduxDispatch={dispatch}
    updateUniformCart={updateUniformCart}
  />
};
export default ManageUniformsPage;
