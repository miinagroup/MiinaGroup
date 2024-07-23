import {
    Row, Col, Container, ListGroup, Button, Tab, Tabs, Form, Modal, Table, Card, Tooltip, OverlayTrigger,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-medium-image-zoom/dist/styles.css";
import FilterComponent from "../../components/filterQueryResultOptions/FilterComponent";
import FilterUniformComponent from "../../components/filterQueryResultOptions/FilterUniformComponent";
import BreadcrumbComponent from "../../components/filterQueryResultOptions/BreadcrumbComponent";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//import { getCategories } from "../../redux/actions/categoryActions";
import QuotePriceComponent from "../../components/SendEmail/QuotePriceComponent";
import { connect } from "react-redux";
import moment from "moment-timezone";
import "./SharedPages.css";
import { useTrackEvents } from "../trackEvents/useTrackEvents";

const UniformDetailsPageComponent = ({
    getUniformDetails,
    getUniformCategories,
    getUser,
    getUniformRole,
    updateUniformCart,
    getUniformCart,
    addToCartReduxAction,
    reduxDispatch,
}) => {
    const { id } = useParams();
    const [showCartMessage, setShowCartMessage] = useState(false);
    const [uniform, setUniform] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [qty, setQty] = useState(0);
    const [selectedUniform, setSelectedUniform] = useState(null);
    const [selectedSize, setSelectedSize] = useState("Please-Select");
    const [selectedColor, setSelectedColor] = useState("Please-Select");
    const [selectedStock, setSelectedStock] = useState(null);

    const [userData, setUserData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [displaySizes, setDisplaySizes] = useState([])
    const [displayColors, setDisplayColors] = useState([])
    const [maxPurchaseQuantity, setMaxPurchaseQuantity] = useState([])
    const [uniformRole, setUniformRole] = useState()
    const [user, setUser] = useState()
    const [uniformCart, setUniformCart] = useState([])
    const [purchaseLimit, setPurchaseLimit] = useState()
    const [userPurchasedCount, setUserPurchasedCount] = useState()
    const [userCartCount, setUserCartCount] = useState()
    const [updatedUserPurchase, setUpdatedUserPurchase] = useState(null)
    const [tempUserPurchasedCount, setTempUserPurchasedCount] = useState()
    const [buttonText, setButtonText] = useState("Add to cart");
    const [defaultIndex, setDefaultIndex] = useState(0)

    const navigate = useNavigate();

    //check for uniform content in cart
    const [isProduct, setIsProduct] = useState(false)
    const cartItems = useSelector((state) => state.cart.cartItems);
    useEffect(() => {
        cartItems?.map((items) => {
            if (!items.cartProducts[0].attrs.toUpperCase().includes("UNIFORM/")) {
                setIsProduct(true)
            }
        })
    }, [cartItems])

    var displayTable = [];
    var tableHeadings = [
        "SPECIFICATIONS",
        "SPECIFICATION",
        "TECHNICAL SPECIFICATIONS",
        "TECHNICAL SPECIFICATION",
        "TECHNICAL DETAILS",
    ];
    var headings = [
        "APPLICATION INFO",
        "DESCRIPTIONS",
        "DESCRIPTION",
        "FEATURES",
        "FEATURE",
        "SPECIFICATIONS",
        "SPECIFICATION",
        "TECHNICAL SPECIFICATIONS",
        "TECHNICAL SPECIFICATION",
        "TECHNICAL DETAILS",
    ];
    var sortOrder = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '3XS', '2XS', 'XS', 'S', 'M', 'L', 'XL', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL',
        '8W', '9W', '10W', '11W', '12W', '13W',
        '87 Stout', '92 Stout', '97 Stout', '102 Stout', '107 Stout', '112 Stout', '117 Stout', '122 Stout', '127 Stout', '132 Stout',
        '67 Regular', '72 Regular', '77 Regular', '82 Regular', '87 Regular', '92 Regular', '97 Regular', '102 Regular', '107 Regular', '112 Regular', '117 Regular', '122 Regular', '127 Regular', '132 Regular',
        '74 Long', '79 Long', '84 Long', '89 Long', '94 Long',
    ]
    //Tracking user Interactions
    useTrackEvents();

    useEffect(() => {
        getUniformCategories().then((data) => {
            setCategories(data)
        })
        getUser().then((data) => {
            setUser(data)
        })
            .catch((err) => setError(
                err.response.data.message ? err.response.data.message : err.response.data
            ));
    }, []);

    useEffect(() => {
        getUniformDetails(id).then((data) => {
            setUniform(data);
        })
            .catch((er) => setError(
                er.response.data.message ? er.response.data.message : er.response.data
            )
            );
    }, [id, edit])

    useEffect(() => {
        if (user) {
            // getUniformRole(user?.role).then((data) => {
            //     setUniformRole(data);
            // })
            getUniformCart(user?._id).then((data) => {
                setUniformCart(data)
            })
                .catch((err) => setError(
                    err.response.data.message ? err.response.data.message : err.response.data
                ));
        }
    }, [user]);

    useEffect(() => {
        if (uniformCart) {
            let category = uniform?.category?.split("/")[1]
            // uniformRole?.stock?.map((item) => {
            //     if (item.itemName === category) {
            //         setPurchaseLimit(item.itemLimit)
            //     }
            // })

            uniformCart?.stock?.map((item) => {
                if (item.itemName === category) {
                    setUserCartCount(item.cartCount)
                    setUserPurchasedCount(item.purchaseCount)
                    setPurchaseLimit(item.purchaseLimit)
                }
            })
        }
    }, [uniformCart]);

    useEffect(() => {
        setSizesAndColors()
    }, [uniform])

    const setSizesAndColors = () => {
        uniform.stock?.map((data) => {
            if (data !== null) {
                displaySizes.push(data?.size)
                displayColors.push(data?.color)
            }

        })
        displaySizes.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b))
        setDisplayColors(Array.from(new Set(displayColors)))
        setDisplaySizes(Array.from(new Set(displaySizes)))
    };

    // Edit product Modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleSizeChange = (event) => {
        const size = event.target.value;
        if (size !== "Please-Select") {
            const selectedColors = []
            uniform.stock?.map((item) => {
                if (item !== null && item.size === size) {
                    selectedColors.push(item.color)
                }
            })
            setDisplayColors(selectedColors)
        } else {
            setSizesAndColors()
        }
        if (size !== "Please-Select" && selectedColor !== "Please-Select") {
            let stockItem = uniform.stock.find((item) => item.size === size && item.color === selectedColor);
            let category = uniform?.category?.split("/")[1]
            stockItem = Object.assign({}, stockItem, { category: category })
            setSelectedSize(size)
            if (stockItem) {
                setSelectedStock(stockItem)
                setSelectedUniform(stockItem.attrs)
            }

        } else {
            setSelectedStock(null);
            setSelectedUniform(null)
            setSelectedSize(size)
        }
    };
    const handleColorChange = (event) => {
        const color = event.target.value;
        if (color !== "Please-Select") {
            const selectedSizes = []
            uniform.stock?.map((item) => {
                if (item !== null && item.color === color) {
                    selectedSizes.push(item.size)
                }
            })
            setDisplaySizes(selectedSizes)
        } else {
            setSizesAndColors()
        }
        if (color !== "Please-Select" && selectedSize !== "Please-Select") {
            let stockItem = uniform.stock.find((item) => item.color === color && item.size === selectedSize);
            let category = uniform?.category?.split("/")[1]
            stockItem = Object.assign({}, stockItem, { category: category })
            setSelectedColor(color)
            if (stockItem) {
                setSelectedStock(stockItem)
                setSelectedUniform(stockItem.attrs)
            }
        } else {
            setSelectedStock(null);
            setSelectedUniform(null)
            setSelectedColor(color)
        }

        images?.map((image, index) => {
            if (color?.toUpperCase().includes(image?.caption?.toUpperCase())) {
                const tempImg = images[0]
                images[0] = images[index]
                images[index] = tempImg
            }
        })
    };


    const updatePurchase = async () => {
        let category = uniform?.category?.split("/")[1]
        uniformCart?.stock?.map((item) => {
            if (item.itemName === category) {
                setTempUserPurchasedCount(userCartCount + qty)
                setUpdatedUserPurchase((current) =>
                ({
                    ...current,
                    _id: item._id,
                    itemName: item.itemName,
                    cartCount: (userCartCount + qty),
                    purchaseCount: item.purchaseCount,
                    purchaseLimit: item.purchaseLimit,
                    cartProducts: [{ ...selectedStock, quantity: qty }],
                }))
            }
        })
    };

    const addToCartHandler = async () => {
        setButtonText("Adding...");
        try {
            updatePurchase()
            await reduxDispatch(addToCartReduxAction(id, qty, selectedStock));
            setShowCartMessage(true);
            setButtonText("Added!");
            setTimeout(() => setButtonText("Add to cart"), 1000);
        } catch (error) {
            // handle error case
            setButtonText("Add to cart");
        }
    };

    useEffect(() => {
        if (updatedUserPurchase !== null) {
            const id = uniformCart._id
            updateUniformCart(id, updatedUserPurchase)
                .then((data) => {
                    if (data.message === "UniformCart updated") {
                        setUserCartCount(tempUserPurchasedCount)
                        setQty(0)
                    }
                })
                .catch((err) => setError(
                    err.response.data.message ? err.response.data.message : err.response.data
                ));
        }

    }, [updatedUserPurchase])

    const handleBlur = (e) => {
        const newValue =
            Math.round(e.target.value / uniform.saleUnit) * uniform.saleUnit;
        if (newValue > (purchaseLimit - userPurchasedCount)) {
            window.alert("Your Purchase Limit Is : " + (purchaseLimit - userPurchasedCount))
            setQty((purchaseLimit - userPurchasedCount))
        } else {
            setQty(newValue);
        }

    };

    //react-image-lightbox -starts here
    const [images, setImages] = useState([]);
    useEffect(() => {
        async function handleImages() {
            const imagesArray = [];
            if (uniform && uniform.images) {
                for (const image of uniform.images) {
                    let imagePath = image.path;

                    if (imagePath.includes("http://")) {
                        imagePath = imagePath.replace("http://", "https://");
                    }

                    try {
                        await fetchImage(imagePath);
                        imagesArray.push({
                            original: imagePath,
                            thumbnail: imagePath,
                            url: imagePath,
                            title: image.title,
                            caption: image.name,
                        });
                    } catch (error) {
                        console.error("Image failed to load:", error);
                    }
                }
            }
            setImages(imagesArray);
        }

        handleImages();
    }, [uniform]);
    console.log(images);
    async function fetchImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve({ ok: true });
            img.onerror = () => reject({ ok: false });
            img.src = url;
        });
    }

    //Existing pdf list
    const [pdfs, setPdfs] = useState([]);
    useEffect(() => {
        async function handlePdfs() {
            const pdfArray = [];
            if (uniform && uniform.pdfs) {
                for (const pdf of uniform.pdfs) {
                    if (!pdf.path) {
                        continue;
                    }
                    let pdfPath = pdf.path;
                    if (pdfPath.includes("http://")) {
                        pdfPath = pdfPath.replace("http://", "https://");
                    }
                    const isExists = await fetchPdf(pdfPath);
                    if (isExists.ok) {
                        pdfArray.push({
                            url: pdfPath,
                        });
                    }
                }
            }
            setPdfs(pdfArray);
        }
        handlePdfs();
    }, [uniform]);

    async function fetchPdf(url) {
        try {
            const response = await fetch(url);
            return response;
        } catch (error) {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        }
    }

    const [standard, setStandard] = useState([]);
    useEffect(() => {
        if (uniform?.standards) {
            if (uniform.standards.includes("/")) {
                const splittedStandards = uniform.standards.split("/");
                setStandard(splittedStandards);
            } else {
                setStandard([uniform.standards]);
            }
        }
    }, [uniform]);

    async function downloadPDF(pdfURL, pdfName) {
        if (pdfURL.includes("http:")) {
            pdfURL = pdfURL.replace("http:", "https:");
        }
        const response = await fetch(pdfURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const blobURL = window.URL.createObjectURL(blob);
        const tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", pdfName);
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }


    return (
        <Container className="content-container ms-3" fluid>
            <BreadcrumbComponent />
            <Row>
                <Col xxl={2} xl={3} lg={3} md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <FilterUniformComponent
                                categories={categories} />
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xxl={10} xl={9} lg={9} md={9} className="mb-3">
                    <Row className="mt-4 mb-4">
                        {/* ************   Filter, has removed, now just take 1 space  ***************  */}

                        {/* ************   Uniform Pictures Display Carousel  ***************  */}
                        <Col lg={4} className="m-1">
                            <ImageGallery items={images} slideToIndex={0} />
                        </Col>

                        {/* ************   Uniform Details  ***************  */}
                        <Col lg={6}>
                            <span className="categoryHD">
                                {uniform?.category?.replaceAll("/", " / ")}
                            </span>
                            <Row>
                                <ListGroup variant="flush">
                                    <ListGroup.Item >
                                        <h2 className="text-uppercase">{uniform?.name}</h2>
                                        {userData.isAdmin === true ? (
                                            <button onClick={handleShow}>Edit</button>
                                        ) : (
                                            ""
                                        )}
                                        <div style={{ display: "inline-flex", marginTop: "-2rem" }}>
                                            <Card className="me-4" style={{ width: "18rem", height: "9rem" }}>
                                                <Row className="ms-3 mb-2 mt-3">
                                                    <div
                                                        hidden={selectedSize !== "Please-Select"}
                                                        className="mt-3"
                                                        style={{ width: "100%", float: "left" }}
                                                    >
                                                        <label htmlFor="size" className="me-4">
                                                            Choose Size:
                                                        </label>
                                                        <select
                                                            id="product-select"
                                                            value={selectedSize}
                                                            onChange={handleSizeChange}
                                                        >
                                                            {uniform?.stock &&
                                                                (uniform?.stock.length === 1 ? (
                                                                    <option value={uniform?.stock[0].size}>
                                                                        {uniform?.stock[0].size}
                                                                    </option>
                                                                ) : (
                                                                    <>
                                                                        <option value="Please-Select">
                                                                            <b>Please Select</b>
                                                                        </option>
                                                                        {displaySizes?.map((size, idx) => (
                                                                            <option
                                                                                key={"productMap1" + size + idx}
                                                                                value={size}
                                                                            >
                                                                                {size}
                                                                            </option>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                        </select>
                                                    </div>
                                                    <div className="mt-3"
                                                        style={{ width: "100%", float: "left" }}
                                                        hidden={selectedSize === "Please-Select"} >

                                                        <label htmlFor="size" className="me-4">
                                                            Choose Size:
                                                        </label>
                                                        <select
                                                            id="product-select"
                                                            value={selectedSize}
                                                            onChange={handleSizeChange}
                                                        >
                                                            {uniform?.stock &&
                                                                (uniform?.stock.length === 1 ? (
                                                                    <option value={uniform?.stock[0].size}>
                                                                        {uniform?.stock[0].size}
                                                                    </option>
                                                                ) : (
                                                                    <>
                                                                        <option value="Please-Select">
                                                                            <b>Please Select</b>
                                                                        </option>
                                                                        {displaySizes?.map((size, idx) => (
                                                                            <option
                                                                                key={"productMap2" + size + idx}
                                                                                value={size}
                                                                            >
                                                                                {size}
                                                                            </option>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </Row>
                                                <Row className="ms-3 mb-3">
                                                    <div
                                                        hidden={selectedColor !== "Please-Select"}
                                                        className="mt-3"
                                                        style={{ float: "left" }}
                                                    >
                                                        <label htmlFor="color" className="me-3">
                                                            Choose Color:
                                                        </label>
                                                        <select
                                                            id="product-select"
                                                            value={selectedColor}
                                                            onChange={handleColorChange}
                                                        >
                                                            {uniform?.stock &&
                                                                (uniform?.stock.length === 1 ? (
                                                                    <option value={uniform?.stock[0].color}>
                                                                        {uniform?.stock[0].color}
                                                                    </option>
                                                                ) : (
                                                                    <>
                                                                        <option value="Please-Select">
                                                                            <b>Please Select</b>
                                                                        </option>
                                                                        {displayColors?.map((color, idx) => (
                                                                            <option
                                                                                key={"productMap1" + color + idx}
                                                                                value={color}
                                                                            >
                                                                                {color}
                                                                            </option>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                        </select>
                                                    </div>
                                                    <div className="mt-3"
                                                        style={{ float: "left" }}
                                                        hidden={selectedColor === "Please-Select"}>

                                                        <label htmlFor="color" className="me-3">
                                                            Choose Color:
                                                        </label>
                                                        <select
                                                            id="product-select"
                                                            value={selectedColor}
                                                            onChange={handleColorChange}
                                                        >
                                                            {uniform?.stock &&
                                                                (uniform?.stock.length === 1 ? (
                                                                    <option value={uniform?.stock[0].color}>
                                                                        {uniform?.stock[0].color}
                                                                    </option>
                                                                ) : (
                                                                    <>
                                                                        <option value="Please-Select">
                                                                            <b>Please Select</b>
                                                                        </option>
                                                                        {displayColors?.map((color, idx) => (
                                                                            <option
                                                                                key={"productMap2" + color + idx}
                                                                                value={color}
                                                                            >
                                                                                {color}
                                                                            </option>
                                                                        ))}
                                                                    </>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </Row>
                                            </Card>
                                            {/* <Card style={{ width: "18rem", height: "9rem" }} hidden={selectedSize === "Please-Select" || selectedColor === "Please-Select"}>
                                                <table className="table table-striped ms-2 mt-1" >
                                                    <tr>
                                                        <td><label htmlFor="brand" className="me-5">Brand:</label></td>
                                                        <td><label>{uniform?.brand}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label htmlFor="supplierCode" className="me-4">Supplier Code:</label></td>
                                                        <td><label>{uniform?.supplierCode}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label htmlFor="Price" className="me-4">Price:</label></td>
                                                        <td><label>${selectedStock?.price}</label></td>
                                                    </tr>
                                                </table>
                                            </Card> */}
                                            <Card style={{ width: "18rem", height: "9rem" }} hidden={selectedSize === "Please-Select" || selectedColor === "Please-Select"}>
                                                <table className="table table-striped ms-2 mt-1" >
                                                    <tr>
                                                        <td><label htmlFor="brand" className="me-5">Total Allowance : </label></td>
                                                        <td><label>{purchaseLimit}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label htmlFor="supplierCode" className="me-4">Total Purchased :</label></td>
                                                        <td><label>{userPurchasedCount}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><label htmlFor="supplierCode" className="me-4">Total In Cart :</label></td>
                                                        <td><label>{userCartCount}</label></td>
                                                    </tr>
                                                </table>
                                            </Card>
                                        </div>
                                        <div style={{ display: "inline-flex", marginTop: "-2rem" }}>
                                            <Card className="me-4" style={{ width: "18rem", height: "9rem" }} hidden={selectedSize === "Please-Select" || selectedColor === "Please-Select"}>

                                                {userData.isAdmin === true ? (
                                                    <Row className="ms-3 mb-2 mt-3">
                                                        {uniform.price === 0 ? null : (
                                                            <h6>Quantity :</h6>
                                                        )}
                                                        <div style={{ display: "inline-flex" }}>
                                                            <div
                                                                className="btn-group addToCartQty"
                                                                role="group"
                                                            >
                                                                <Form.Control
                                                                    type="number"
                                                                    min={0}
                                                                    max={purchaseLimit - userPurchasedCount}
                                                                    className="form-control col-0"
                                                                    value={qty}
                                                                    onBlur={handleBlur}
                                                                    onChange={(e) => setQty(e.target.value)}
                                                                    step={uniform.saleUnit}
                                                                    disabled={selectedUniform === null}
                                                                />
                                                            </div>
                                                            <div
                                                                className="ms-2"
                                                                style={{ width: "60%", float: "left" }}
                                                            >

                                                                <Button
                                                                    onClick={() => addToCartHandler()}
                                                                    className="CTL_btn btn-ripple"
                                                                    disabled={
                                                                        selectedUniform === null ||
                                                                        buttonText !== "Add to cart"
                                                                    }
                                                                >
                                                                    {buttonText}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                ) : uniform.price !== 0 ? (

                                                    // <button onClick={handleQuotePrice} className="btn btn-block btn-success">Quote</button>
                                                    <Row className="ms-3 mb-2 mt-4">
                                                        {uniform?.price === 0 ? null : (
                                                            <h6 hidden={selectedUniform === null}>
                                                                Quantity :
                                                            </h6>
                                                        )}
                                                        <div style={{ display: "inline-flex" }}>
                                                            <div
                                                                className="btn-group addToCartQty"
                                                                role="group"
                                                            >
                                                                <Form.Control
                                                                    type="number"
                                                                    min={0}
                                                                    max={purchaseLimit - (userPurchasedCount + userCartCount)}
                                                                    className="form-control col-0"
                                                                    value={qty}
                                                                    onBlur={handleBlur}
                                                                    onChange={(e) => setQty(e.target.value)}
                                                                    step={1}
                                                                    disabled={selectedUniform === null}
                                                                />
                                                            </div>
                                                            <div
                                                                className="ms-2"
                                                                style={{ width: "60%", float: "left" }}
                                                            >

                                                                <Button
                                                                    onClick={() => addToCartHandler(selectedStock)}
                                                                    className="CTL_btn btn-ripple"
                                                                    disabled={
                                                                        selectedUniform === null ||
                                                                        buttonText !== "Add to cart" ||
                                                                        isProduct
                                                                    }
                                                                >

                                                                    {buttonText}
                                                                </Button>&nbsp;
                                                                {isProduct ? (
                                                                    <OverlayTrigger
                                                                        delay={{ hide: 450, show: 200 }}
                                                                        overlay={(props) => (
                                                                            <Tooltip {...props} >
                                                                                To Enable Add To Cart Button, Please Complete Your Products Order <br />( OR )<br /> Empty Your Cart
                                                                            </Tooltip>
                                                                        )}
                                                                        placement="bottom"
                                                                    ><i class="bi bi-exclamation-circle-fill fa-lg" style={{ color: "orange" }}></i>
                                                                    </OverlayTrigger>
                                                                ) : ("")}
                                                            </div>
                                                        </div>
                                                        <span style={{ color: "red" }}>
                                                            <tr>
                                                                <td><label htmlFor="supplierCode" className="me-4">Total Allowance Left :</label></td>
                                                                <td><label>{purchaseLimit - (userPurchasedCount + userCartCount)}</label></td>
                                                            </tr>

                                                        </span>
                                                    </Row>
                                                ) : ""}

                                            </Card>

                                        </div>

                                    </ListGroup.Item>
                                </ListGroup>
                            </Row>
                            {/* <Row className="mt-3 ps-1" style={{ height: "10%" }}>
                                            {userData.isAdmin === true ? (
                                                <>
                                                    {uniform.price === 0 ? null : (
                                                        <h6>Quantity :</h6>
                                                    )}
                                                    <Col lg={2}>
                                                        <div
                                                            className="btn-group addToCartQty"
                                                            role="group"
                                                        >
                                                            <Form.Control
                                                                type="number"
                                                                min={0}
                                                                max={userPurchasedCount}
                                                                className="form-control col-0"
                                                                value={qty}
                                                                onBlur={handleBlur}
                                                                onChange={(e) => setQty(e.target.value)}
                                                                step={uniform.saleUnit}
                                                                disabled={selectedUniform === null}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={3}>
                                                        <Button
                                                            onClick={() => addToCartHandler(selectedUniform)}
                                                            className="CTL_btn btn-ripple"
                                                            disabled={
                                                                selectedUniform === null ||
                                                                buttonText !== "Add to cart"
                                                            }
                                                        >
                                                            {buttonText}
                                                        </Button>
                                                    </Col>
                                                </>
                                            ) : uniform.price !== 0 ? (

                                                // <button onClick={handleQuotePrice} className="btn btn-block btn-success">Quote</button>
                                                <>
                                                    {uniform?.price === 0 ? null : (
                                                        <h6 hidden={selectedUniform === null}>
                                                            Quantity :
                                                        </h6>
                                                    )}
                                                    <Col
                                                        lg={2}
                                                        hidden={selectedUniform === null}
                                                    >
                                                        <div
                                                            className="btn-group addToCartQty"
                                                            role="group"
                                                        >
                                                            <Form.Control
                                                                type="number"
                                                                min={0}
                                                                max={userPurchasedCount}
                                                                className="form-control col-0"
                                                                value={qty}
                                                                onBlur={handleBlur}
                                                                onChange={(e) => setQty(e.target.value)}
                                                                step={1}
                                                                disabled={selectedUniform === null}
                                                            />
                                                        </div>
                                                    </Col>
                                                    &nbsp;&nbsp;
                                                    <Col
                                                        lg={4}
                                                        hidden={selectedUniform === null}
                                                    >
                                                        <Button
                                                            onClick={() => addToCartHandler(selectedStock)}
                                                            className="CTL_btn btn-ripple"
                                                            disabled={
                                                                selectedUniform === null ||
                                                                buttonText !== "Add to cart"
                                                            }
                                                        >
                                                            {buttonText}
                                                        </Button>
                                                    </Col>
                                                </>
                                            ) : ""}
                                        </Row> */}

                            {/* ************   Uniform details with download pdf  ***************  */}
                            <Row>
                                <Col className="mt-4">
                                    <Container
                                        className="border border-light border-2"
                                        fluid
                                        style={{
                                            minHeight: "300px",
                                            maxHeight: "500px",
                                            overflowY: "auto",
                                            overflowX: "hidden",
                                        }}
                                    >
                                        <Tabs
                                            defaultActiveKey="Description"
                                            transition={false}
                                            id="noanim-tab-example"
                                            className="mb-3 product_description"
                                        >
                                            <Tab
                                                className="m-3 col-md-12"
                                                eventKey="Description"
                                                title="Specifications"
                                            >
                                                <div
                                                    style={{
                                                        whiteSpace: "pre-wrap",
                                                        textAlign: "justify",
                                                        width: "97%",
                                                        overflowWrap: "break-word",
                                                    }}
                                                >
                                                    {
                                                        <>
                                                            <div>
                                                                {uniform?.description
                                                                    ? uniform?.description
                                                                        .split("\n")
                                                                        .map((item, index) => {
                                                                            item = item.trimStart();
                                                                            if (item !== "" && item !== " ") {
                                                                                if (
                                                                                    item.includes(":") &&
                                                                                    item.charAt(0) !== "-"
                                                                                ) {
                                                                                    displayTable.push(item);
                                                                                } else if (
                                                                                    (headings.includes(
                                                                                        item.toUpperCase()
                                                                                    ) ||
                                                                                        item.charAt(0) === "<") &&
                                                                                    item.charAt(0) !== "-"
                                                                                ) {
                                                                                    return (
                                                                                        <div
                                                                                            key={"boldUppercase" + index}
                                                                                            style={{ paddingTop: "15px" }}
                                                                                        >
                                                                                            <strong>
                                                                                                {!tableHeadings.includes(
                                                                                                    item.toUpperCase()
                                                                                                )
                                                                                                    ? item.charAt(0) === "<"
                                                                                                        ? item
                                                                                                            .slice(1)
                                                                                                            .toUpperCase()
                                                                                                            .replace('""', '"')
                                                                                                        : item
                                                                                                            .toUpperCase()
                                                                                                            .replace('""', '"')
                                                                                                    : ""}
                                                                                            </strong>
                                                                                        </div>
                                                                                    );
                                                                                } else if (
                                                                                    item.includes(".") &&
                                                                                    item.charAt(0) !== "-"
                                                                                ) {
                                                                                    return (
                                                                                        <div
                                                                                            key={"Normal" + index}
                                                                                            style={{ paddingTop: "10px" }}
                                                                                        >
                                                                                            {item.trimStart()}
                                                                                        </div>
                                                                                    );
                                                                                } else {
                                                                                    return (
                                                                                        <div
                                                                                            key={"table2" + index}
                                                                                            style={{
                                                                                                textIndent: "-10px",
                                                                                                paddingLeft: "15px",
                                                                                                lineHeight: "1.6rem",
                                                                                            }}
                                                                                        >
                                                                                            <i className="bi bi-dot " />
                                                                                            {item.charAt(0) === "-"
                                                                                                ? item
                                                                                                    .slice(1)
                                                                                                    .trimStart()
                                                                                                    .replace('""', '"')
                                                                                                : item
                                                                                                    .trimStart()
                                                                                                    .replace('""', '"')}
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            }
                                                                        })
                                                                    : ""}
                                                            </div>
                                                            <div>
                                                                {displayTable.length > 0 ? (
                                                                    <h6 style={{ paddingTop: "15px" }}>
                                                                        <b>SPECIFICATIONS</b>
                                                                    </h6>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                <Table striped bordered hover>
                                                                    <tbody>
                                                                        {displayTable.length > 0
                                                                            ? displayTable.map((items, idx) => {
                                                                                if (items.includes(":")) {
                                                                                    let splitValues = items.split(":");
                                                                                    let key = splitValues[0];
                                                                                    let value = splitValues[1];
                                                                                    for (
                                                                                        let i = 2;
                                                                                        i < splitValues.length;
                                                                                        i++
                                                                                    ) {
                                                                                        value =
                                                                                            value + " : " + splitValues[i];
                                                                                    }
                                                                                    if (value !== "") {
                                                                                        return (
                                                                                            <tr key={"table1" + idx}>
                                                                                                <td
                                                                                                    style={{
                                                                                                        textAlign: "left",
                                                                                                    }}
                                                                                                >
                                                                                                    {key.toUpperCase()}
                                                                                                </td>
                                                                                                <td
                                                                                                    style={{
                                                                                                        textAlign: "left",
                                                                                                    }}
                                                                                                >
                                                                                                    {value
                                                                                                        ?.trimStart()
                                                                                                        .replace('""', '"')}
                                                                                                </td>
                                                                                            </tr>
                                                                                        );
                                                                                    } else {
                                                                                        return (
                                                                                            <tr key={"table1" + idx}>
                                                                                                <td
                                                                                                    style={{
                                                                                                        textAlign: "left",
                                                                                                        backgroundColor:
                                                                                                            "lightblue",
                                                                                                    }}
                                                                                                    colspan="2"
                                                                                                >
                                                                                                    <strong>
                                                                                                        {key.toUpperCase()}
                                                                                                    </strong>
                                                                                                </td>
                                                                                            </tr>
                                                                                        );
                                                                                    }
                                                                                }
                                                                            })
                                                                            : ""}
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </Tab>
                                            {pdfs && pdfs.length > 0 ? (
                                                <Tab eventKey="Download" title="Downloads">
                                                    {pdfs &&
                                                        pdfs.map((pdf, idx) => {
                                                            const pdfName = pdf.url?.split("/").pop(); // Get the file name from the url
                                                            return pdf.url ? (
                                                                <div
                                                                    className="border border-light border-2 m-2 p-1"
                                                                    key={"pdfDiv" + idx}
                                                                >
                                                                    <button
                                                                        onClick={() =>
                                                                            downloadPDF(pdf.url, pdfName)
                                                                        }
                                                                        className="border-0"
                                                                        key={"pdfButton" + idx}
                                                                        style={{
                                                                            backgroundColor: "transparent",
                                                                            color: "#1e4881",
                                                                        }}
                                                                    >
                                                                        <i className="bi bi-file-earmark-pdf">
                                                                            {" "}
                                                                            {pdfName}
                                                                        </i>
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            );
                                                        })}
                                                </Tab>
                                            ) : null}
                                            {/* Standards */}
                                            {uniform?.standards && uniform?.standards.length > 0 ? (
                                                <Tab eventKey="Standards" title="Standards">
                                                    <div className="border border-light border-2 m-3 p-3 d-flex justify-content-left">
                                                        {standard &&
                                                            standard?.map((item, index) => {
                                                                return (
                                                                    <img
                                                                        key={"standards" + index}
                                                                        src={`https://res.cloudinary.com/dxvwresim/image/upload/c_scale,h_120/STANDARDS/${item}.jpg`}
                                                                        target="_blank"
                                                                        alt=""
                                                                        style={{ maxWidth: "100%", height: "auto" }}
                                                                    />
                                                                );
                                                            })}
                                                    </div>
                                                </Tab>
                                            ) : null}
                                        </Tabs>
                                    </Container>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </Container >

    );
};

export default UniformDetailsPageComponent;