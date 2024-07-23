import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const RemoveFromCartComponent = ({
  productId,
  orderCreated,
  qty,
  attrs,
  price,
  removeFromCartHandler = false,
  fromPOCart = false,
  removeFromPOCartHandler,
  poCartItemId,
  fetchPOCartData,
  uniformUserId,
}) => {
  const [removing, setRemoving] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setShowErrorModal(false);
    fetchPOCartData();
    setRemoving(false);
  };

  const removeCartItem = () => {
    if (fromPOCart) {
      setRemoving(true);
      removeFromPOCartHandler(poCartItemId)
        .then(() => {
          fetchPOCartData();
          setRemoving(false);
        })
        .catch((error) => {
          setErrorMessage(`${error.message}.`);
          setShowErrorModal(true);
        });
    } else {
      removeFromCartHandler(productId, qty, price, attrs, uniformUserId);
    }
  };

  return (
    <>
      <Button
        disabled={orderCreated || removing}
        type="button"
        variant="light"
        onClick={() => removeCartItem()}
      >
        {removing ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <i className="bi bi-trash"></i>
        )}
      </Button>
      <Modal show={showErrorModal} onHide={handleClose}>
        <Modal.Header className="border-0 mb-0 pb-0" closeButton>
          <Modal.Title>Opps something ocurred:</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-0 pb-0">
          <p className="m-1 ms-0"> Failed to remove item: </p>
          <strong>{errorMessage}</strong>
          <p className="m-1 ms-0"> PLEASE CONTACT TECH TEAM !!!</p>
        </Modal.Body>
        <Modal.Footer className="border-0 mt-0 pt-0">
          <Button className="CTL_btn" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveFromCartComponent;
