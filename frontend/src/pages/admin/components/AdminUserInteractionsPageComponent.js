import { Row, Col, Form, Modal, Button, ListGroup, ButtonGroup, ListGroupItem, ButtonToolbar, Tab, Tabs, Nav, Container, Table } from "react-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { LinkContainer } from "react-router-bootstrap";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import React, { useState, useRef, useEffect } from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { useSelector } from "react-redux";
import UserInteractionForEventsComponent from "./UserInteractionForEventsComponent";
//import "@alenaksu/json-viewer";
import "./invoicePDF.css";

const AdminUserInteractionsPageComponent = ({ getUserTrackData }) => {
  const [userTrackData, setUserTrackData] = useState([]);
  const [userLoginList, setUserLoginList] = useState([])
  const [userLogoutList, setUserLogoutList] = useState([])
  const [userTrackEvents, setUserTrackEvents] = useState([])
  const [userEventsCount, setUserEventsCount] = useState([])
  const [sorting, setSorting] = useState({ field: "createdAt", order: "desc" });
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [show, setShow] = useState(false);
  const totalItems = userTrackData.length
  const ITEMS_PER_PAGE = 30
  const [currentPage, setCurrentPage] = useState(1)


  const headers = [
    { name: "No#", field: "no", sortable: false },
    { name: "Customer Name", field: "userName", sortable: true },
    { name: "Company", field: "userCompany", sortable: true },
    { name: "Login Time", field: "loginTime", sortable: true },
    { name: "Logout Time", field: "logoutTime", sortable: true },
    { name: "Total Events", field: "trackActivity.length", sortable: true },
    { name: "Events", field: "", sortable: false },

  ];

  useEffect(() => {
    getUserTrackData()
      .then((userData) => setUserTrackData(userData))
      .catch((err) =>
        console.log(
          err.response.data.message ? err.response.data.message : err.response.data
        ));
  }, [0])

  useEffect(() => {
    userTrackData.map((userData, idx) => {
      userLoginList.length = 0
      userLogoutList.length = 0
      var newLoginTime = new Date(userData.loginTime).toLocaleDateString() + " - " + new Date(userData.loginTime).toLocaleTimeString()
      var newLogoutTime = new Date(userData.logoutTime).toLocaleDateString() + " - " + new Date(userData.logoutTime).toLocaleTimeString()

      setUserLoginList((loginList) => [...loginList, newLoginTime])
      setUserLogoutList((logoutList) => [...logoutList, newLogoutTime])

      userTrackEvents.length = 0
      userEventsCount.length = 0
      var prevEvent = false
      var count = 0
      userData.trackActivity.map((track) => {
        if (!prevEvent) {
          if (track.event !== "keydown") {
            setUserTrackEvents((eventTack) => [...eventTack, track])
            prevEvent = false
            count++
          } else {
            setUserTrackEvents((eventTack) => [...eventTack, track])
            prevEvent = true
            count++
          }
        } else {
          if (track.event !== "keydown") {
            setUserTrackEvents((eventTack) => [...eventTack, track])
            prevEvent = false
            count++
          } else {
            prevEvent = true
          }
        }
      })
      setUserEventsCount((counts) => [...counts, count])
    })
  }, [userTrackData])

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (trackId) => {
    setSelectedTrackId(trackId);
    setShow(true);
  };

  const getOrderStyle = (order) => ({
    cursor: "pointer",
  });


  return (
    <>
      <Row className="content-container m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <div className="row">
            <div className="col-md-8" >
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
          <Table striped bordered hover>
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {

                userTrackData.map((userData, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      {userData.userName !== null ? (
                        <>
                          {userData.userName}
                        </>
                      ) : null}
                    </td>
                    <td>
                      {userData.userCompany}
                    </td>
                    <td>
                      {userLoginList[idx]}
                    </td>
                    <td>
                      {userLogoutList[idx]}
                    </td>
                    <td>
                      {userEventsCount[idx]}
                    </td>
                    <td
                      onclick
                      onClick={() => handleShow(userData._id)}
                      style={getOrderStyle(userData)}
                    >
                      <Button>Show Track Events</Button>

                    </td>
                  </tr>
                ))
              }


            </tbody>
          </Table>
          <Pagination
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} className="userEvents_preview_items">
        <UserInteractionForEventsComponent id={selectedTrackId} />
      </Modal>

    </>
  );
};

export default AdminUserInteractionsPageComponent;
