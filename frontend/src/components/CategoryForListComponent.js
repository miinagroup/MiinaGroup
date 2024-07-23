import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProductForListPreviewComponent from "./ProductForListPreviewComponent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import "../pages/general.css";

const CategoryForListComponent = ({
  productId,
  name,
  slrsku,
  price,
  purchaseprice,
  images,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal && !product) {
      axios.get(`/api/products/get-one/${productId}`).then((response) => {
        setProduct(response.data);
      });
    }
  };

  // console.log("preview prodcut", product);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  const formattedPrice = price?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <div>
        <div className="mb-2">
          <div className="card mt-1">
            <div
              className="bg-image hover-zoom ripple img_hovf"
              data-mdb-ripple-color="light"
            >
              <div className="preview_button_img">
                <a href={`/product-details/${productId}`} className="w-100">
                  <img
                    src={images[0] ? images[0].path : ""}
                    className="w-100 img_hover"
                    alt=""
                  />
                </a>
                <button className="Preview_Button" onClick={toggleModal}>
                  Preview
                </button>
              </div>
            </div>
            <a href={`/product-details/${productId}`} className="w-100">
              <div className="card-body">
                <h6 className="card-title mb-3 text-uppercase">{name}</h6>
                <h6 className="card-price mb-3 mt-3 d-flex justify-content-center">
                  {price === 0 ? (
                    <span className="fw-bold">Contact Us</span>
                  ) : (
                    <span className="">Price: ${formattedPrice}</span>
                  )}
                </h6>

                <div className="d-flex justify-content-center">
                  {/* <a href={`/product-details/${productId}`} className="w-100"> */}
                  <button className="product_card_btn w-100 lh-lg">
                    VIEW PRODUCTS
                  </button>
                  {/* </a> */}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
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
          <ProductForListPreviewComponent
            product={product}
            getUser={getUser}
            addToCartReduxAction={addToCart}
            reduxDispatch={dispatch}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategoryForListComponent;
