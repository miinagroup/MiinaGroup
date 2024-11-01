import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton";
import FetchAuthFromServer from "../../../components/FetchAuthFromServer";
import MaskedInput from 'react-text-mask';

const EditUserPageComponent = ({ updateUserApiRequest, fetchUser, getAllUniformRole }) => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState([]);
  const [isAdminState, setIsAdminState] = useState(false);
  const [isPD, setIsPD] = useState(false);
  const [isSiteManager, setIsSiteManager] = useState(false);
  const [isSitePerson, setIsSitePerson] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isSales, setIsSales] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [accounts, setAccounts] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isVIP, setIsVIP] = useState(false);
  const [abn, setAbn] = useState();
  const [isCreditVerified, setIsCreditVerified] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    message: "",
    error: "",
  }); // handling errors and messages
  const abnMask = [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/,' ', /\d/, /\d/, /\d/];

  const handleAbn = (e) => {
    const newValue = e.target.value;
    setAbn(newValue);
  };
  
  const { id } = useParams();
  const navigate = useNavigate();

  const isAuth = FetchAuthFromServer();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const mobile = form.mobile.value;
    const company = form.company.value;
    const location = form.location.value;
    let ipAddress = form.ipAddress.value;
    const isAdmin = form.isAdmin.checked;
    const verified = form.verified.checked;
    const isPD = form.isPD.checked;
    const isSiteManager = form.isSiteManager.checked;
    const isSitePerson = form.isSitePerson.checked;
    const isSales = form.isSales.checked;
    const isMarketing = form.isMarketing.checked;
    const isDeveloper = form.isDeveloper.checked;
    const isSuperAdmin = form.isSuperAdmin.checked;
    const isVIP = form.isVIP.checked;
    const isCreditVerified = form.isCreditVerified.checked;
    const accounts = form.accounts.checked;
    const abn = form.abn.value;
    const role = form.role.value;

    // Set ipAddress to "" if "remove" is entered
    if (ipAddress === "remove") {
      ipAddress = "";
    }

    if (event.currentTarget.checkValidity() === true) {
      updateUserApiRequest(
        id,
        name,
        lastName,
        email,
        phone,
        mobile,
        ipAddress,
        isAdmin,
        verified,
        isPD,
        isSiteManager,
        isSitePerson,
        company,
        location,
        isSales,
        isMarketing,
        isDeveloper,
        isSuperAdmin,
        isVIP,
        isCreditVerified,
        accounts,
        abn,
        role
      )
        .then((data) => {
          if (data === "user updated") {
            navigate("/admin/users");
          }
        })
        .catch((er) => {
          setUpdateUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    fetchUser(id)
      .then((data) => {
        setUser(data);
        setIsAdminState(data.isAdmin);
        setVerified(data.verified);
        setIsPD(data.isPD);
        setIsSiteManager(data.isSiteManager);
        setIsSitePerson(data.isSitePerson);
        setAccounts(data.accounts);
        setIsSales(data.isSales);
        setIsMarketing(data.isMarketing);
        setIsDeveloper(data.isDeveloper);
        setIsSuperAdmin(data.isSuperAdmin);
        setIsVIP(data.isVIP);
        setIsCreditVerified(data.isCreditVerified);
        setAbn(data.abn)
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id]);


  return (
    <Container>
      <Row className="justify-content-md-center mt-5 content-container">
        <Col md={1}>
          {/* <Link to="/admin/users" className="btn btn-info my-3">
            Go Back
          </Link> */}
          <GoBackButton />
        </Col>
        <Col md={6}>
          <h1>Edit user</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={user.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                name="lastName"
                required
                type="text"
                defaultValue={user.lastName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                defaultValue={user.email}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                name="role"
                required
                type="text"
                defaultValue={user.role}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAbn">
              <Form.Label>ABN</Form.Label>
              {/* <Form.Control
                name="abn"
                required
                type="text"
                defaultValue={abn}
              /> */}
              <MaskedInput
                mask={abnMask}
                placeholder="ABN"
                guide={false}
                value={abn}
                onChange={handleAbn}
                render={(ref, props) => <Form.Control
                  required
                  minLength={14}
                  maxLength={14}
                  type="text"
                  name="abn"
                  ref={ref}
                  {...props}
                />} 
               />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                required
                type="number"
                defaultValue={user.phone}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                name="mobile"
                required
                type="number"
                defaultValue={user.mobile}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDeliveryCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control
                name="company"
                required
                type="txt"
                defaultValue={user.company}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBillLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                name="location"
                required
                type="txt"
                defaultValue={user.location}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicipAddress">
              <Form.Label>
                IP Address (enter 'remove' to remove IP address)
              </Form.Label>
              <Form.Control
                name="ipAddress"
                required
                type="text"
                defaultValue={user.ipAddress}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIsAdmin">
              <Row>
                <Col md={2}>
                  <Form.Check
                    name="verified"
                    type="checkbox"
                    label="Verified"
                    checked={verified}
                    onChange={(e) => setVerified(e.target.checked)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Check
                    name="isAdmin"
                    type="checkbox"
                    label="Admin"
                    checked={isAdminState}
                    onChange={(e) => setIsAdminState(e.target.checked)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Check
                    name="isPD"
                    type="checkbox"
                    label="PD"
                    checked={isPD}
                    onChange={(e) => setIsPD(e.target.checked)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    name="isSiteManager"
                    type="checkbox"
                    label="Site Manager"
                    checked={isSiteManager}
                    onChange={(e) => setIsSiteManager(e.target.checked)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    name="isSitePerson"
                    type="checkbox"
                    label="Site Person"
                    checked={isSitePerson}
                    onChange={(e) => setIsSitePerson(e.target.checked)}
                  />
                </Col>
              </Row>
              <Row>
              <Col md={2}>
                  <Form.Check
                    name="isVIP"
                    type="checkbox"
                    label="isVIP"
                    checked={isVIP}
                    onChange={(e) => setIsVIP(e.target.checked)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Check
                    name="isCreditVerified"
                    type="checkbox"
                    label="isCreditVerified"
                    checked={isCreditVerified}
                    onChange={(e) => setIsCreditVerified(e.target.checked)}
                  />
                </Col>
              </Row>
            </Form.Group>

            {isAuth?.isDeveloper ? (
              <Form.Group className="mb-3" controlId="formBasicAdminAccess">
                <Row>
                  <Col md={2}>
                    <Form.Check
                      name="isSales"
                      type="checkbox"
                      label="Sales"
                      checked={isSales}
                      onChange={(e) => setIsSales(e.target.checked)}
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Check
                      name="accounts"
                      type="checkbox"
                      label="Accounts"
                      checked={accounts}
                      onChange={(e) => setAccounts(e.target.checked)}
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Check
                      name="isDeveloper"
                      type="checkbox"
                      label="Developer"
                      checked={isDeveloper}
                      onChange={(e) => setIsDeveloper(e.target.checked)}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      name="isMarketing"
                      type="checkbox"
                      label="Marketing"
                      checked={isMarketing}
                      onChange={(e) => setIsMarketing(e.target.checked)}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      name="isSuperAdmin"
                      type="checkbox"
                      label="Super Admin"
                      checked={isSuperAdmin}
                      onChange={(e) => setIsSuperAdmin(e.target.checked)}
                    />
                  </Col>
                </Row>
              </Form.Group>
            ) : null}

            {/* <Form.Group className="mb-3" controlId="formBasicVerified">
              
            </Form.Group> */}

            <Button variant="primary" type="submit">
              UPDATE
            </Button>
            {updateUserResponseState.error}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserPageComponent;
