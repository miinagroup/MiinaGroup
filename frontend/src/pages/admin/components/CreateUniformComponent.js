import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoBackButton from "./GoBackButton";

const CreateUniformComponent = ({
    createUniformApiRequest,
    uploadImagesApiRequest,
    uploadImagesCloudinaryApiRequest,
    uploadPdfApiRequest,
    uploadPdfCloudinaryApiRequest,
}) => {
    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState(false);
    const [pdfs, setPdfs] = useState(false);
    const [isCreating, setIsCreating] = useState("");
    const [isCreatingPdf, setIsCreatingPdf] = useState("");
    const [createUniformResponseState, setCreateUniformResponseState] = useState({
        message: "",
        error: "",
    });
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
    const attrVal = useRef(null);
    const attrKey = useRef(null);
    const createNewAttrKey = useRef(null);
    const createNewAttrVal = useRef(null);

    const [rowCount, setRowCount] = useState(1);
    const handleNewProduct = () => {
        setRowCount(rowCount + 1);
    };

    const handleRemoveProduct = (idx) => {
        setRowCount((prevRowCount) => prevRowCount - 1);
    };

    const [dynamicPrices, setDynamicPrices] = useState({});
    const updateDynamicPrice = (index, field, value) => {
        const newDynamicPrices = { ...dynamicPrices };
        if (!newDynamicPrices[index]) {
            newDynamicPrices[index] = { purchasePrice: 0, margin: 0, calculatedPrice: 0 };
        }
        newDynamicPrices[index][field] = value;

        if (newDynamicPrices[index].purchasePrice && newDynamicPrices[index].margin) {
            newDynamicPrices[index].calculatedPrice = (newDynamicPrices[index].purchasePrice / (1 - (newDynamicPrices[index].margin / 100))).toFixed(2);
        }

        setDynamicPrices(newDynamicPrices);
    };

    const handlePriceChange = (index, value) => {
        const newDynamicPrices = { ...dynamicPrices };
        newDynamicPrices[index] = {
            ...newDynamicPrices[index],
            calculatedPrice: parseFloat(value),
        };
        setDynamicPrices(newDynamicPrices);
    };

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;

        const stock = [];
        for (
            let i = 0;
            i < document.querySelectorAll(".text-primary").length;
            i++
        ) {

            let price;
            if (dynamicPrices[i]?.calculatedPrice) {
                price = dynamicPrices[i].calculatedPrice;
            } else {
                price = document.getElementsByName(`price-${i}`)[0].value;
            }
            let purchaseprice;
            if (dynamicPrices[i]?.purchasePrice) {
                purchaseprice = dynamicPrices[i].purchasePrice;
            } else {
                purchaseprice = document.getElementsByName(`purchaseprice-${i}`)[0].value;
            }

            const color = document.getElementsByName(`color-${i}`)[0].value;
            const size = document.getElementsByName(`size-${i}`)[0].value;
            stock.push({
                price,
                purchaseprice,
                color,
                size,
            });
        }

        const formInputs = {
            name: form.name.value,
            description: form.description.value,
            brand: form.brand.value,
            category: form.category.value,
            supplierCode: form.supplierCode.value,
            stock: stock,
        };
        if (event.currentTarget.checkValidity() === true) {
            if (images.length > 9) {
                setIsCreating("to many files");
                return;
            }
            createUniformApiRequest(formInputs)
                .then((data) => {
                    if (images) {
                        if (process.env.NODE_ENV === "dev") {
                            uploadImagesApiRequest(images, data.uniformId)
                                .then((res) => { })
                                .catch((er) =>
                                    setIsCreating(
                                        er.response.data.message
                                            ? er.response.data.message
                                            : er.response.data
                                    )
                                );
                        } else {
                            uploadImagesCloudinaryApiRequest(images, data.uniformId);
                        }
                    }
                    if (pdfs) {
                        if (process.env.NODE_ENV === "dev") {
                            uploadPdfApiRequest(pdfs, data.uniformId)
                                .then((res) => { })
                                .catch((er) =>
                                    setIsCreatingPdf(
                                        er.response.data.message
                                            ? er.response.data.message
                                            : er.response.data
                                    )
                                );
                        } else {
                            uploadPdfCloudinaryApiRequest(pdfs, data.uniformId);
                        }
                    }
                    if (data.message === "uniform created") navigate("/admin/uniforms");
                })
                .catch((er) => {
                    setCreateUniformResponseState({
                        error: er.response.data.message
                            ? er.response.data.message
                            : er.response.data,
                    });
                });
            // console.log(formInputs);
        }

        setValidated(true);
    };

    const uploadHandlerImage = (e) => {
        setImages(e.target.files);
    };

    const uploadHandlerPdf = (pdfs) => {
        setPdfs(pdfs);
    };

    // const newCategoryHandler = (e) => {
    //     if (e.keyCode && e.keyCode === 13 && e.target.value) {
    //         reduxDispatch(newCategory(e.target.value.toUpperCase()));
    //         setTimeout(() => {
    //             let element = document.getElementById("cats");
    //             setCategoryChoosen(e.target.value);
    //             element.value = e.target.value;
    //             e.target.value = "";
    //         }, 200);
    //     }
    // };

    // const deleteCategoryHandler = () => {
    //     let element = document.getElementById("cats");
    //     reduxDispatch(deleteCategory(element.value));
    //     setCategoryChoosen("Choose category");
    // };

    const [searchTerm, setSearchTerm] = useState("");

    // const attributeValueSelected = (e) => {
    //     if (e.target.value !== "Choose attribute value") {
    //         setAttributesTableWrapper(
    //             attrKey.current.value,
    //             e.target.value,
    //             setAttributesTable
    //         );
    //     }
    // };

    // const deleteAttribute = (key) => {
    //     setAttributesTable((table) => table.filter((item) => item.key !== key));
    // };

    // const newAttrKeyHandler = (e) => {
    //     e.preventDefault();
    //     setNewAttrKey(e.target.value);
    //     addNewAttributeManually(e);
    // };

    // const newAttrValueHandler = (e) => {
    //     e.preventDefault();
    //     setNewAttrValue(e.target.value);
    //     addNewAttributeManually(e);
    // };

    // const addNewAttributeManually = (e) => {
    //     if (e.keyCode && e.keyCode === 13) {
    //         if (newAttrKey && newAttrValue) {
    //             reduxDispatch(
    //                 saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChoosen)
    //             );
    //             setAttributesTableWrapper(newAttrKey, newAttrValue, setAttributesTable);
    //             e.target.value = "";
    //             createNewAttrKey.current.value = "";
    //             createNewAttrVal.current.value = "";
    //             setNewAttrKey(false);
    //             setNewAttrValue(false);
    //         }
    //     }
    // };
    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault();
    };

    const displayImages = () => {
        return (
            images &&
            Array.from(images).map((image, index) => (
                <img
                    src={URL.createObjectURL(image)}
                    key={index}
                    alt="Selected"
                    style={{ margin: "2px", width: "19%", height: "auto" }}
                />
            ))
        );
    };

    const [selectedCategory, setSelectedCategory] = useState("");


    return (
        <Container>
            <Row className="justify-content-md-center mt-5 content-container">
                <Col md={1}>
                    <GoBackButton />
                </Col>
                <Col md={8}>
                    <h1>Create New Uniform</h1>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => checkKeyDown(e)}
                    >
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text" />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                required
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            className="mb-3"
                            controlId="formBasicSupplier"
                        >
                            {/* <Form.Control name="create_CTLSKU" type="button" /> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBrand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control name="brand" required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control name="category" required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSupplierCode">
                            <Form.Label>SupplierCode</Form.Label>
                            <Form.Control name="supplierCode" required type="text" />
                        </Form.Group>

                        {[...Array(rowCount)].map((_, index) => (
                            <>
                                <span className="text-primary">Product: {index + 1}</span>
                                <Row>
                                    <React.Fragment key={index}>
                                        <Form.Group
                                            as={Col}
                                            md="2"
                                            className="mb-3"
                                            controlId={`formBasicSize-${index}`}
                                        >
                                            <Form.Label>Size</Form.Label>
                                            <Form.Control
                                                name={`size-${index}`}
                                                required
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            className="mb-3"
                                            controlId={`formBasicColor-${index}`}
                                        >
                                            <Form.Label>Color</Form.Label>
                                            <Form.Control
                                                name={`color-${index}`}
                                                required
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            className="mb-3"
                                            controlId={`formBasicPrice-${index}`}
                                        >
                                            <Form.Label>Uniform Price</Form.Label>
                                            <Form.Control
                                                name={`price-${index}`}
                                                required
                                                type="number"
                                                step={0.01}
                                                value={
                                                    dynamicPrices[index]?.calculatedPrice || ""
                                                }
                                                onChange={(e) =>
                                                    handlePriceChange(index, e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            className="mb-3"
                                            controlId={`formBasicPurchasePrice- ${index}`}
                                        >
                                            <Form.Label>Purchase Price</Form.Label>
                                            <Form.Control
                                                name={`purchaseprice-${index}`}
                                                required
                                                type="number"
                                                step={0.01}
                                                onChange={(e) =>
                                                    updateDynamicPrice(
                                                        index,
                                                        "purchasePrice",
                                                        parseFloat(e.target.value)
                                                    )
                                                }
                                            />
                                        </Form.Group>



                                        <Form.Group as={Col} md="1" className="mb-3">
                                            <i
                                                className="bi bi-trash mt-3"
                                                onClick={() => handleRemoveProduct(index)}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            ></i>
                                        </Form.Group>
                                    </React.Fragment>
                                </Row>
                            </>
                        ))}
                        <hr />
                        <p
                            onClick={handleNewProduct}
                            style={{
                                cursor: "hand",
                                textAlign: "center",
                                fontStyle: "italic",
                            }}
                        >
                            Add a New Varient
                        </p>
                        <hr />


                        <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
                            {/* ********* Image upload ********* */}
                            <Form.Label>Images</Form.Label>

                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    maxWidth: "900px",
                                    margin: "0 auto",
                                }}
                            >
                                {displayImages()}
                            </div>

                            <Form.Control
                                required
                                type="file"
                                multiple
                                onChange={(e) => {
                                    uploadHandlerImage(e);
                                    displayImages();
                                }}
                            />
                            {isCreating}
                            {/* ********* Description PDF ********* */}
                            <br />
                            <Form.Label>Description PDF</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => uploadHandlerPdf(e.target.files)}
                            />
                            {isCreatingPdf}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>

                        <Link to="/admin/products" className="btn btn-secondary ms-5">
                            Cancel
                        </Link>
                        <p></p>
                        {createUniformResponseState.error ?? ""}
                    </Form>
                </Col>

            </Row>
        </Container>
    )

};

export default CreateUniformComponent;