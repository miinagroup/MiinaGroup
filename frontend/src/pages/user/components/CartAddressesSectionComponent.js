import { Form, ListGroup } from "react-bootstrap";
import { titleCase } from "../utils/utils";

const CartAddressesSectionComponent = ({
    setIsOpenNewAddressModal,
    setIsOpenChangeAddressModal,
    deliveryBooks,
    selectedIndex,
    handleSelect,
    chosenDeliverySite,
}) => {

    return (
        <>
        <ListGroup.Item className="p-1 ps-2">
        <h4 className="m-0 address-title">Address</h4>
        {/* <div style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
          <Button onClick={() => setIsOpenNewAddressModal(true)} className="p-1 btn-add-address" style={{ width: "100%",  maxWidth: '120px', fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            Add New Address
          </Button>
          <Button onClick={() => setIsOpenChangeAddressModal(true)} className="p-1 btn-change-address" style={{ width: "100%",  maxWidth: '120px', fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            Change Address
          </Button>
        </div> */}
      </ListGroup.Item>
      
      <ListGroup.Item
        controlid="validationLocation"
        className="p-2 ps-3 pe-3"
      >
        <Form.Label className="fw-bold">Location / Site</Form.Label>
        {deliveryBooks && <Form.Select value={selectedIndex} onChange={(e) => handleSelect(e)} style={{backgroundColor: "transparent"}}>
          {deliveryBooks[0]?.sites?.map((site, index) => {
            return <option value={index}>{site?.name.toUpperCase()}</option>
          })}
        </Form.Select>}
      </ListGroup.Item>

      <ListGroup.Item
        controlid="validationBillingAddress"
        className="p-2 ps-3 pe-3"
      >
        <Form.Label className="fw-bold">Billing Address:</Form.Label>
        <Form.Control
          as="textarea"
          className="p-0 ps-1"
          type="string"
          name="billingAddress"
          placeholder="Billing Address"
          required
          value={chosenDeliverySite && titleCase(chosenDeliverySite?.billingAddress).split(',').map(sentence => sentence.trim()).join('\n')}
          style={{ fontSize: '12px', height: "100px", background: "rgba(72, 63, 85, 0.20)" }}
          disabled
        />
        <Form.Control.Feedback type="invalid">
          Please Enter Shipping Address.{" "}
        </Form.Control.Feedback>
      </ListGroup.Item>

      <ListGroup.Item
        controlid="validationShippingAddress"
        className="p-2 ps-3 pe-3"
      >
        <Form.Label className="fw-bold">Shipping Address:</Form.Label>
        <Form.Control
          as="textarea"
          className="p-0 ps-1"
          type="string"
          name="shippingAddress"
          placeholder="Shipping Address"
          required
          value={chosenDeliverySite && titleCase(chosenDeliverySite?.deliveryAddress).split(',').map(sentence => sentence.trim()).join('\n')}
          style={{ fontSize: '12px', height: "100px", background: "rgba(72, 63, 85, 0.20)" }}
          disabled
        />
        <Form.Control.Feedback type="invalid">
          Please Enter Shipping Address.{" "}
        </Form.Control.Feedback>
      </ListGroup.Item>
      </>
    )
}

export default CartAddressesSectionComponent;