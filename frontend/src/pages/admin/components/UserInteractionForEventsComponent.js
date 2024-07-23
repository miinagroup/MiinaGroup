import React, { useEffect, useState } from "react";
import { Row, Col, Form, Modal, Button, ListGroup, ButtonGroup, ListGroupItem, ButtonToolbar, Tab, Tabs, Nav, Container, Table } from "react-bootstrap";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";

const UserInteractionForEventsComponent = (id) => {

  //const [userEventTrackData, setUserEventTrackData] = useState()
  const [userAllTrackEvents, setUserAllTrackEvents] = useState([])
  const [userTrackEvents, setUserTrackEvents] = useState([])
  const [userTimeFired, setUserTimeFired] = useState([])
  const [userEventDone, setUserEventDone] = useState([])
  const [userTargetOn, setUserTargetOn] = useState([])
  //const [prevEvent, setPrevEvent] = useState(false)
  const [sorting, setSorting] = useState({ field: "createdAt", order: "desc" });

  const headers = [
    { name: "Event", field: "event", sortable: true },
    { name: "Target On", field: "targetId", sortable: true },
    { name: "Target Name", field: "targetContent", sortable: true },
    { name: "Location", field: "location", sortable: true },
    { name: "Time Fired", field: "timeFired", sortable: true },
    { name: "Time Spend", field: "timeSpend", sortable: true },
  ];

  useEffect(() => {
    const getOneUserTrackData = async (id) => {
      try {
        const { data } = await axios.get("/api/tracks/admin/" + id.id);
        //setUserEventTrackData(data);
        setUserAllTrackEvents(data.trackActivity)
      } catch (e) {
        console.log(e);
      }

    };
    getOneUserTrackData(id);
  }, [id]);

  useEffect(() => {
    userTrackEvents.length = 0
    var prevEvent = false
    userAllTrackEvents.map((track) => {
      if (!prevEvent) {
        if (track.event !== "keydown") {
          setUserTrackEvents((eventTack) => [...eventTack, track])
          prevEvent = false
        } else {
          setUserTrackEvents((eventTack) => [...eventTack, track])
          prevEvent = true
        }
      } else {
        if (track.event !== "keydown") {
          setUserTrackEvents((eventTack) => [...eventTack, track])
          prevEvent = false
        } else {
          prevEvent = true
        }
      }
    })
  }, [userAllTrackEvents])


  // console.log("userTrackEvents", userTrackEvents);

  useEffect(() => {
    userTrackEvents.map((userEvents) => {
      userTimeFired.length = 0
      const newUserTimeFired = new Date(userEvents.timeFired).toLocaleDateString() + " - " + new Date(userEvents.timeFired).toLocaleTimeString()
      setUserTimeFired((timeFired) => [...timeFired, newUserTimeFired])

      userEventDone.length = 0
      switch (userEvents.event) {
        case "mousedown":
          setUserEventDone((userEvent) => [...userEvent, "Mouse Click"])
          break;
        case "keydown":
          setUserEventDone((userEvent) => [...userEvent, "Key Press"])
          break;
        case "focus":
          setUserEventDone((userEvent) => [...userEvent, "Focus"])
          break;
        default:
          setUserEventDone((userEvent) => [...userEvent, userEvents.event])
          break;
      }

      userTargetOn.length = 0
      switch (userEvents.targetId) {
        case "home_name":
          setUserTargetOn((targetOn) => [...targetOn, "Home Button"])
          break;
        default:
          setUserTargetOn((targetOn) => [...targetOn, userEvents.targetId])
          break;

      }
    })
  }, [userTrackEvents])

  //console.log(userTrackEvents);
  return (
    <Table striped bordered hover
      style={{ width: "94%", marginLeft: "3%", marginTop: "3%", marginBottom: "2%" }}>
      {/* <thead>
        <tr>
          <th style={{ width: "8%" }}>Event</th>
          <th style={{ width: "8%" }}>Target</th>
          <th style={{ width: "8%" }}>Target ID</th>
          <th style={{ width: "15%" }}>Target Name</th>
          <th style={{ width: "35%" }}>Location</th>
          <th style={{ width: "15%" }}>Time Fired</th>
          <th style={{ width: "8%" }}>Time Spend</th>
        </tr>
      </thead> */}
      <TableHeader
        headers={headers}
        onSorting={(field, order) => setSorting({ field, order })}
      />
      {
        userTrackEvents.map((trackEvent, idx) => (
          <tbody>
            <tr key={idx}>
              <td style={{ width: "8%" }}>{userEventDone[idx]}</td>
              {
                userTargetOn[idx]?.includes('_IMG') || userTargetOn[idx]?.includes('_PRICE') ? (
                  <td style={{ width: "8%" }}>{userTargetOn[idx].split('_')[1]}</td>
                ) : (
                  <td style={{ width: "8%" }}>{userTargetOn[idx]}</td>
                )
              }
              {(trackEvent.targetType === "A" || trackEvent.targetType === "P") && trackEvent.targetContent === trackEvent.targetContent.toUpperCase() ? (
                <td style={{ width: "15%", color: "green" }}>{trackEvent.targetContent}</td>
              ) : (
                trackEvent.targetType === "H6" ? (
                  <td style={{ width: "15%", color: "blue" }}>{trackEvent.targetContent}</td>
                ) : (
                  trackEvent.targetType === "SPAN" || (trackEvent.targetType === "IMG" && trackEvent.targetId !== "home_name") && trackEvent.location.includes("subCategoryName") ? (
                    <td style={{ width: "15%", color: "blue" }}>{trackEvent.targetId.split('_')[0]}</td>
                  ) : (
                    trackEvent.targetContent === "Add to cart" || trackEvent.targetContent === "Confirm Order" ? (
                      <td style={{ width: "15%", color: "red" }}>{trackEvent.targetContent}</td>
                    ) : (
                      <td style={{ width: "15%" }}>{trackEvent.targetContent}</td>
                    )
                  )

                )

              )}

              <td style={{ width: "35%" }}>{trackEvent.location}</td>
              <td style={{ width: "15%" }}>{userTimeFired[idx]}</td>
              <td style={{ width: "8%", textAlign: "center" }}>{trackEvent.timeSpend}</td>
            </tr>
          </tbody>
        ))
      }

    </Table>
  );
};

export default UserInteractionForEventsComponent;
