import {
    Row, Col, Container, ListGroup, Form, Button, Tab, Tabs, TabPane,
} from "react-bootstrap";
import PaginationComponent from "../../../components/PaginationComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import FilterComponent from "../../../components/filterQueryResultOptions/FilterComponent";
import FilterUniformComponent from "../../../components/filterQueryResultOptions/FilterUniformComponent";
import BreadcrumbComponent from "../../../components/filterQueryResultOptions/BreadcrumbComponent";
import BreadcrumbUniformComponent from "../../../components/filterQueryResultOptions/BreadcrumbUniformComponent";
import QuoteComponent from "../../../components/SendEmail/QuoteComponent";
import axios from "axios";
import { useTrackEvents } from "../../trackEvents/useTrackEvents";
import QuoteSubmitComponent from "./QuoteSubmitComponent";
import UserQuoteSubmitPage from "../UserQuoteSubmitPage";
import UniformCategoriesComponent from "../../../components/UniformCategoriesComponent";
import UniformForListComponent from "../../../components/UniformForListComponent";
import UniformItemComponent from "./UniformItemComponent";
//import { addToCartUniform } from "../../../redux/actions/cartActions"

const ManageUniformsListPage = ({
    getUniforms,
    getSelectedSuppliersByCompanyName,
    userCompany,
    selectedUserId,
    uniformCategories,
    selectedUserCart,
    addToCartReduxAction,
    reduxDispatch,
    updateUniformCart,
}) => {

    const dispatch = useDispatch();
    const [uniforms, setUniforms] = useState([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [purchaseValues, setPurchaseValues] = useState([])
    const [shirtValues, setShirtValues] = useState([])
    const [pantsValues, setPantsValues] = useState([])
    const [jacketsValues, setJacketsValues] = useState([])
    const [overallsValues, setOverallsValues] = useState([])
    const [bootsValues, setBootsValues] = useState([])
    const [selectedStock, setSelectedStock] = useState([])

    const [tempShirtsCount, setTempShirtsCount] = useState(0);
    const [tempPantsCount, setTempPantsCount] = useState(0);
    const [tempJacketsCount, setTempJacketsCount] = useState(0);
    const [tempOverallsCount, setTempOverallsCount] = useState(0);
    const [tempBootsCount, setTempBootsCount] = useState(0);
    const [selectedItem, setSelectedItem] = useState()

    function handleDataFromChild(cartItems, category) {
        setSelectedItem(category)
        if (category === "SHIRTS")
            setTempShirtsCount(cartItems);
        else if (category === "PANTS")
            setTempPantsCount(cartItems);
        else if (category === "JACKETS")
            setTempJacketsCount(cartItems);
        else if (category === "OVERALLS")
            setTempOverallsCount(cartItems);
        else if (category === "BOOTS")
            setTempBootsCount(cartItems);
    }

    useEffect(() => {
        setSelectedStock(selectedUserCart?.stock)
    }, [selectedUserCart])

    useEffect(() => {
        if (selectedStock) {
            selectedStock?.map((stock) => {
                if (stock.itemName === "SHIRTS")
                    setTempShirtsCount(stock.cartCount);
                else if (stock.itemName === "PANTS")
                    setTempPantsCount(stock.cartCount);
                else if (stock.itemName === "JACKETS")
                    setTempJacketsCount(stock.cartCount);
                else if (stock.itemName === "OVERALLS")
                    setTempOverallsCount(stock.cartCount);
                else if (stock.itemName === "BOOTS")
                    setTempBootsCount(stock.cartCount);
            })
        }
    }, [selectedStock])

    useEffect(() => {
        const fetchUniformsAndBrands = async () => {
            setLoading(true);
            try {
                const uniforms = await getUniforms()
                const selectedBrands = await getSelectedSuppliersByCompanyName(userCompany);
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
            } catch (er) {
                console.log(er);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchUniformsAndBrands();
    }, [])


    const getCartCount = (item) => {
        var cartCount = 0
        if (selectedItem) {
            if (item === "SHIRTS")
                cartCount = tempShirtsCount
            else if (item === "PANTS")
                cartCount = tempPantsCount
            else if (item === "JACKETS")
                cartCount = tempJacketsCount
            else if (item === "OVERALLS")
                cartCount = tempOverallsCount
            else if (item === "BOOTS")
                cartCount = tempBootsCount
        }
        else {
            selectedStock?.map((stock) => {
                if (stock.itemName === item) {
                    cartCount = stock.cartCount
                }
            })
        }
        return cartCount;
    };

    return (
        <Container className="ms-0 mb-2 me-3" fluid style={{ maxHeight: "600px", minHeight: "600px", overflowY: "auto" }}>
            {/* <BreadcrumbUniformComponent /> */}
            <Row className="mt-3">
                <Col md={12}>
                    <Tabs
                        defaultActiveKey="SHIRTS"
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="SHIRTS" title="SHIRTS">
                            {
                                selectedStock.map((stock) => {
                                    if (stock.itemName === "SHIRTS") {
                                        return (
                                            <>
                                                <div className="mb-2" >
                                                    <label className="text-uppercase ps-2 pe-2 me-2 " style={{ backgroundColor: '#1E4881', color: 'white' }}>Total Limit     : {stock.purchaseLimit}</label>
                                                    <label className="text-uppercase ps-2 pe-2 me-2 " style={{ backgroundColor: '#1E4881', color: 'white' }}>Total Purchased : {stock.purchaseCount}</label>
                                                    <label className="text-uppercase ps-2 pe-2  " style={{ backgroundColor: '#1E4881', color: 'white' }}>Total In Cart       : {tempShirtsCount}</label>
                                                </div >
                                            </>
                                        )
                                    }
                                })
                            }
                            {
                                uniforms?.map((uniform, idx) => {
                                    if (uniform.category.includes("SHIRTS")) {
                                        return (
                                            <>
                                                <UniformItemComponent
                                                    uniform={uniform}
                                                    key={idx}
                                                    cartCount={getCartCount("SHIRTS")}
                                                    reduxDispatch={reduxDispatch}
                                                    selectedUserCart={selectedUserCart}
                                                    updateUniformCart={updateUniformCart}
                                                    addToCartReduxAction={addToCartReduxAction}
                                                    sendDataToParent={handleDataFromChild}

                                                />
                                            </>
                                        )
                                    }
                                })
                            }
                        </Tab>
                        <Tab eventKey="PANTS" title="PANTS">
                            {
                                selectedStock.map((stock) => {
                                    if (stock.itemName === "PANTS") {
                                        return (
                                            <>
                                                <div className="mb-2">
                                                    <label className="text-uppercase ps-2 pe-2 me-2" style={{ backgroundColor: '#1E4881', color: 'white' }}>Total Limit : {stock.purchaseLimit}</label>
                                                    <label className="text-uppercase ps-2 pe-2 me-2" style={{ backgroundColor: '#1E4881', color: 'white' }}>Total Purchased : {stock.purchaseCount}</label>
                                                    <label className="text-uppercase ps-2 pe-2 " style={{ backgroundColor: '#1E4881', color: 'white' }}>Total In Cart : {tempPantsCount}</label>
                                                </div>
                                            </>
                                        )
                                    }
                                })
                            }
                            {
                                uniforms?.map((uniform, idx) => {
                                    if (uniform.category.includes("PANTS")) {
                                        return (
                                            <>
                                                <UniformItemComponent
                                                    uniform={uniform}
                                                    key={idx}
                                                    cartCount={getCartCount("PANTS")}
                                                    reduxDispatch={reduxDispatch}
                                                    selectedUserCart={selectedUserCart}
                                                    updateUniformCart={updateUniformCart}
                                                    addToCartReduxAction={addToCartReduxAction}
                                                    sendDataToParent={handleDataFromChild}

                                                />
                                            </>
                                        )
                                    }
                                })
                            }
                        </Tab>
                        <Tab eventKey="JACKETS" title="JACKETS">
                            {
                                selectedStock.map((stock) => {
                                    if (stock.itemName === "JACKETS") {
                                        return (
                                            <>
                                                <div className="mb-2">
                                                    <label className="text-uppercase ps-2 pe-2 me-2" style={{ backgroundColor: '#1E4881', color: 'white' }}>Total Limit : {stock.purchaseLimit}</label>
                                                    <label className="text-uppercase ps-2 pe-2 me-2" style={{ backgroundColor: '#1E4881', color: 'white' }}>Total Purchased : {stock.purchaseCount}</label>
                                                    <label className="text-uppercase ps-2 pe-2 " style={{ backgroundColor: '#1E4881', color: 'white' }}>Total In Cart : {tempJacketsCount}</label>
                                                </div>
                                            </>
                                        )
                                    }
                                })
                            }
                            {
                                uniforms?.map((uniform, idx) => {
                                    if (uniform.category.includes("JACKETS")) {
                                        return (
                                            <>
                                                <UniformItemComponent
                                                    uniform={uniform}
                                                    key={idx}
                                                    cartCount={getCartCount("JACKETS")}
                                                    reduxDispatch={reduxDispatch}
                                                    selectedUserCart={selectedUserCart}
                                                    updateUniformCart={updateUniformCart}
                                                    addToCartReduxAction={addToCartReduxAction}
                                                    sendDataToParent={handleDataFromChild}

                                                />
                                            </>
                                        )
                                    }
                                })
                            }
                        </Tab>
                        <Tab eventKey="OVERALLS" title="OVERALLS">
                            {
                                selectedStock.map((stock) => {
                                    if (stock.itemName === "OVERALLS") {
                                        return (
                                            <>
                                                <div className="mb-2">
                                                    <label className="text-uppercase ps-2 pe-2 me-2" style={{ backgroundColor: '#1E4881', color: 'white' }}>Total Limit : {stock.purchaseLimit}</label>
                                                    <label className="text-uppercase ps-2 pe-2 me-2" style={{ backgroundColor: '#1E4881', color: 'white' }}>Total Purchased : {stock.purchaseCount}</label>
                                                    <label className="text-uppercase ps-2 pe-2 " style={{ backgroundColor: '#1E4881', color: 'white' }}>Total In Cart : {tempOverallsCount}</label>
                                                </div>
                                            </>
                                        )
                                    }
                                })
                            }
                            {
                                uniforms?.map((uniform, idx) => {
                                    if (uniform.category.includes("OVERALLS")) {
                                        return (
                                            <>
                                                <UniformItemComponent
                                                    uniform={uniform}
                                                    key={idx}
                                                    cartCount={getCartCount("OVERALLS")}
                                                    reduxDispatch={reduxDispatch}
                                                    selectedUserCart={selectedUserCart}
                                                    updateUniformCart={updateUniformCart}
                                                    addToCartReduxAction={addToCartReduxAction}
                                                    sendDataToParent={handleDataFromChild}

                                                />
                                            </>
                                        )
                                    }
                                })
                            }
                        </Tab>
                        <Tab eventKey="BOOTS" title="BOOTS">
                            {
                                selectedStock.map((stock) => {
                                    if (stock.itemName === "BOOTS") {
                                        return (
                                            <>
                                                <div className="mb-2">
                                                    <label className="text-uppercase ps-2 pe-2 me-2" style={{ backgroundColor: '#1E4881', color: 'white' }}>Total Limit : {stock.purchaseLimit}</label>
                                                    <label className="text-uppercase ps-2 pe-2 me-2" style={{ backgroundColor: '#1E4881', color: 'white' }}>Total Purchased : {stock.purchaseCount}</label>
                                                    <label className="text-uppercase ps-2 pe-2 " style={{ backgroundColor: '#1E4881', color: 'white' }}>Total In Cart : {tempBootsCount}</label>
                                                </div>
                                            </>
                                        )
                                    }
                                })
                            }
                            {
                                uniforms?.map((uniform, idx) => {
                                    if (uniform.category.includes("BOOTS")) {
                                        return (
                                            <>
                                                <UniformItemComponent
                                                    uniform={uniform}
                                                    key={idx}
                                                    cartCount={getCartCount("BOOTS")}
                                                    reduxDispatch={reduxDispatch}
                                                    selectedUserCart={selectedUserCart}
                                                    updateUniformCart={updateUniformCart}
                                                    addToCartReduxAction={addToCartReduxAction}
                                                    sendDataToParent={handleDataFromChild}

                                                />
                                            </>
                                        )
                                    }
                                })
                            }
                        </Tab>
                    </Tabs>
                    <ListGroup variant="flush">
                        {/* {uniforms.map((item, idx) => (
                            <UniformItemComponent
                                item={item}
                                key={idx}
                            changeCount={changeCount}
                            removeFromCartHandler={removeFromCartHandler}
                            />
                        ))} */}
                    </ListGroup>

                </Col>
            </Row>
        </Container >
    );
};

export default ManageUniformsListPage;