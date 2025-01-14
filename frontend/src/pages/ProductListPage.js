import ProductListPageComponent from "./components/ProductListPageComponent";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const getProducts = async (
  categoryName = "",
  pageNumParam = null,
  searchQuery = "",
  sortOrder = "",
  subCategoryName = "",
  childCategoryName = "",
  fourCategoryName = "",
  fiveCategoryName = "",
  sixCategoryName = "",
  sevenCategoryName = "",
  brandName = "",
  userInfo
) => {
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const category = categoryName ? `category/${categoryName}/` : "";
  const brand = brandName ? `brand/${brandName}/` : "";
  const sort = sortOrder ? `sort/${sortOrder}/` : "";
  
  const url = `/api/products/${category}${brand}?pageNum=${pageNumParam}&subCategoryName=${subCategoryName}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}&sixCategoryName=${sixCategoryName}&sevenCategoryName=${sevenCategoryName}&brandName=${brandName}`;
  const urlVisitor = `/api/products/visitor/${category}${brand}?pageNum=${pageNumParam}&subCategoryName=${subCategoryName}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}&sixCategoryName=${sixCategoryName}&sevenCategoryName=${sevenCategoryName}&brandName=${brandName}`;

  try {
    if (Object.keys(userInfo).length === 0) {
      var { data } = await axios.get(urlVisitor);
    } else {
      var { data } = await axios.get(url);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }

  return data;
};

const getProductCategories = async (
  categoryName = "",
  subCategoryName = "",
  childCategoryName = "",
  fourCategoryName = "",
  fiveCategoryName = "",
  sixCategoryName = "",
  sevenCategoryName = ""
) => {
  const category = categoryName ? `categoryBlocks/${categoryName}/` : "";
  const url = `/api/categories/${category}?subCategoryName=${subCategoryName}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}&sixCategoryName=${sixCategoryName}&sevenCategoryName=${sevenCategoryName}`;
  var { data } = await axios.get(url);
  return data;
};

const ProductListPage = () => {
  var [params] = useSearchParams();

  var subCategoryName = params.get("subCategoryName") || "";
  var childCategoryName = params.get("childCategoryName") || "";
  var fourCategoryName = params.get("fourCategoryName") || "";
  var fiveCategoryName = params.get("fiveCategoryName") || "";
  var sixCategoryName = params.get("sixCategoryName") || "";
  var sevenCategoryName = params.get("sevenCategoryName") || "";

  var brandName = params.get("brandName") || "";


  const { categories } = useSelector((state) => state.getCategories);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const createQuote = async (formInputs) => {
    const { data } = await axios.post(`/api/quotes/create`, { ...formInputs });
    return data;
  };

  const getProductsBySearch = async (offset, limit, searchQuery) => {
    try {
      const response = await axios.get(`/api/products/search?offset=${offset}&limit=${limit}&searchQuery=${searchQuery}`);
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  const getProductsBySearchForVisitor = async (offset, limit, searchQuery) => {
    try {
      const response = await axios.get(`/api/products/visitor/search?offset=${offset}&limit=${limit}&searchQuery=${searchQuery}`);
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProductListPageComponent
      getUser={getUser}
      getProducts={getProducts}
      categories={categories}
      subCat={subCategoryName}
      childCat={childCategoryName}
      fourCat={fourCategoryName}
      fiveCat={fiveCategoryName}
      sixCat={sixCategoryName}
      sevenCat={sevenCategoryName}
      brandName={brandName}
      getProductCategories={getProductCategories}
      createQuote={createQuote}
      userInfo={userInfo}
      getProductsBySearch={getProductsBySearch}
      getProductsBySearchForVisitor={getProductsBySearchForVisitor}
    />
  );
};

export default ProductListPage;
