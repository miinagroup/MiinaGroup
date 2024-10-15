import UniformListPageComponent from "./components/UniformListPageComponent";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";


const getSelectedSuppliersByCompanyName = async (userCompany) => {
    const { data } = await axios.get("/api/uniformSelectedSuppliers/getByCompanyName/" + userCompany);
    return data
}

const getUniforms = async (
    categoryName = "",
    pageNumParam = null,
    searchQuery = "",
    subCategoryName = "",
    childCategoryName = "",
    fourCategoryName = "",
    fiveCategoryName = "",
    brandName = ""
) => {
    const search = searchQuery ? `search/${searchQuery}/` : "";
    const category = categoryName ? `category/${categoryName}/` : "";
    const brand = brandName ? `brand/${brandName}/` : "";
    //const url = `/api/uniforms/${category}${search}${brand}?pageNum=${pageNumParam}&subCategoryName=${subCategoryName}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}&brandName=${brandName}`;
    const url = `/api/uniforms/categoryName/${subCategoryName}`;
    try {
        var { data } = await axios.get(url);
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
    return data;
};

const getUniformCategories = async (
    categoryName = "",
    subCategoryName = "",
    childCategoryName = "",
    fourCategoryName = "",
    fiveCategoryName = ""
) => {
    const category = categoryName ? `uniformCategoryBlocks/${categoryName}/` : "";
    const url = `/api/uniformCategories/${category}?subCategoryName=${subCategoryName}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}`;
    var { data } = await axios.get(url);
    return data;
};

const getCategories = async () => {
    const { data } = await axios.get("/api/uniformCategories/");
    return data;
};

const UniformListPage = () => {
    var [params] = useSearchParams();
    var subCategoryName = params.get("subCategoryName") || "";
    var childCategoryName = params.get("childCategoryName") || "";
    var fourCategoryName = params.get("fourCategoryName") || "";
    var fiveCategoryName = params.get("fiveCategoryName") || "";

    //const categories = ["uniforms/shirts", "uniforms/pant", "uniforms/boots"]

    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id);
        return data;
    };


    return (
        <UniformListPageComponent
            getUser={getUser}
            getUniforms={getUniforms}
            getCategories={getCategories}
            subCat={subCategoryName}
            childCat={childCategoryName}
            fourCat={fourCategoryName}
            fiveCat={fiveCategoryName}
            getUniformCategories={getUniformCategories}
            getSelectedSuppliersByCompanyName={getSelectedSuppliersByCompanyName}
        />
    )

};

export default UniformListPage;