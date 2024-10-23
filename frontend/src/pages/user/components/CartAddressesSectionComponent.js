import { Form, ListGroup, Button } from "react-bootstrap";
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
        <h4 className="m-0">Address</h4>
        <div style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
          <Button onClick={() => setIsOpenNewAddressModal(true)} className="p-1" style={{ width: '110px', fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            Add New Address
          </Button>
          <Button onClick={() => setIsOpenChangeAddressModal(true)} className="p-1" style={{ width: '110px', fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            Change Address
          </Button>
        </div>
      </ListGroup.Item>
      
      <ListGroup.Item
        controlid="validationLocation"
        className="p-1 ps-2"
      >
        <Form.Label className="fw-bold">Location / Site</Form.Label>
        {deliveryBooks && <Form.Select value={selectedIndex} onChange={(e) => handleSelect(e)}>
          {deliveryBooks[0]?.sites?.map((site, index) => {
            return <option value={index}>{site.name.toUpperCase()}</option>
          })}
        </Form.Select>}
      </ListGroup.Item>

      <ListGroup.Item
        controlid="validationBillingAddress"
        className="p-1 ps-2"
      >
        <Form.Label className="fw-bold">Billing Address:</Form.Label>
        <Form.Control
          as="textarea"
          className="p-0 ps-1"
          type="string"
          name="billingAddress"
          placeholder="Billing Address"
          required
          value={titleCase(chosenDeliverySite.billingAddress).split(',').map(sentence => sentence.trim()).join('\n')}
          style={{ fontSize: '12px', height: "100px" }}
          disabled
        />
        <Form.Control.Feedback type="invalid">
          Please Enter Shipping Address.{" "}
        </Form.Control.Feedback>
      </ListGroup.Item>

      <ListGroup.Item
        controlid="validationShippingAddress"
        className="p-1 ps-2"
      >
        <Form.Label className="fw-bold">Shipping Address:</Form.Label>
        <Form.Control
          as="textarea"
          className="p-0 ps-1"
          type="string"
          name="shippingAddress"
          placeholder="Shipping Address"
          required
          value={titleCase(chosenDeliverySite.deliveryAddress).split(',').map(sentence => sentence.trim()).join('\n')}
          style={{ fontSize: '12px', height: "100px" }}
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