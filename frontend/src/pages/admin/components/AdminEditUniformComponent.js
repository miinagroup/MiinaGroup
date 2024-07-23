import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
    Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
//当更改了产品信息，就navigate去product list page
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";
import moment from "moment";
import GoBackButton from "./GoBackButton";

const onHover = {
    cursor: "pointer",
    position: "absolute",
    left: "5px",
    top: "-10px",
    transform: "scale(2.7)",
};

const AdminEditUniformComponent = ({
    fetchUniform,
    imageDeleteHandler,
    pdfDeleteHandler,
    uploadImagesApiRequest,
    uploadImagesCloudinaryApiRequest,
    uploadPdfApiRequest,
    uploadPdfCloudinaryApiRequest,
    updateUniformApiRequest,
}) => {
    const [validated, setValidated] = useState(false);
    const [uniform, setUniform] = useState({});
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
    const { id } = useParams();
    const [dynamicPrices, setDynamicPrices] = useState({});
    const [stockLength, setStockLength] = useState(0);
    const [categories, setCategories] = useState(0);
    const [imageRemoved, setImageRemoved] = useState(false);
    const [pdfRemoved, setPdfRemoved] = useState(false);
    const [isUploading, setIsUploading] = useState("");
    const [isUploadingPdf, setIsUploadingPdf] = useState("");
    const [imageUploaded, setImageUploaded] = useState(false);
    const [pdfUploaded, setPdfUploaded] = useState(false);
    const navigate = useNavigate();
    const [updateProductResponseState, setUpdateProductResponseState] = useState({
        message: "",
        error: "",
    });

    useEffect(() => {
        fetchUniform(id)
            .then((uniform) => {
                setUniform(uniform);
                // setStockLength(uniform.stock.length);
            })
            .catch((er) => console.log(er));
    }, [id, imageRemoved, imageUploaded, pdfRemoved, pdfUploaded]);

    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault();
    };

    const handlePriceChange = (index, value) => {
        const newDynamicPrices = { ...dynamicPrices };

        newDynamicPrices[index] = {
            ...newDynamicPrices[index],
            calculatedPrice: parseFloat(value),
        };
        setDynamicPrices(newDynamicPrices);
    };

    const handleRemoveStock = (index) => {
        const newStock = [...uniform.stock];
        newStock.splice(index, 1);

        const newDynamicPrices = Object.keys(dynamicPrices).reduce((acc, key) => {
            const currentIndex = parseInt(key);
            if (currentIndex > index) {
                acc[currentIndex - 1] = dynamicPrices[currentIndex];
            } else if (currentIndex < index) {
                acc[currentIndex] = dynamicPrices[currentIndex];
            }
            return acc;
        }, {});

        setDynamicPrices(newDynamicPrices);
        setUniform({ ...uniform, stock: newStock });
        setStockLength(newStock.length);
    };

    const updateDynamicPrice = (index, field, value, item) => {
        const newDynamicPrices = { ...dynamicPrices };

        if (!newDynamicPrices[index]) {
            newDynamicPrices[index] = {
                purchaseprice: item.purchaseprice,
                margin: 0,
                calculatedPrice: item.price,
            };
        }
        newDynamicPrices[index][field] = value;

        if (
            newDynamicPrices[index].purchaseprice &&
            newDynamicPrices[index].margin
        ) {
            newDynamicPrices[index].calculatedPrice = (
                newDynamicPrices[index].purchaseprice /
                (1 - newDynamicPrices[index].margin / 100)
            ).toFixed(2);
        }

        setDynamicPrices(newDynamicPrices);
    };

    const updateDynamicPriceNewStockItem = (index, field, value) => {
        const newDynamicPrices = { ...dynamicPrices };

        if (!newDynamicPrices[index]) {
            newDynamicPrices[index] = {
                purchaseprice: 0,
                margin: 0,
                calculatedPrice: 0,
            };
        }
        newDynamicPrices[index][field] = value;
        newDynamicPrices[index][field] = value;

        if (
            newDynamicPrices[index].purchaseprice
        ) {
            newDynamicPrices[index].calculatedPrice = (
                newDynamicPrices[index].purchaseprice /
                (1 - newDynamicPrices[index].margin / 100)
            ).toFixed(2);
        }

        setDynamicPrices(newDynamicPrices);
    };


    // add new product attrs in Stock
    const [rowCount, setRowCount] = useState(0);
    const handleNewProduct = () => {
        setRowCount(rowCount + 1);
    };
    const handleRemoveProduct = () => {
        setRowCount(rowCount - 1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        const stock = [];
        for (
            let i = 0;
            i < document.querySelectorAll(".stockExisting").length;
            i++
        ) {
            const _id = document.getElementsByName(`_id-${i}`)[0].value;

            let price;

            if (dynamicPrices[i]?.calculatedPrice) {
                price = dynamicPrices[i].calculatedPrice;
            } else {
                price = document.getElementsByName(`price-${i}`)[0].value;
            }

            let purchasePrice;

            if (dynamicPrices[i]?.purchasePrice) {
                purchasePrice = dynamicPrices[i].purchasePrice;
            } else {
                purchasePrice = document.getElementsByName(`purchasePrice-${i}`)[0]
                    .value;
            }

            const size = document.getElementsByName(`size-${i}`)[0].value;
            const color = document.getElementsByName(`color-${i}`)[0].value;

            stock.push({
                _id,
                price,
                purchasePrice,
                size,
                color,
            });
        }

        const stockNew = [];
        for (let i = 0; i < document.querySelectorAll(".stockNew").length; i++) {
            let price;
            if (dynamicPrices[i + stockLength]?.calculatedPrice) {
                price = dynamicPrices[i + stockLength].calculatedPrice;
            } else {
                price = document.getElementsByName(`newPrice-${i}`)[0].value;
            }
            const purchasePrice = dynamicPrices[i + stockLength].purchasePrice;
            const size = document.getElementsByName(`newSize-${i}`)[0].value;
            const color = document.getElementsByName(`newColor-${i}`)[0].value;

            stockNew.push({
                price,
                purchasePrice,
                size,
                color,
            });
        }

        const formInputs = {
            name: form.name.value,
            description: form.description.value,
            brand: form.brand.value,
            category: form.category.value,
            supplierCode: form.supplierCode.value,
            stock: [...stock, ...stockNew],
        };

        if (formInputs.category === "Choose category") {
            alert("Please choose a CATEGORY !!!!!");
            return;
        }

        if (event.currentTarget.checkValidity() === true) {
            updateUniformApiRequest(id, formInputs)
                .then((data) => {
                    if (data.message === "uniform updated") navigate("/admin/uniforms");
                })
                .catch((er) =>
                    setUpdateProductResponseState({
                        error: er.response.data.message
                            ? er.response.data.message
                            : er.response.data,
                    })
                );
        }
        setValidated(true);
    };


    return (
        <Container fluid>
            <Row className="justify-content-md-center mt-5 content-container">
                <Col md={1}>
                    <GoBackButton />
                </Col>
                <Col md={6}>
                    <h1>Edit Uniform</h1>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => checkKeyDown(e)}
                    >
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                required
                                type="text"
                                defaultValue={uniform.name}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicDescription"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                required
                                as="textarea"
                                rows={3}
                                defaultValue={uniform.description}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicBrand"
                        >
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                name="brand"
                                required
                                type="text"
                                defaultValue={uniform.brand}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicSupplierCode"
                        >
                            <Form.Label>Supplier Code</Form.Label>
                            <Form.Control
                                name="supplierCode"
                                required
                                type="text"
                                defaultValue={uniform.supplierCode}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                name="category"
                                required
                                type="text"
                                defaultValue={uniform.category}
                            />
                        </Form.Group>
                        <hr
                            style={{
                                color: "#000000",
                                backgroundColor: "#000000",
                                height: 1,
                                borderColor: "#000000",
                            }}
                        />
                        {uniform &&
                            uniform.stock &&
                            uniform.stock.map((item, index) => (
                                <div key={item._id}>
                                    <>
                                        <span className="stockExisting text-primary">
                                            Varient: {index + 1}
                                        </span>
                                        <Row>
                                            <React.Fragment>
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
                                                        defaultValue={item.size}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    as={Col}
                                                    md="2"
                                                    className="mb-3"
                                                    controlId={`formBasic_id-${index}`}
                                                    hidden
                                                >
                                                    <Form.Label>Object ID</Form.Label>
                                                    <Form.Control
                                                        name={`_id-${index}`}
                                                        required
                                                        type="text"
                                                        defaultValue={item._id}
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
                                                        type="text"
                                                        placeholder="Enter Color"
                                                        defaultValue={item.color}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    as={Col}
                                                    md="2"
                                                    className="mb-3"
                                                    controlId={`formBasicPrice-${index}`}
                                                >
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Control
                                                        name={`price-${index}`}
                                                        type="number"
                                                        placeholder="Enter Price"
                                                        defaultValue={item.price}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    as={Col}
                                                    md="2"
                                                    className="mb-3"
                                                    controlId={`formBasicPurchasePrice-${index}`}
                                                >
                                                    <Form.Label>Purchase Price</Form.Label>
                                                    <Form.Control
                                                        name={`purchasePrice-${index}`}
                                                        type="number"
                                                        placeholder="Enter Purchase Price"
                                                        defaultValue={item.purchasePrice}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    as={Col}
                                                    md="2"
                                                    className="mb-3"
                                                    controlId={`formBasicMargin-${index}`}
                                                >
                                                    <Form.Label>Margin (%)</Form.Label>
                                                    <Form.Control
                                                        name={`margin-${index}`}
                                                        type="number"
                                                        onChange={(e) =>
                                                            updateDynamicPrice(
                                                                index,
                                                                "margin",
                                                                parseFloat(e.target.value),
                                                                item
                                                            )
                                                        }
                                                        defaultValue={(item.price - item.purchasePrice) / item.purchasePrice * 100}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} md="1" className="mb-3">
                                                    <i
                                                        className="bi bi-trash mt-3"
                                                        // onClick={() => setSelectedStock(item)}
                                                        onClick={() => handleRemoveStock(index)}
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    ></i>
                                                </Form.Group>

                                            </React.Fragment>
                                        </Row>
                                    </>
                                </div>
                            ))}

                        {/* add new product */}
                        {[...Array(rowCount)].map((_, index) => (
                            <>
                                <span className="stockNew text-primary">
                                    New Varient: {index + 1}
                                </span>
                                <Row>
                                    <React.Fragment key={index}>
                                        <Form.Group
                                            as={Col}
                                            md="2"
                                            className="mb-3"
                                            controlId={`formBasicNewSize-${index}`}
                                        >
                                            <Form.Label>Size</Form.Label>
                                            <Form.Control
                                                name={`newSize-${index}`}
                                                required
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="3"
                                            className="mb-3"
                                            controlId={`formBasicNewColor-${index}`}
                                        >
                                            <Form.Label>Color</Form.Label>
                                            <Form.Control
                                                name={`newColor-${index}`}
                                                required
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="2"
                                            className="mb-3"
                                            controlId={`formBasicNewPrice-${index}`}
                                        >
                                            <Form.Label className="text-danger">
                                                Price
                                            </Form.Label>
                                            <Form.Control
                                                name={`newPrice-${index}`}
                                                required
                                                type="number"
                                                value={
                                                    dynamicPrices[index + uniform.stock.length]
                                                        ?.calculatedPrice ?? ""
                                                }
                                                onChange={(e) =>
                                                    handlePriceChange(
                                                        index + uniform.stock.length,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="2"
                                            className="mb-3"
                                            controlId={`formPurchaseNewPrice-${index}`}
                                        >
                                            <Form.Label className="text-danger">
                                                Purchase Price
                                            </Form.Label>
                                            <Form.Control
                                                name={`newPurchasePrice-${index}`}
                                                required
                                                type="number"
                                                onChange={(e) =>
                                                    updateDynamicPriceNewStockItem(
                                                        index + uniform.stock.length,
                                                        "purchaseprice",
                                                        parseFloat(e.target.value)
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="2"
                                            className="mb-3"
                                            controlId={`formBasicMargin-${index}`}
                                        >
                                            <Form.Label>Margin (%)</Form.Label>
                                            <Form.Control
                                                name={`newMargin-${index}`}
                                                type="number"
                                                onChange={(e) =>
                                                    updateDynamicPriceNewStockItem(
                                                        index + uniform.stock.length,
                                                        "margin",
                                                        parseFloat(e.target.value)
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" className="mb-3">
                                            <i
                                                className="bi bi-trash mt-3"
                                                onClick={handleRemoveProduct}
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
                                cursor: "pointer",
                                textAlign: "center",
                                fontStyle: "italic",
                            }}
                        >
                            Add New Varient
                        </p>
                        <hr />

                        {/* ********* Documents upload ********* */}
                        <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
                            {/* ********* images upload ********* */}
                            <Form.Label>Images</Form.Label>
                            <Row>
                                {uniform.images &&
                                    uniform.images?.map((image, idx) => (
                                        <Col key={idx} style={{ position: "relative" }} xs={3}>
                                            <Image
                                                crossOrigin="anonymous"
                                                src={image?.path ?? null}
                                                fluid
                                            />
                                            <i
                                                style={onHover}
                                                onClick={() =>
                                                    imageDeleteHandler(image?.path, id).then((data) =>
                                                        setTimeout(setImageRemoved, 5000),
                                                        setImageRemoved(!imageRemoved)
                                                    )
                                                }
                                                className="bi bi-x text-danger"
                                            ></i>
                                        </Col>
                                    ))}
                            </Row>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => {
                                    setIsUploading("upload files in progress ...");
                                    if (process.env.NODE_ENV === "developer") {
                                        // TODO: change to !==  ===
                                        uploadImagesApiRequest(e.target.files, id)
                                            .then((data) => {
                                                setIsUploading("upload file completed");
                                                setTimeout(setImageUploaded, 7000);
                                                setImageUploaded(!imageUploaded);
                                            })
                                            .catch((er) =>
                                                setIsUploading(
                                                    er.response.data.message
                                                        ? er.response.data.message
                                                        : er.response.data
                                                )
                                            );
                                    } else {
                                        uploadImagesCloudinaryApiRequest(e.target.files, id);
                                        setIsUploading(
                                            "upload file completed. wait for the result take effect, refresh also if neccassry"
                                        );
                                        setTimeout(setImageUploaded, 7000);
                                        setImageUploaded(!imageUploaded);
                                    }
                                }}
                            />
                            {isUploading}
                        </Form.Group>
                        {/* ********* Description PDF ********* */}
                        <Form.Group controlId="formFileMultiplePDF" className="mb-3 mt-3">
                            <Form.Label>PDF</Form.Label>
                            <Row>
                                {uniform.pdfs &&
                                    uniform.pdfs.map((pdf, idx) => {
                                        const pdfName = pdf.path && pdf.path.split("/").pop();
                                        return (
                                            <Col key={idx} style={{ position: "relative" }} xs={3}>
                                                <i className="bi bi-file-pdf">{pdfName}</i>{" "}
                                                <i
                                                    style={onHover}
                                                    onClick={() =>
                                                        pdfDeleteHandler(pdf.path, id).then((data) =>
                                                            setTimeout(setPdfRemoved, 5000),
                                                            setPdfRemoved(!pdfRemoved)
                                                        )
                                                    }
                                                    className="bi bi-x text-danger"
                                                ></i>
                                            </Col>
                                        );
                                    })}
                            </Row>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => {
                                    setIsUploadingPdf("upload files in progress ...");
                                    if (process.env.NODE_ENV === "dev") {
                                        // TODO: change to !==
                                        uploadPdfApiRequest(e.target.files, id)
                                            .then((data) => {
                                                setIsUploadingPdf("upload file completed");
                                                setTimeout(setPdfUploaded, 7000);
                                                setPdfUploaded(!pdfUploaded);

                                            })
                                            .catch((er) =>
                                                setIsUploadingPdf(
                                                    er.response.data.message
                                                        ? er.response.data.message
                                                        : er.response.data
                                                )
                                            );
                                    } else {
                                        uploadPdfCloudinaryApiRequest(e.target.files, id);
                                        setIsUploadingPdf(
                                            "upload file completed. wait for the result take effect, refresh also if neccassry"
                                        );
                                        setTimeout(setPdfUploaded, 5000);
                                        setPdfUploaded(!pdfUploaded);
                                    }
                                }}
                            />
                            {isUploadingPdf}
                        </Form.Group>

                        <Button className="mb-3" variant="primary" type="submit">
                            UPDATE
                        </Button>

                        <Link to="/admin/uniforms" className="btn btn-secondary mb-3 ms-5">
                            Cancel
                        </Link>
                        <p></p>
                        {updateProductResponseState.error ?? ""}

                    </Form>

                </Col>

            </Row>
        </Container >
    )
};

export default AdminEditUniformComponent;