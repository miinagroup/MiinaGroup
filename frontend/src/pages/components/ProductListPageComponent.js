import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import PaginationComponent from "../../components/PaginationComponent";
import ProductForListComponent from "../../components/ProductForListComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent";

import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import FilterComponent from "../../components/filterQueryResultOptions/FilterComponent";

const ProductListPage = ({ getProducts, categories }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attrsFilter, setAttrsFilter] = useState([]); // collect category arrtibutes from DB and show on the webpage
  const [attrsFromFilter, setAttrsFromFilter] = useState([]); // collect user filter for category attributes
  const [showResetFiltersButton, setShowResetFiltersButton] = useState(false);

  const [filters, setFilters] = useState({}); // collect all filters
  const [categoriesFromFilter, setCategoriesFromFilter] = useState({}); // store sellected categories
  const [sortOption, setSortOption] = useState(""); // （“”）意思是empty string
  const [paginationLinksNumber, setPaginationLinksNumber] = useState(null);
  const [pageNum, setPageNum] = useState(null);


  // 获取category name as a parameter from URL address，如果parameter doesn't exist 就用 empty array
  const { categoryName } = useParams() || "";
  const { pageNumParam } = useParams() || 1;
  const { searchQuery } = useParams() || "";


  // 可以用来read path，然后可以判定，如果url是在 api/xxx/xxx/category/PPE之类的，就不显示 category filter
  const location = useLocation();
  const navigate = useNavigate();

  // 如果括号里的东西 有变动，则call again
  useEffect(() => {
    if (categoryName) {
      let categoryAllData = categories.find(
        (item) => item.name === categoryName.replaceAll(",", "/")
      );
      if (categoryAllData) {
        //获取main category
        let mainCategory = categoryAllData.name.split("/")[0];
        let index = categories.findIndex((item) => item.name === mainCategory);
        setAttrsFilter(categories[index].attrs);
      }
    } else {
      setAttrsFilter([]);
    }
  }, [categoryName, categories]);


  //   useEffect(() => {}, [categoriesFromFilter, categories])
  //   call back and arry with dependencies： categoriesFromFilter and categories，就是function啊 dependencies啥的，都call once again
  useEffect(() => {
    // 如果categoriesFromFilter的length greater than 0，就设置一个空的array 给setAttrsFilter 
    if (Object.entries(categoriesFromFilter).length > 0) {
      setAttrsFilter([]);
      var cat = [];
      var count;
      // read category is checked or not
      Object.entries(categoriesFromFilter).forEach(([category, checked]) => {
        if (checked) {
          // [0]就是取第一个/之前的，算是main category
          var name = category.split("/")[0];
          // 把main category push进 cat array
          cat.push(name);
          count = cat.filter((x) => x === name).length;
          // 如果对比上了，就把对应的attri array 展开
          if (count === 1) {
            var index = categories.findIndex((item) => item.name === name);
            setAttrsFilter((attrs) => [...attrs, ...categories[index].attrs]);
          }
        }
      })
    }
  }, [categoriesFromFilter, categories])

  useEffect(() => {
    getProducts(categoryName, pageNumParam, searchQuery, filters, sortOption)
      .then((products) => {
        setProducts(products.products);
        setPaginationLinksNumber(products.paginationLinksNumber);
        setPageNum(products.pageNum);
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setError(true);
      });
  }, [categoryName, pageNumParam, searchQuery, filters, sortOption]);

  // 用来handle filter，所有设置过的filter都要在这里写一遍
  const handleFilters = () => {
    // 点击filter的时候，就取消当前的pageNum，意思是：点击之后，使用当前path，但是把最后的数字换成空。\/[0-9]的意思是两个//之前必须是数字
    navigate(location.pathname.replace(/\/[0-9]+$/, ""));
    setShowResetFiltersButton(true);
    setFilters({
      category: categoriesFromFilter,
      attrs: attrsFromFilter,
      /*       price: price,
            rating: ratingsFromFilter, */
    });
  };

  const resetFilters = () => {
    setShowResetFiltersButton(false);
    setFilters({});
    window.location.href = "/product-list";
  };

  return (
    <Container /* fluid */>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            {/* 
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent setSortOption={setSortOption} />
            </ListGroup.Item>
            */}
            <ListGroup.Item>
              <FilterComponent />
            </ListGroup.Item>
            {/* 
            这个意思是：如果location 的 path name 里面没有 category 这个单词，then show category filter         
            {!location.pathname.match(/\/category/) && (
              <ListGroup.Item>
                <CategoryFilterComponent
                  setCategoriesFromFilter={setCategoriesFromFilter}
                />
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <AttributesFilterComponent
                attrsFilter={attrsFilter}
                setAttrsFromFilter={setAttrsFromFilter}
              />
            </ListGroup.Item> */}

            {/* ************ filter button *********** */}
            {/*             <ListGroup.Item>
              <Button variant="primary" onClick={handleFilters}>
                Filter
              </Button>{" "}
              {showResetFiltersButton && (
                <Button onClick={resetFilters} variant="danger">
                  Reset filters
                </Button>
              )}
            </ListGroup.Item> */}
          </ListGroup>
        </Col>
        <Col md={9}>
          <Row className="m-2" xs={1} sm={2} md={3} lg={4} /* xl={5} xxl={6} */>
            {loading ? (
              <h1>Loading products ....</h1>
            ) : error ? (
              <h1>Error while loading products. Please try again later.</h1>
            ) : (
              products.map((product) => (
                <ProductForListComponent
                  key={product._id}
                  images={product.images}
                  name={product.name}
                  price={product.price}
                  productId={product._id}
                  slrsku={product.slrsku}
                />
              ))
            )}

          </Row>
          {paginationLinksNumber > 1 ? (
            <PaginationComponent
              categoryName={categoryName}
              searchQuery={searchQuery}
              paginationLinksNumber={paginationLinksNumber}
              pageNum={pageNum}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
