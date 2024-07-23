import { Row, Col, Form, Button } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment-timezone";

const AdminTestPage = () => {



  // ****************** QuickBooks ******************

  const [authUri, setAuthUri] = useState("");
  const [token, setToken] = useState("");
  const [QBAPIResponse, setQBAPIResponse] = useState("Haven't made API call");

  const [queryDatabase, setQueryDatabase] = useState("");
  const [queryString, setQueryString] = useState("");

  const [jsonInput, setJsonInput] = useState("");
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  /*   const controllerAuthUri = async () => {
    try {
      const uri = await axios.get("/api/quickBooks/fetchAuthori");
      setAuthUri(uri.data);
    } catch (error) {
      console.error("Error fetching authUri", error);
    }
  }; */

  const controllerAuthUri = async () => {
    let clientId, clientSecret, environment, redirectUri;

    if (process.env.NODE_ENV === "development") {
      clientId = "ABNZzuRXmvWfTsjAnZrIjzI9Lawd2sp7RzevgQjGgmklyW07sU";
      clientSecret = "W0tcAe1sYQguhTyxFOnVq5INpDQiI0e60oEhHmPZ";
      environment = "sandbox";
      redirectUri = "http://localhost:5000/api/quickBooks/callback";
    } else {
      clientId = "ABKddT488E3as8Ai39Xh2WogOPaEWp1xbbotezfHembABPklqc";
      clientSecret = "CBu91lePolUhngMF7R9mteAm7gQ9k4ffhGZpSJG4";
      environment = "production";
      redirectUri = "https://backend-wpsv.onrender.com/api/quickBooks/callback";
    }

    const jsonBody = {
      clientId,
      clientSecret,
      environment,
      redirectUri,
    };

    try {
      const response = await axios.get("/api/quickBooks/fetchAuthori", {
        params: jsonBody,
      });
      const authUri = response.data;


      // Launch Popup window for redirected url (auth uri)

      const parameters = `location=1,width=800,height=650,left=${(window.screen.width - 800) / 2
        },top=${(window.screen.height - 650) / 2}`;

      const win = window.open(authUri, "connectPopup", parameters);

      // Listener for messages from the popup
      window.addEventListener("message", function (event) {
        // Check the message content
        if (event.data === "successCallback") {
          win.close();
          // window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error generating the Auth URI", error);
    }
  };

  const controllerRetrieveToken = async () => {
    try {
      const responseToken = await axios.get("/api/quickBooks/retrieveToken");
      setToken(responseToken.data);
    } catch (error) {
      console.error("Error fetching token", error);
    }
  };

  const controllerRefreshToken = async () => {
    try {
      const responseToken = await axios.get(
        "/api/quickBooks/refreshAccessToken"
      );
      setToken(responseToken.data);
    } catch (error) {
      console.error("Error refreshing token", error);
    }
  };

  const controllerMakeAPICall = async (infoType, queryString) => {
    try {
      const apiResponse = await axios.get("/api/quickBooks/makeAPICall", {
        params: { type: infoType, queryString: queryString },
      });
      setQBAPIResponse(apiResponse.data);
    } catch (error) {
      console.error("Error making API call", error);
    }
  };

  const controllerDisconnet = async () => {
    try {
      const responseToken = await axios.get("/api/quickBooks/disconnect");
      setToken(responseToken.data);
    } catch (error) {
      console.error("Error disconnect", error);
    }
  };
  console.log("====================================");
  console.log(QBAPIResponse);
  console.log("====================================");

  const controllerUpdateData = async (databaseType, jsonData) => {
    try {
      const apiResponse = await axios.post(
        "/api/quickBooks/updateData",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: { type: databaseType },
        }
      );
      setQBAPIResponse(apiResponse.data);
    } catch (error) {
      console.error("Error sending JSON and database type to updateData", error);
    }
  };

  const processProducts = async () => {
    try {
      const responseToken = await axios.post("/api/quickBooks/processProducts");
      setToken(responseToken);
    } catch (error) {
      console.error("Error disconnect", error);
    }
  };

  const processInovices = async () => {
    try {
      const responseToken = await axios.post("/api/quickBooks/processInovices");
      setToken(responseToken);
    } catch (error) {
      console.error("Error disconnect", error);
    }
  };

  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        {
          userInfo.isDeveloper ? (
            <>
              <Col md={10}>
                {/* ********** QuickBooks ********** */}
                <Button
                  className="ms-0 m-1 pt-0 pb-0"
                  variant="success"
                  onClick={controllerAuthUri}
                >
                  Connect to QuickBooks
                </Button>
                <Button
                  className="m-1 pt-0 pb-0"
                  variant="success"
                  onClick={controllerRetrieveToken}
                >
                  Display Access Token
                </Button>
                <Button
                  className="m-1 pt-0 pb-0"
                  variant="success"
                  onClick={controllerRefreshToken}
                >
                  Refresh Token
                </Button>
                <Button
                  className="m-1 pt-0 pb-0"
                  variant="success"
                  onClick={controllerDisconnet}
                >
                  Disconnect
                </Button>
                <Button
                  className="m-1 pt-0 pb-0"
                  variant="success"
                  onClick={processProducts}
                >
                  Process Products
                </Button>
                <Button
                  className="m-1 pt-0 pb-0"
                  variant="success"
                  onClick={processInovices}
                >
                  Process Invoices
                </Button>

                {/* ********** QuickBooks - Query Input ********** */}
                <div className="mt-3 mb-3">
                  <Form.Group as={Row} controlId="databaseTypeSelect">
                    <Form.Label column sm="2">
                      Database Type:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Select
                        value={queryDatabase}
                        onChange={(e) => setQueryDatabase(e.target.value)}
                      >
                        <option value="">Select Database</option>
                        <option value="invoice">Invoice</option>
                        <option value="customer">Customer</option>
                        <option value="payment">Payment</option>
                        <option value="item">Item</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="queryString">
                    <Form.Label column sm="2">
                      Query String:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        placeholder="Enter query string"
                        value={queryString}
                        onChange={(e) => setQueryString(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Button
                    className="m-1 pt-0 pb-0"
                    variant="success"
                    onClick={() => controllerMakeAPICall(queryDatabase, queryString)}
                  >
                    Execute Query
                  </Button>
                </div>
                {/* json query input */}
                <Form.Group as={Row} controlId="jsonInput">
                  <Form.Label column sm="2">
                    JSON Input:
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      placeholder="Enter JSON data here"
                    />
                  </Col>
                </Form.Group>

                <Button
                  className="m-1 pt-0 pb-0"
                  variant="success"
                  onClick={() => controllerUpdateData(queryDatabase, jsonInput)}
                >
                  Update with JSON Data
                </Button>

                <div>
                  <pre className="border border-secondary rounded-2 mt-2 p-2">
                    {JSON.stringify(QBAPIResponse, null, 2)}
                  </pre>
                </div>
              </Col>
            </>

          ) : userInfo.isSalesAdmin ? (
            <>
              <Col md={10}>
                {/* ********** QuickBooks ********** */}
                <Button
                  className="ms-0 m-1 pt-0 pb-0"
                  variant="success"
                  onClick={controllerAuthUri}
                >
                  Connect to QuickBooks
                </Button>
                <Button
                  className="m-1 pt-0 pb-0"
                  variant="success"
                  onClick={controllerDisconnet}
                >
                  Disconnect
                </Button>
              </Col>
            </>
          ) : ("")
        }


      </Row>
    </>
  );
};

export default AdminTestPage;

/* 
// ************** QuickBooks *************
// functions
  // from FORM go into ****** SERVER ******
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [environment, setEnvironment] = useState("");
  const [redirectUri, setRedirectUri] = useState("");

  const authorizeUri = async () => {
    // Get values from the form
    const clientId = document.getElementById("clientId").value;
    const clientSecret = document.getElementById("clientSecret").value;
    const environment = document.getElementById("environment").value;
    const redirectUri = document.getElementById("redirectUri").value;

    const jsonBody = {
      clientId,
      clientSecret,
      environment,
      redirectUri,
    };

    try {
      const response = await axios.get("/authUri", { params: jsonBody });
      const authUri = response.data;

      console.log("The Auth Uri is :", response);

      // Launch Popup using the JS window Object

      const parameters = `location=1,width=800,height=650,left=${
        (window.screen.width - 800) / 2
      },top=${(window.screen.height - 650) / 2}`;

      const win = window.open(authUri, "connectPopup", parameters);
      const pollOAuth = setInterval(() => {
        try {
          if (win.document.URL.indexOf("code") !== -1) {
            clearInterval(pollOAuth);
            win.close();
            window.location.reload();
          }
        } catch (e) {
          // console.log(e);
        }
      }, 100);
    } catch (error) {
      console.error("Error generating the Auth URI", error);
    }
  };

  const retrieveToken = async () => {
    try {
      const responseToken = await axios.get("/retrieveToken");
      setToken(responseToken.data);
    } catch (error) {
      console.error("Error fetching token", error);
    }
  };

  const refreshToken = async () => {
    try {
      const responseToken = await axios.get("/refreshAccessToken");
      setToken(responseToken.data);
    } catch (error) {
      console.error("Error refreshing token", error);
    }
  };

  const makeAPICall = async () => {
    try {
      const apiResponse = await axios.get("/getCompanyInfo");
      setResponse(apiResponse.data);
    } catch (error) {
      console.error("Error making API call", error);
    }
  };

// html
<form>
  <div class="form-group">
    <label for="clientId">ClientID</label>
    <input
      type="text"
      class="form-control"
      placeholder="enter the clientId"
      id="clientId"
    />
  </div>
  <div class="form-group">
    <label for="clientSecret">ClientSecret</label>
    <input
      type="text"
      class="form-control"
      placeholder="enter the clientSecret"
      id="clientSecret"
    />
  </div>
  <div class="form-group">
    <label for="environment">Environment</label>
    <select id="environment" class="form-control">
      <option value="sandbox" selected="selected">
        Sandbox
      </option>
      <option value="production">Production</option>
    </select>
  </div>
  <div class="form-group">
    <label for="redirectUri">Redirect URI</label>
    <input
      type="text"
      class="form-control"
      placeholder="enter the redirectUri"
      id="redirectUri"
    />
    <br />
  </div>
</form>

<Button className="m-1" onClick={authorizeUri}>
  Connect to QuickBooks
</Button>
<Button className="m-1" onClick={retrieveToken}>
  Display Access Token
</Button>
<Button className="m-1" onClick={refreshToken}>
  Refresh Token
</Button>
<Button className="m-1" onClick={makeAPICall}>
  Get Company Info
</Button>

*/
