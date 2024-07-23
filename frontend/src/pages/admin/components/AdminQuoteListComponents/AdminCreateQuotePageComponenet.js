import { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

const AdminCreateQuotePageComponent = ({
  getUsers,
  getAdminDeliveryBooks,
  adminCreateQuote,
  refreshQuotes,
}) => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [quoteName, setQuoteName] = useState("");
  const [quoteDescription, setQuoteDescription] = useState("");

  const handleClose = () => {
    setShow(false);
    setQuoteName("");
    setSelectedCompany("");
    setSelectedUser(null);
    setUserSearch("");
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAdminDeliveryBooks()
      .then((adminDeliveryBooks) => {
        const companies = new Set(
          adminDeliveryBooks
            .map((book) => book.companyName)
            .filter((company) => company)
        );
        setCompanyList([...companies].sort());
      })
      .catch((err) =>
        console.log(err.response?.data?.message || err.response?.data || err)
      );
  }, []);

  useEffect(() => {
    if (show) {
      getUsers().then((fetchedUsers) => {
        setUsers(fetchedUsers);
      });
    }
  }, [show, getUsers]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        (selectedCompany ? user.company === selectedCompany : true) &&
        (user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
          user.lastName.toLowerCase().includes(userSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(userSearch.toLowerCase()))
    );
    setFilteredUsers(filtered);

    if (filtered.length === 1) {
      setSelectedUser(filtered[0]);
    }
  }, [selectedCompany, userSearch, users]);

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
    setSelectedUser("");
  };

  const handleUserSearchChange = (e) => {
    setUserSearch(e.target.value);
  };

  const handleUserSelection = (e) => {
    const userEmail = e.target.value;
    const user = users.find((user) => user.email === userEmail);
    setSelectedUser(user);
  };

  const handleQuoteNameChange = (e) => {
    setQuoteName(e.target.value);
  };

  const handleQuoteDescriptionChange = (e) => {
    setQuoteDescription(e.target.value);
  };

  const handleCreateQuote = () => {
    if (!selectedUser) return;

    setUploading(true);
    const quoteDetails = {
      userId: selectedUser._id,
      userName: `${selectedUser.name} ${selectedUser.lastName}`,
      userEmail: selectedUser.email,
      name: quoteName,
      userDescription: quoteDescription,
    };
    adminCreateQuote(quoteDetails)
      .then((quote) => {
        console.log("quote", quote);
        setUploading(false);
        setQuoteName("");
        setSelectedCompany("");
        setSelectedUser(null);
        setUserSearch("");
        refreshQuotes();
        handleClose();
      })
      .catch((err) => {
        console.log(err.response?.data?.message || err.response?.data || err);
        setUploading(false);
      });
  };

  //   console.log("user information", selectedUser);

  return (
    <>
      <Button
        variant="success"
        className="m-0 me-4 ms-4 p-0 pe-1 ps-1"
        onClick={handleShow}
      >
        Create Quote
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        className="product_replenishment_items"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Quote</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-2 pb-0">
          <Row>
            <Col md={6}>
              <Form.Label>Company Name:</Form.Label>
              <Form.Select onChange={handleCompanyChange} className="p-1 ps-2">
                <option value="">Select Company</option>
                {companyList.map((company, idx) => (
                  <option key={idx} value={company}>
                    {company}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>User's Search:</Form.Label>
              <Form.Control
                className="p-1 ps-2"
                type="text"
                placeholder="Search User by Name or Email"
                onChange={handleUserSearchChange}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={12}>
              <Form.Label>User:</Form.Label>
              <Form.Select
                onChange={handleUserSelection}
                value={selectedUser ? selectedUser.email : ""}
                className="p-1 ps-2"
              >
                <option value="">Select a user</option>
                {filteredUsers.map((user, idx) => (
                  <option
                    key={idx}
                    value={user.email}
                  >{`${user.name} ${user.lastName} (${user.email})`}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={12}>
              <Form.Label>Quote Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Quote Name"
                value={quoteName}
                onChange={handleQuoteNameChange}
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={12}>
              <Form.Label>Quote Description:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Quote Descrioption"
                value={quoteDescription}
                onChange={handleQuoteDescriptionChange}
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={12}>
              <Form.Label>Selected User:</Form.Label>
              <p>
                {selectedUser
                  ? `${selectedUser.name} ${selectedUser.lastName} (${selectedUser.email})`
                  : "Not Selected"}
              </p>
            </Col>
          </Row>

          <Button
            className="CTL_btn btn m-1"
            onClick={handleCreateQuote}
            disabled={uploading}
          >
            {uploading ? "Loading" : "Create"}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminCreateQuotePageComponent;
