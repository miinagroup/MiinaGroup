import { Row,Col,Form,Button,Modal } from "react-bootstrap";

const AddNewAddressModalComponent = ({
    isOpenNewAddressModal,
     handleClose, 
     setIsOpenNewAddressModal, 
     setNewDeliveryAddress,
     setNewBillingAddress,
     setIsLocationValid,
     addNewAddress,
     sameAddress,
     handleSameAddressChange,
     newDeliveryAddress,
     handleNewDeliveryAddress,
     handleLocation,
     isLocationValid,
     handleNewBillingAddress
    }) => {
    return (
        <Modal show={isOpenNewAddressModal} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          onClick={() => {
            setIsOpenNewAddressModal(false);
            setNewDeliveryAddress({
              addressLine: '',
              city: '',
              stateProvinceRegion: '',
              ZIPostalCode: '',
              country: ''
            });
            setNewBillingAddress({
              addressLine: '',
              city: '',
              stateProvinceRegion: '',
              ZIPostalCode: '',
              country: ''
            });
            setIsLocationValid(true);
          }}>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={addNewAddress}>
            <Form.Group className="mb-3" controlId="formBasicLocation">
              <Form.Label>Location / Site</Form.Label>
              <Form.Control required type="text" name="location" placeholder="Location / Site" onChange={handleLocation} isInvalid={!isLocationValid} />
              <Form.Control.Feedback type="invalid">A site with this name already exists.</Form.Control.Feedback>
            </Form.Group>

            <Form.Label>Billing address</Form.Label>
            <Row>
              <Col>
                <Form.Group controlId="formBasicAddressLine">
                  <Form.Label style={{ fontSize: "12px", color: "black" }}>Address Line</Form.Label>
                  <Form.Control required type="text" name="addressLine" placeholder="Address Line" onChange={handleNewBillingAddress} />
                </Form.Group>
              </Col>

      </Row>
      <Row col={2}>
        <Col>
        <Form.Group controlId="formBasicCity">
        <Form.Label style={{fontSize: "12px", color: "black"}}>City</Form.Label>
        <Form.Control required type="text" name="city" placeholder="City"  onChange={handleNewBillingAddress} />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="formBasicStateProvinceRegion">
        <Form.Label style={{fontSize: "12px", color: "black"}}>State</Form.Label>
        <Form.Control required type="text" name="stateProvinceRegion" placeholder="State" onChange={handleNewBillingAddress} />
      </Form.Group>
        </Col>
      </Row>
      <Row col={2}>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicZIPostalCode">
        <Form.Label style={{fontSize: "12px", color: "black"}}>Postal Code</Form.Label>
        <Form.Control required type="number" name="ZIPostalCode" placeholder="Postal Code" onChange={handleNewBillingAddress} />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label style={{fontSize: "12px", color: "black"}}>Country</Form.Label>
        <Form.Control required type="text" name="country" placeholder="Country" onChange={handleNewBillingAddress} />
      </Form.Group>
        </Col>
      </Row>

            <Form.Check
              type="checkbox"
              label="Same as Billing Address"
              checked={sameAddress}
              onChange={handleSameAddressChange}
              style={{ fontSize: "12px" }}
              className="mb-1"
            />


      <Form.Label>Delivery address</Form.Label>
      <Row>
        <Col>
        <Form.Group controlId="formBasicAddressDeliveryLine">
        <Form.Label style={{fontSize: "12px", color: "black"}}>Address Line</Form.Label>
        <Form.Control 
        required 
        type="text" 
        name="addressDeliveryLine" 
        placeholder="Address Line"
        disabled={sameAddress}
        value={newDeliveryAddress.addressLine}
        onChange={handleNewDeliveryAddress} />
        
      </Form.Group>
        </Col>
      </Row>
      <Row col={2}>
        <Col>
        <Form.Group controlId="formBasicCityDelivery">
        <Form.Label style={{fontSize: "12px", color: "black"}}>City</Form.Label>
        <Form.Control required type="text" name="cityDelivery" placeholder="City" 
          value={newDeliveryAddress.city}
          disabled={sameAddress}
        onChange={handleNewDeliveryAddress} />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="formBasicStateProvinceRegionDelivery">
        <Form.Label style={{fontSize: "12px", color: "black"}}>State</Form.Label>
        <Form.Control required type="text" name="stateProvinceRegionDelivery"  disabled={sameAddress}  value={newDeliveryAddress.stateProvinceRegion}
        placeholder="State" onChange={handleNewDeliveryAddress} />
      </Form.Group>
        </Col>
      </Row>
      <Row col={2}>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicZIPostalCodeDelivery">
        <Form.Label style={{fontSize: "12px", color: "black"}}>Postal Code</Form.Label>
        <Form.Control required type="number" name="ZIPostalCodeDelivery"
         disabled={sameAddress}  
         value={newDeliveryAddress.ZIPostalCode}                     
        placeholder="Postal Code" onChange={handleNewDeliveryAddress} />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicCountryDelivery">
        <Form.Label style={{fontSize: "12px", color: "black"}}>Country</Form.Label>
        <Form.Control required type="text" name="countryDelivery" 
         disabled={sameAddress}  value={newDeliveryAddress.country}
        placeholder="Country"  onChange={handleNewDeliveryAddress} />
      </Form.Group>
        </Col>
      </Row>

            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
              <Button variant="secondary"
                onClick={() => {
                  setIsOpenNewAddressModal(false);
                  setNewDeliveryAddress({
                    addressLine: '',
                    city: '',
                    stateProvinceRegion: '',
                    ZIPostalCode: '',
                    country: ''
                  });
                  setNewBillingAddress({
                    addressLine: '',
                    city: '',
                    stateProvinceRegion: '',
                    ZIPostalCode: '',
                    country: ''
                  });
                  setIsLocationValid(true);
                }}

              >
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save New Address
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    )
}

export default AddNewAddressModalComponent;
