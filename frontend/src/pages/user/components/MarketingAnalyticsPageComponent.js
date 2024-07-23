import { Row, Col, Form, Button, ListGroup, ListGroupItem, } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { useSelector } from "react-redux";
import UserLinksComponent from "../../../components/user/UserLinksComponent";
var ISODate = require("isodate");
//import "@alenaksu/json-viewer";

const MarketingAnalyticsPageComponent = ({ fetchCharts, getOrders, adminRemoveChart }) => {

  const [validated, setValidated] = useState(true);
  const [chart, setChart] = useState();
  const [orders, setOrders] = useState();
  const [dashBoard, setDashBoard] = useState();
  const [charts, setCharts] = useState();
  const [chartUrls, setChartUrls] = useState([])
  const [adminChartUrls, setAdminChartUrls] = useState([])
  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedId, setSelectedId] = useState("")
  const [mainCategoryList, setMainCategoryList] = useState(["SELECT"])
  const [productNames, setProductsNames] = useState([])
  const [dateFrom, setDateFrom] = useState(new Date('2023-08-01T07:06:40.150+00:00'))
  const [dateTo, setDateTo] = useState(new Date())
  const categories = useSelector((state) => state.getCategories.categories);


  useEffect(() => {
    fetchCharts()
      .then((data) => {
        setCharts(data);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        ));
  }, [0]);

  useEffect(() => {
    productNames.length = 0
    getOrders()
      .then((data) => {
        data?.map((order) => {
          setProductsNames(productName => [...productName, order.userCompany])
        })
        setOrders(data);
      })
      .catch((error) =>
        console.log(
          error.response.data.message ? error.response.data.message : error.response.data
        ));
  }, [0]);

  useEffect(() => {
    adminChartUrls.length = 0;
    chartUrls.length = 0;
    setChartUrls(chartUrls => [...chartUrls, { name: "Select Chart", baseUrl: "", chartId: "" }])
    setAdminChartUrls(adminChartUrls => [...adminChartUrls, { name: "Select Chart", baseUrl: "", chartId: "" }])
    setSelectedUrl(charts ? charts[0]?.baseUrl : "")
    setSelectedId(charts ? charts[0]?.chartId : "")
    charts?.map((char) => {
      if (char.adminUse === false) {
        setChartUrls(chartUrls => [...chartUrls, char])
      } else {
        setAdminChartUrls(adminChartUrls => [...adminChartUrls, char])
      }
    }
    )
  }, [charts])

  useEffect(() => {
    categories?.map((category) => {
      setMainCategoryList((current) => [...current, category.name.split("/")[0]])
    })
  }, [charts])

  const mainCategory = Array.from(new Set(mainCategoryList));

  const selectChart = (e) => {
    document.getElementById("admin_chart").selectedIndex = 0
    if (e.target.value !== "") {
      setSelectedUrl(e.target.value)
      const selectedIndex = e.target.options.selectedIndex;
      setSelectedId(e.target.options[selectedIndex].getAttribute('data-key'))
      if (e.target.options[selectedIndex].label === "Categories List") {
        document.getElementById("categoryList").style.display = "block"
        document.getElementById("categoryList").selectedIndex = 0
        document.getElementById("dates").style.display = "none"
      } else {
        document.getElementById("categoryList").style.display = "none"
        document.getElementById("dates").style.display = "none"
      }
    }
  };

  const selectAdminChart = (e) => {
    document.getElementById("user_chart").selectedIndex = 0
    if (e.target.value !== "") {
      setSelectedUrl(e.target.value)
      const selectedIndex = e.target.options.selectedIndex;
      setSelectedId(e.target.options[selectedIndex].getAttribute('data-key'))
      if ((e.target.options[selectedIndex].label === "Purchase History") ||
        (e.target.options[selectedIndex].label === "Total Purchase & Balance") ||
        (e.target.options[selectedIndex].label === "Client Site's Orders Count")
      ) {
        document.getElementById("dates").style.display = "block"
        document.getElementById("categoryList").style.display = "none"
        document.getElementById("date-to").max = new Date().toISOString().split("T")[0];
        document.getElementById("date-to").min = new Date('2023-08-01T07:06:40.150+00:00').toISOString().split("T")[0];
        document.getElementById("date-to").value = 'dd/mm/yyy';
        document.getElementById("date-from").max = new Date().toISOString().split("T")[0];
        document.getElementById("date-from").min = new Date('2023-08-01T07:06:40.150+00:00').toISOString().split("T")[0];
        document.getElementById("date-from").value = 'dd/mm/yyy';
      } else {
        document.getElementById("dates").style.display = "none"
        document.getElementById("categoryList").style.display = "none"
      }
    }
  };

  useEffect(() => {
    if (selectedUrl !== "" && selectedId !== "") {
      const sdk = new ChartsEmbedSDK({ baseUrl: selectedUrl })
      setChart(sdk.createChart({
        chartId: selectedId,
        height: "650px",
        width: "100%",
        showAttribution: false
      }))

      // setDashBoard(sdk.createDashboard({
      //   dashboardId: "cc5a1b35-3bff-4979-885b-5c18abceef83",
      //   height: "650px",
      //   width: "100%",
      //   showAttribution: false
      // }))
    }

  }, [selectedId])

  useEffect(() => {
    renderChart();
    //renderDashBoard();
  }, [chart])


  async function renderChart() {
    await chart.render(document.getElementById("chart"));

  }
  async function renderDashBoard() {
    await dashBoard.render(document.getElementById("dashBoard"));
  }

  const deleteChart = async (e) => {
    console.log("I am child", chart.options.chartId);
    const data = await adminRemoveChart(chart.options.chartId)
    if (data.message === "Chart Deleted") {
      window.location.reload(false);
    }
  }
  //Category List
  const selectedCategory = document.getElementById("category_list")
  selectedCategory?.addEventListener("change", async (e) => {
    if (selectedCategory.value == "SELECT") {
      chart.setFilter({})
    } else {
      chart.setFilter({ category: { $regex: selectedCategory.value } })

    }
  })

  //calender
  const selectedDateFrom = document.getElementById("date-from")
  selectedDateFrom?.addEventListener("change", async (e) => {
    setDateFrom(new Date(e.target.value))
  })
  const selectedDateTo = document.getElementById("date-to")
  selectedDateTo?.addEventListener("change", async (e) => {
    setDateTo(new Date(e.target.value))
  })
  const dateCalculate = document.getElementById("date_calculate")
  dateCalculate?.addEventListener("click", async (e) => {
    console.log(dateFrom, dateTo);
    chart?.setFilter({ deliveredAt: { $gte: ISODate(dateFrom), $lt: ISODate(dateTo) } })
  })

  return (
    <>

      <Row className="content-container m-5">
        <Col md={2}>
          <UserLinksComponent />
        </Col>
        <Col md={10}>
          {/* <Tabs
            defaultActiveKey="charts"
            id="fill-charts"
            className="mb-3"
          >
            <Tab eventKey="charts" title="Charts"> */}
          <Row>
            <Col md={10}>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col md={4}>
                      <label>Analytics :&nbsp; </label>
                      <select id="user_chart" className="chart_selector" onChange={selectChart} >
                        {chartUrls?.map((charts, idx) => {
                          return charts.name !== "" ? (
                            <option key={idx} data-key={charts.chartId} value={charts.baseUrl}>
                              {charts.name}
                            </option>
                          ) : (
                            <option key={idx} data-key={charts.chartId} value={charts.baseUrl}>
                              {charts.name}
                            </option>
                          );
                        })}
                      </select>
                    </Col>
                    <Col md={4}>
                      <label>Admin Only :&nbsp;</label>
                      <select id="admin_chart" className="chart_selector" onChange={selectAdminChart} >
                        {adminChartUrls?.map((charts, idx) => {
                          return charts.name !== "" ? (
                            <option key={idx} data-key={charts.chartId} value={charts.baseUrl}>
                              {charts.name}
                            </option>
                          ) : (
                            <option key={idx} data-key={charts.chartId} value={charts.baseUrl}>
                              {charts.name}
                            </option>
                          );
                        })}
                      </select>
                    </Col>
                    <Col md={4}>
                      {/*                       <LinkContainer to="/admin/charts">
                        <Button variant="primary" className="float-end">
                          Add New Chart
                        </Button>
                      </LinkContainer> */}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col md={12}>
                      <div id="categoryList" style={{ display: "none" }}>
                        Filter By Category :
                        <select id="category_list">
                          {
                            mainCategory?.map((category, idx) => {
                              return (
                                <option key={idx} value={category}>
                                  {category}
                                </option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div id="dates" style={{ display: "none" }}>

                        From : <input type="date" id="date-from" />&nbsp;
                        To : <input type="date" id="date-to" />&nbsp;
                        <button id="date_calculate">Calculate</button>

                      </div>
                      <div id="chart"></div>
                    </Col>
                  </Row>
                  <Row md={10}>
                    <Col md={11}></Col>
                    <Col md={1} >
                      <Button onClick={deleteChart} variant="secondary" className="float-end">
                        <i class="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>

                  {/* <Row>
                        <Col md={12}>
                          <div id="dashBoard"></div>
                        </Col>
                      </Row> */}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          {/* </Tab>
            <Tab eventKey="dashboard" title="Dashboard"> */}
          {/* <Row>
            <Col md={10}>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col md={12}>
                      <div id="dashBoard"></div>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row> */}
          {/* </Tab>
          </Tabs> */}
        </Col >
      </Row >
    </>
  );
};

export default MarketingAnalyticsPageComponent;
