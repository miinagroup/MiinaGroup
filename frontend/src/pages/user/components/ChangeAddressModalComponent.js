import { Row, Col, Form, Button, Modal } from "react-bootstrap";

const ChangeAddressModalComponent = ({
  isOpenChangeAddressModal,
  setIsOpenChangeAddressModal,
  setIsLocationValid,
  updateAddress,
  chosenDeliverySite,
  handleBillingAddress,
  billingAddress,
  handleDeliveryAddress,
  deliveryAddress
}) => {
  return (
    <Modal show={isOpenChangeAddressModal} size="lg">
      <Modal.Header closeButton onClick={() => {
        setIsOpenChangeAddressModal(false)
        setIsLocationValid(true);
      }}>
        <Modal.Title style={{ fontFamily: "GloriaHallelujah", color: "#483F55" }}>Change Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateAddress}>
          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>
              Location / Site
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="location"
              placeholder="Location"
              defaultValue={chosenDeliverySite.name}
              disabled
            />
            <div className="mt-1 px-1" style={{ color: "#521712", fontSize: "11px" }}>
              <i class="bi bi-exclamation-circle"></i>{" "}
              For security reasons, changes to the location cannot be made.
              If you still wish to proceed with a change, please contact{" "}
              <a href="mailto:sales@miinagroup.com.au" style={{ textDecoration: "underline" }}>sales@miinagroup.com.au</a>.
            </div>
          </Form.Group>


          <Form.Label>Billing Address</Form.Label>
          <Row>
            <Col>
              <Form.Group controlId="formBasicBillingAddressLine">
                <Form.Label style={{ fontSize: "12px", color: "#483F55" }}>Address Line</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="addressLine"
                  placeholder="Address Line"
                  onChange={handleBillingAddress}
                  value={billingAddress.addressLine}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBasicCity">
                <Form.Label style={{ fontSize: "12px", color: "#483F55" }}>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleBillingAddress}
                  value={billingAddress.city}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicStateProvinceRegion">
                <Form.Label style={{ fontSize: "12px", color: "#483F55" }}>State</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="stateProvinceRegion"
                  placeholder="State"
                  onChange={handleBillingAddress}
                  value={billingAddress.stateProvinceRegion}

                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formBasicZIPostalCode">
                <Form.Label style={{ fontSize: "12px", color: "#483F55" }}>Postal Code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="ZIPostalCode"
                  placeholder="Postal Code"
                  onChange={handleBillingAddress}
                  value={billingAddress.ZIPostalCode}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicCountry">
                <Form.Label style={{ fontSize: "12px", color: "#483F55" }}>Country</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="country"
                  placeholder="Country"
                  onChange={handleBillingAddress}
                  value={billingAddress.country}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicDeliveryAddress">
            <Form.Label>Delivery Address</Form.Label>
            <Row>
              <Col>
                <Form.Group controlId="formBasicDeliveryAddressLine">
                  <Form.Label style={{ fontSize: "12px", color: "#483F55" }}>Address Line</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="deliveryAddressLine"
                    placeholder="Address Line"
                    onChange={handleDeliveryAddress}
                    defaultValue={deliveryAddress.addressLine}
                  />
                </Form.Group>
              </Col>

            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicDeliveryCity">
                  <Form.Label style={{ fontSize: "12px", color: "#483F55" }}>City</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="deliveryCity"
                    placeholder="City"
                    onChange={handleDeliveryAddress}
                    defaultValue={deliveryAddress.city}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicDeliveryStateProvinceRegion">
                  <Form.Label style={{ fontSize: "12px", color: "#483F55" }}>State</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="deliveryStateProvinceRegion"
                    placeholder="State"
                    onChange={handleDeliveryAddress}
                    defaultValue={deliveryAddress.stateProvinceRegion}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicDeliveryZIPostalCode">
                  <Form.Label style={{ fontSize: "12px", color: "#483F55" }}>Postal Code</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="deliveryZIPostalCode"
                    placeholder="Postal Code"
                    onChange={handleDeliveryAddress}
                    defaultValue={deliveryAddress.ZIPostalCode}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicDeliveryCountry">
                  <Form.Label style={{ fontSize: "12px", color: "#483F55" }}>Country</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="deliveryCountry"
                    placeholder="Country"
                    onChange={handleDeliveryAddress}
                    defaultValue={deliveryAddress.country}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>

          <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
            <Button variant="secondary" onClick={() => {
              setIsOpenChangeAddressModal(false)
              setIsLocationValid(true);
            }}>
              Close
            </Button>
            <Button className="save-new-address-btn" type="submit">
              Change Address
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>

  )
}

export default ChangeAddressModalComponent;
