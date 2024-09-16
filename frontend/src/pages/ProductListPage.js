import ProductListPageComponent from "./components/ProductListPageComponent";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
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
  brandName = "", 
  userInfo
) => {
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const category = categoryName ? `category/${categoryName}/` : "";
  const brand = brandName ? `brand/${brandName}/` : "";
  const sort = sortOrder ? `sort/${sortOrder}/` : "";
  const url = `/api/products/${category}${search}${brand}?pageNum=${pageNumParam}&subCategoryName=${subCategoryName}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}&brandName=${brandName}`;
  const urlVisitor = `/api/products/visitor/${category}${search}${brand}?pageNum=${pageNumParam}&subCategoryName=${subCategoryName}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}&brandName=${brandName}`;
  
  try {
    if(Object.keys(userInfo).length === 0) {
      var { data } = await axios.get(urlVisitor);
    } else {
      var { data } = await axios.get(url);
    }
    // console.log('Data received:', data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  // console.log('我是data,ProductListPage', data);
  // console.log('search', categoryName);

  return data;
};

const getProductCategories = async (
  categoryName = "",
  subCategoryName = "",
  childCategoryName = "",
  fourCategoryName = "",
  fiveCategoryName = ""
) => {
  const category = categoryName ? `categoryBlocks/${categoryName}/` : "";
  const url = `/api/categories/${category}?subCategoryName=${subCategoryName}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}`;
  var { data } = await axios.get(url);
  // console.log('我是data,ProductListPage', data);
  // console.log('search', categoryName);
  return data;
};

const ProductListPage = () => {
  var [params] = useSearchParams();

  var subCategoryName = params.get("subCategoryName") || "";
  var childCategoryName = params.get("childCategoryName") || "";
  var fourCategoryName = params.get("fourCategoryName") || "";
  var fiveCategoryName = params.get("fiveCategoryName") || "";

  var brandName = params.get("brandName") || "";

  // console.log(brandName);

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

  return (
    <ProductListPageComponent
      getUser={getUser}
      getProducts={getProducts}
      categories={categories}
      subCat={subCategoryName}
      childCat={childCategoryName}
      fourCat={fourCategoryName}
      fiveCat={fiveCategoryName}
      brandName={brandName}
      getProductCategories={getProductCategories}
      createQuote={createQuote}
      userInfo={userInfo}
    />
  );
};

export default ProductListPage;
