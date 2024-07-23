import { Row, Col, Container, ListGroup, Form, Button } from "react-bootstrap";
import PaginationComponent from "../../components/PaginationComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import FilterComponent from "../../components/filterQueryResultOptions/FilterComponent";
import FilterUniformComponent from "../../components/filterQueryResultOptions/FilterUniformComponent";
import BreadcrumbComponent from "../../components/filterQueryResultOptions/BreadcrumbComponent";
import BreadcrumbUniformComponent from "../../components/filterQueryResultOptions/BreadcrumbUniformComponent";
import QuoteComponent from "../../components/SendEmail/QuoteComponent";
import axios from "axios";
import { useTrackEvents } from "../trackEvents/useTrackEvents";
import QuoteSubmitComponent from "../user/components/QuoteSubmitComponent";
import UserQuoteSubmitPage from "../user/UserQuoteSubmitPage";
import UniformCategoriesComponent from "../../components/UniformCategoriesComponent";
import UniformForListComponent from "../../components/UniformForListComponent";

const UniformListPageComponent = ({
    getUser,
    getUniforms,
    getCategories,
    getUniformCategories,
    getSelectedSuppliersByCompanyName,
    subCat = "",
    childCat = "",
    fourCat = "",
    fiveCat = "",
    brandName = "",
}) => {

    const dispatch = useDispatch();
    const [uniforms, setUniforms] = useState([]);
    const [uniformCategories, setUniformCategories] = useState([]);
    // const [selectedBrands, setSelectedBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [attrsFilter, setAttrsFilter] = useState([]);
    const [attrsFromFilter, setAttrsFromFilter] = useState([]);
    const [showResetFiltersButton, setShowResetFiltersButton] = useState(false);
    const [categories, setCategories] = useState([])

    const [filters, setFilters] = useState({});
    const [categoriesFromFilter, setCategoriesFromFilter] = useState({});
    const [sortOption, setSortOption] = useState("");
    const [paginationLinksNumber, setPaginationLinksNumber] = useState(null);
    const [pageNum, setPageNum] = useState(null);
    const [userNameEmail, setUserNameEmail] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [userCompany, setUserCompany] = useState();
    const [categoryList, setCategoryList] = useState([]);

    const [sortFilter, setSortFilter] = useState();
    var [params] = useSearchParams();
    var categoryName = params.get("categoryName") || "";
    var pageNumParam = params.get("pageNum") || 1;
    var searchQuery = params.get("searchQuery") || "";
    var brandName = params.get("brandName") || "";


    useTrackEvents();
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data)
        });
    }, [categoryName]);

    useEffect(() => {
        if (categoryName) {
            let categoryAllData = categories?.find(
                (item) => item.name === categoryName.replaceAll(",", "/")
            );
            if (categoryAllData) {
                let mainCategory = categoryAllData.name.split("/")[0];
                let index = categories.findIndex((item) => item.name === mainCategory);
                setAttrsFilter(categories[index].attrs);
            }
        } else {
            setAttrsFilter([]);
        }
    }, [categoryName, categories]);

    useEffect(() => {
        if (userInfo) {
            setUserNameEmail({ email: userInfo.email, name: userInfo.name });
            setIsAdmin(userInfo.isAdmin);
        }
    }, [userInfo])

    useEffect(() => {
        if (Object.entries(categoriesFromFilter).length > 0) {
            setAttrsFilter([]);
            var cat = [];
            var count;
            Object.entries(categoriesFromFilter).forEach(([category, checked]) => {
                if (checked) {
                    var name = category.split("/")[0];
                    cat.push(name);
                    count = cat.filter((x) => x === name).length;
                    if (count === 1) {
                        var index = categories.findIndex((item) => item.name === name);
                        setAttrsFilter((attrs) => [...attrs, ...categories[index].attrs]);
                    }
                }
            });
        }
    }, [categoriesFromFilter, categories]);

    useEffect(() => {
        const fetchCategoriesAndUniforms = async () => {
            setLoading(true);
            try {
                if (!searchQuery && !brandName) {
                    const categories = await getUniformCategories(
                        categoryName,
                        subCat,
                        childCat,
                        fourCat,
                        fiveCat
                    );
                    setUniformCategories(categories.map((item) => item.name));
                    if (categories?.length < 2) {
                        const uniforms = await getUniforms(
                            categoryName,
                            pageNumParam,
                            searchQuery,
                            subCat,
                            childCat,
                            fourCat,
                            fiveCat,
                            brandName
                        );
                        const selectedBrands = await getSelectedSuppliersByCompanyName(userInfo.company);
                        var filteredUniforms = []
                        if (selectedBrands && selectedBrands.length !== 0) {
                            selectedBrands[0].stock?.map((brandItem) => {
                                uniforms.uniforms?.map((uniform) => {
                                    if ((brandItem.item === uniform.category) && (brandItem.supplierName === uniform.brand)) {
                                        filteredUniforms.push(uniform)
                                    }
                                })
                            })
                        }
                        setUniforms(filteredUniforms);
                        setPaginationLinksNumber(uniforms.paginationLinksNumber);
                        setPageNum(uniforms.pageNum);
                    }
                } else {
                    const uniforms = await getUniforms(
                        categoryName,
                        pageNumParam,
                        searchQuery,
                        subCat,
                        childCat,
                        fourCat,
                        fiveCat,
                        brandName
                    );
                    const selectedBrands = await getSelectedSuppliersByCompanyName(userInfo.company);
                    var filteredUniforms = []
                    if (selectedBrands && selectedBrands.length !== 0) {
                        selectedBrands[0].stock?.map((brandItem) => {
                            uniforms.uniforms?.map((uniform) => {
                                if ((brandItem.item === uniform.category) && (brandItem.supplierName === uniform.brand)) {
                                    filteredUniforms.push(uniform)
                                }
                            })
                        })
                    }
                    setUniforms(filteredUniforms);
                    setUniformCategories([]);
                    setPaginationLinksNumber(uniforms.paginationLinksNumber);
                    setPageNum(uniforms.pageNum);
                }
            } catch (er) {
                console.log(er);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndUniforms();

    }, [
        categoryName,
        subCat,
        childCat,
        fourCat,
        fiveCat,
        pageNumParam,
        searchQuery,
    ]);

    const [filteredCategories, setFilteredCategories] = useState([]);
    useEffect(() => {
        if (uniformCategories?.length > 1) {
            let baseCategory = categoryName;
            if (subCat) baseCategory += `/${subCat}`;
            if (childCat) baseCategory += `/${childCat}`;
            if (fourCat) baseCategory += `/${fourCat}`;
            if (fiveCat) baseCategory += `/${fiveCat}`;

            const baseDepth = baseCategory.split("/").length;

            setFilteredCategories(
                uniformCategories
                    .filter((category) => {
                        const parts = category.split("/");
                        return parts.length === baseDepth + 1;
                    })
                    .map((item) => item.split("/")[baseDepth])
            );
        }
    }, [uniformCategories, categoryName, subCat, childCat, fourCat, fiveCat]);

    const minimumPrice = (stock) => {
        const priceList = []
        stock?.map((s) => {
            if (s !== null)
                priceList.push(s?.price)
        })
        return (Math.min(...priceList))
    };

    return (
        <Container className="content-container mt-2" fluid>
            <BreadcrumbUniformComponent />

            <Row>
                <Col xxl={2} xl={3} lg={3} md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <FilterUniformComponent
                                categories={categories} />
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xxl={10} xl={9} lg={9} md={9}>
                    {uniforms?.length !== 0 ? (
                        <Form className="m-2">
                            <Row>
                                <Col md={3}>
                                    {paginationLinksNumber > 1 ? (
                                        <PaginationComponent
                                            categoryName={categoryName}
                                            searchQuery={searchQuery}
                                            subCategoryName={subCat}
                                            childCategoryName={childCat}
                                            fourCategoryName={fourCat}
                                            fiveCategoryName={fiveCat}
                                            brandName={brandName}
                                            paginationLinksNumber={paginationLinksNumber}
                                            pageNum={pageNum}
                                        />
                                    ) : null}
                                </Col>
                                <Col md={3}></Col>
                                <Col md={3}></Col>
                            </Row>
                        </Form>
                    ) : (
                        ""
                    )}

                    <Row className="m-2" xs={1} md={2} lg={3} xl={4} xxl={6}>
                        {loading ? (
                            <img src="/loading-gif.gif"></img>
                        ) : uniformCategories?.length > 1 ? (
                            filteredCategories?.map((category) => (
                                <UniformCategoriesComponent
                                    key={category._id}
                                    categoryName={categoryName}
                                    category={category}
                                    subCat={subCat}
                                    childCat={childCat}
                                    fourCat={fourCat}
                                    fiveCat={fiveCat}
                                />
                            ))
                        ) : uniformCategories?.length < 2 && uniforms?.length === 0 ? null : (
                            uniforms?.map((uniform) => {
                                return (
                                    <UniformForListComponent
                                        key={uniform._id}
                                        images={uniform.images}
                                        name={uniform.name}
                                        saleUnit={uniform.saleUnit}
                                        price={minimumPrice(uniform.stock)}
                                        uniformId={uniform._id}
                                        stock={uniform.stock}
                                        reduxDispatch={dispatch}
                                        categories={categories}
                                    />
                                );
                            })
                        )}
                    </Row>
                    {!loading && uniformCategories?.length < 2 && uniforms?.length === 0 ? (
                        <div className="w-50 m-2 p-3 border rounded">
                            <UserQuoteSubmitPage fromProductList={true} />
                        </div>
                    ) : null}

                    {paginationLinksNumber > 1 ? (
                        <PaginationComponent
                            categoryName={categoryName}
                            searchQuery={searchQuery}
                            subCategoryName={subCat}
                            childCategoryName={childCat}
                            fourCategoryName={fourCat}
                            fiveCategoryName={fiveCat}
                            brandName={brandName}
                            paginationLinksNumber={paginationLinksNumber}
                            pageNum={pageNum}
                        />
                    ) : null}
                </Col>
            </Row>
        </Container>
    );
};

export default UniformListPageComponent;