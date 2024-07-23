import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";
import axios from "axios";

const WeathersComponent = ({ fetchWeathers, deleteDeliveryBook }) => {
  const [weathers, setWeathers] = useState([]);
  const [deliveryBookDeleted, setDeliveryBookDeleted] = useState(false);

  const deleteHandler = async (deliveryBookId) => {
    if (window.confirm("Are You Sure")) {
      const data = await deleteDeliveryBook(deliveryBookId);
      if (data.message === "Delivery Book Deleted") {
        setDeliveryBookDeleted(!deliveryBookDeleted);
        window.location.reload(false);
      }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchWeathers(abctrl)
      .then((res) => setWeathers(res))
      .catch((er) => {
        if (er.code === "ERR_CANCELED") {
          // console.log("Fetch request was cancelled");
        } else if (er.response) {
          console.log(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          );
        } else {
          console.log(er);
        }
      });
    return () => abctrl.abort();
  }, [deliveryBookDeleted]);

  const [updatingMinerals, setUpdatingMinerals] = useState(false);
  const [updatingStocks, setUpdatingStocks] = useState(false);
  const [updatingWeathers, setUpdatingWeathers] = useState(false);
  const [buttonMessage, setButtonMessage] = useState("Updating");

  const renewMineralsPrice = async () => {
    setUpdatingMinerals(true);
    try {
      const response = await axios.put(
        "/api/mineralSharePrice/updateMineralsPrice"
      );
      console.log(response.data);
      setUpdatingMinerals(false);
    } catch (error) {
      setButtonMessage(error);
      console.error(error);
    }
  };

  const renewStocksPrice = async () => {
    setUpdatingStocks(true);
    try {
      const response = await axios.put(
        "/api/mineralSharePrice/updateStocksPrice"
      );
      console.log(response.data);
      setUpdatingStocks(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renewWeathersForecast = async () => {
    setUpdatingWeathers(true);
    try {
      const response = await axios.put("/api/weather/update");
      console.log(response.data);
      setUpdatingWeathers(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>
          Weathers Locations{" "}
          <LinkContainer to="/admin/create-new-weather">
            <Button
              variant="success"
              className="m-0 me-2 ms-2 p-0 pe-1 ps-1"
              size="lg"
            >
              Create New
            </Button>
          </LinkContainer>
          <Button
            className="m-0 me-2 ms-2 p-0 pe-1 ps-1"
            variant="warning"
            onClick={renewMineralsPrice}
            disabled={updatingMinerals === true}
          >
            {updatingMinerals === true ? buttonMessage : "Renew Minerals Price"}
          </Button>
          <Button
            className="m-0 me-2 ms-2 p-0 pe-1 ps-1"
            variant="warning"
            onClick={renewStocksPrice}
            disabled={updatingStocks === true}
          >
            {updatingStocks === true ? buttonMessage : "Renew Stocks Price"}
          </Button>
          <Button
            className="m-0 me-2 ms-2 p-0 pe-1 ps-1"
            variant="warning"
            onClick={renewWeathersForecast}
            disabled={updatingWeathers === true}
          >
            {updatingWeathers === true ? buttonMessage : "Renew Weathers"}
          </Button>
        </h1>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th width="30%">Company Name</th>
              <th width="30%">Site Name</th>
              <th width="30%">Latitude / Longitude</th>
              <th width="10%">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {weathers.map((weather, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{weather.company}</td>
                <td>{weather.location}</td>
                <td>{weather.latLon}</td>
                <td>
                  <LinkContainer to={`/admin/edit-deliveryBook/${weather._id}`}>
                    <Button className="btn-sm btn-light">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm btn-light"
                    onClick={() => deleteHandler(weather._id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default WeathersComponent;
