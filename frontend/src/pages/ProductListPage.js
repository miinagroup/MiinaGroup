import ProductListPageComponent from "../components/PagesComponents/ProductListPageComponent";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const getProducts = async (
  categoryPath = "",
  pageNumParam = null,
  searchQuery = "",
  sortOrder = "",
  brandName = "",
  userInfo
) => {
  categoryPath = categoryPath.replace(/\//g, ",");
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const category = categoryPath ? `category/${categoryPath}/` : "";
  const brand = brandName ? `brand/${brandName}/` : "";
  const sort = sortOrder ? `sort/${sortOrder}/` : "";
  const url = `/api/products/${category}${brand}?pageNum=${pageNumParam}&brandName=${brandName}`;
  const urlVisitor = `/api/products/visitor/${category}${brand}?pageNum=${pageNumParam}&brandName=${brandName}`;

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
  categoryPath = ""
) => {
  categoryPath = categoryPath.replace(/\//g, ",");
  const category = categoryPath ? `categoryBlocks/${categoryPath}` : "";
  const url = `/api/categories/${category}`;
  var { data } = await axios.get(url);
  return data;
};

const ProductListPage = () => {
  var [params] = useSearchParams();
  var categoryPath = params.get("categoryPath") || "";
  var brandName = params.get("brandName") || "";
  const { categories } = useSelector((state) => state.getCategories);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    if (userInfo && userInfo._id) {
      const { data } = await axios.get(`/api/users/profile/${userInfo._id}`);
      return data;
    }
    return null;
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
      categories={categories}
      categoryPath={categoryPath}
      brandName={brandName}
      getUser={getUser}
      getProducts={getProducts}
      getProductCategories={getProductCategories}
      createQuote={createQuote}
      userInfo={userInfo}
      getProductsBySearch={getProductsBySearch}
      getProductsBySearchForVisitor={getProductsBySearchForVisitor}
    />
  );
};

export default ProductListPage;
