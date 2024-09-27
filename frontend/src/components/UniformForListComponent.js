import {
    Row,
    Col,
    Container,
    ListGroup,
    Button,
    Tab,
    Tabs,
    Form,
    Image,
    Carousel,
    Table,
    Modal,
    Dropdown,
    DropdownButton,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCartUniform } from "../redux/actions/cartActions";
import "../pages/general.css";
import UniformForListPreviewComponent from "./UniformForListPreviewComponent";

const UniformForListComponent = ({
    images,
    name,
    price,
    saleUnit,
    uniformId,
    stock,
    reduxDispatch,
    categories,
}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [uniform, setUniform] = useState(null);
    const [qty, setQty] = useState(1);
    const [selectedStock, setSelectedStock] = useState(null);
    const [buttonText, setButtonText] = useState("Add");
    const [categoryList, setCategoryList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [userNameEmail, setUserNameEmail] = useState();
    const [colors, setColors] = useState("")

    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    useEffect(() => {
        const uniqueCategories = categories?.reduce((unique, category) => {
            if (!unique.some((item) => item.name === category.name)) {
                unique.push(category);
            }
            return unique;
        }, []);

        const filteredCategories = uniqueCategories?.filter((category) => {
            return !uniqueCategories?.some(
                (otherCategory) =>
                    otherCategory.name?.startsWith(category.name + "/") &&
                    otherCategory.name !== category.name
            );
        });
        setCategoryList(filteredCategories);
    }, [categories]);

    function handleProductChange(event) {
        const attrs = event.target.value;
        if (attrs !== "choose-product") {
            const stockItem = stock.find((item) => item.attrs === attrs);
            addToCartHandler(stockItem);
        } else {
            setSelectedStock(null);
        }
    }

    const addToCartHandler = async (selectedItem) => {
        setButtonText("Adding...");
        try {
            await reduxDispatch(addToCartUniform(uniformId, qty, selectedItem));
            setButtonText("Added!");
            setTimeout(() => setButtonText("Add"), 1000);
            setQty(1);

        } catch (error) {
            // handle error case
            setButtonText("Add");
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
        if (!showModal && !uniform) {
            axios.get(`/api/uniforms/get-one/${uniformId}`).then((response) => {
                setUniform(response.data);
            });
        }
    };

    const deleteProduct = () => {
        if (window.confirm("Are you sure?")) {
            try {
                axios.delete(`/api/uniforms/admin/${uniformId}`);
                window.location.reload(true);
            } catch (err) {
                window.show("Error handling this process");
            }
        }
    };

    const updateProduct = (e) => {
        const selectedCategory = e.target.value;
        if (window.confirm("Update Product?")) {
            try {
                axios.put(`/api/uniforms/admin/updateCategory/${uniformId}`, {
                    selectedCategory,
                });
                window.location.reload(true);
            } catch (err) {
                window.show("Error handling this process");
            }
        }
    };

    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id);
        return data;
    };

    const formattedPrice = price?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const handleBlur = (e) => {
        const newValue = Math.round(e.target.value / saleUnit) * saleUnit;
        setQty(newValue);
    };
    // console.log("sortOrder", sortOrder);

    /* ***************** QUOTE PRICE *************** */
    useEffect(() => {
        getUser()
            .then((data) => {
                setUserNameEmail({
                    email: data.email,
                    name: data.name,
                });
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        let colorsArray = []
        images?.map((image) => {
            if (image.name !== undefined || image.name !== null || image.name !== "") {
                colorsArray.push(image.name)
            }
        })

        setColors(colorsArray.filter(function (element) { return element !== undefined }))
    }, [images])

    return (
        <>
            <div>
                <div className="mb-2">
                    <div className="card mt-0">
                        <div
                            className="bg-image hover-zoom ripple img_hovf"
                            data-mdb-ripple-color="light"
                        >
                            <div className="preview_button_img">
                                <a href={`/uniform-details/${uniformId}`} className="w-100">
                                    <div className="image-container">
                                        <img
                                            src={
                                                images[0]
                                                    ? images[0].path.replace(
                                                        "/upload/",
                                                        "/upload/c_fill,h_232,w_232/"
                                                    )
                                                    : ""
                                            }
                                            alt="Descriptive Alt Text"
                                            className="square-image"
                                            id={name.replace(/\s/g, "") + "_IMG"}
                                        />
                                    </div>
                                </a>
                                <div className="Preview_Div">
                                    <button className="Preview_Button" onClick={toggleModal}>
                                        Preview
                                    </button>
                                    {userInfo.isAdmin ? (
                                        <button
                                            className="Preview_Delete_Button"
                                            onClick={deleteProduct}
                                        >
                                            Delete
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            {userInfo.isAdmin ? (
                                <>
                                    <div className="Preview_Update_Div">
                                        {/* <text className="Preview_Update_Text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></text> */}
                                        <select
                                            className="Preview_Update_Button"
                                            onChange={updateProduct}
                                        >
                                            {categoryList?.map((category, idx) => {
                                                return category.name !== "" ? (
                                                    <option selected key={idx} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                ) : (
                                                    <option key={idx} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    {/* <div style={{ position:"absolute", bottom:"40%", fontWeight:"bold" }}>sort order: {sortOrder}</div> */}
                                </>
                            ) : (
                                ""
                            )}
                        </div>

                        <a href={`/uniform-details/${uniformId}`} className="w-100">
                            <div className="card-body">
                                <h6 className="card-title mb-2 text-uppercase">{name}</h6>
                                <div className="d-flex justify-content-center" >
                                    {
                                        colors ? (
                                            colors?.map((color) => (
                                                color?.includes("/") ? (
                                                    <>
                                                        <div className="d-flex justify-content-center" style={{ marginLeft: '3px' }}>
                                                            <p style={{
                                                                width: 10,
                                                                height: 20,
                                                                backgroundColor: color.split("/")[0],
                                                                borderTopLeftRadius: 10,
                                                                borderTopRightRadius: 0,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 10,
                                                            }}>
                                                            </p>
                                                            <p style={{
                                                                width: 10,
                                                                height: 20,
                                                                backgroundColor: color.split("/")[1],
                                                                borderTopLeftRadius: 0,
                                                                borderTopRightRadius: 10,
                                                                borderBottomRightRadius: 10,
                                                                borderBottomLeftRadius: 0,
                                                            }}></p>
                                                        </div>

                                                    </>

                                                ) : (
                                                    <>
                                                        <p style={{
                                                            backgroundColor: color,
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: '50%',
                                                            marginLeft: '3px'
                                                        }}></p>
                                                    </>

                                                )

                                            ))
                                        ) : ("")

                                    }

                                </div>
                            </div>
                        </a>
                    </div>
                </div >
            </div >
            <Modal
                show={showModal}
                onHide={toggleModal}
                className="preview_product_modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign: "center", width: "100%" }}>
                        {name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UniformForListPreviewComponent
                        uniform={uniform}
                        getUser={getUser}
                        addToCartReduxAction={addToCartUniform}
                        reduxDispatch={dispatch}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UniformForListComponent;