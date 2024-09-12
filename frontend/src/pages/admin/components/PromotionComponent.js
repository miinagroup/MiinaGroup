import { Row, Col, Table, Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";

const PromotionComponent = ({ fetchPromotions }) => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const abctrl = new AbortController();
    fetchPromotions(abctrl)
      .then((res) => setPromotions(res))
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
  }, []);

  console.log(promotions);

  // const correctOrder = [
  //   "video-1",
  //   "upper-1",
  //   "upper-2",
  //   "video-2",
  //   "bottom-1",
  //   "bottom-2",
  //   "bottom-3",
  //   "bottom-4",
  // ];

  const correctOrder = [
    "video-1",
    "upper-1",
    "upper-2",
    "upper-3",
    "bottom-1",
    "bottom-2",
    "bottom-3",
    "video-2"
  ];

  const sortDetails = (details) => {
    return details.sort((a, b) => {
      const aIndex = correctOrder.indexOf(a.description);
      const bIndex = correctOrder.indexOf(b.description);

      if (aIndex > bIndex) return 1;
      if (aIndex < bIndex) return -1;
      return 0;
    });
  };

  return (
    <Row className="content-container  m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={8}>
        <h1>
          Promotion List{" "}
          <LinkContainer to="/admin/create-new-promotion">
            <Button
              variant="success"
              className="m-0 me-4 ms-4 p-0 pe-1 ps-1"
              size="lg"
            >
              Create new
            </Button>
          </LinkContainer>
        </h1>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th width="2%">#</th>
              <th width="10%">Promotions</th>
              <th width="10%">Start / End Date</th>
              <th width="70%">Image</th>
              <th width="8%">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((item, idx) => (
              <tr key={"promotions" + idx}>
                <td>{idx + 1}</td>
                <td>{item.category}</td>
                <td>
                  {item.startDate.split("T")[0]}
                  <br />
                  to
                  <br />
                  {item.endDate.split("T")[0]}
                </td>

                {/* show banners */}
                <td hidden={item.category === "blocks" || item.category === "bottomBlocks"}>
                  {item.category === "banners" && item.detail ? (
                    <div
                      className="banners-row"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        overflowX: "auto",
                      }}
                    >
                      {item.detail?.map((item, i) => (
                        <div
                          className="banners_col d-flex"
                          key={"banners" + i}
                          style={{ margin: "0 1rem" }}
                        >
                          <Card.Img variant="top" src={item.image} />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </td>

                {/* show blocks */}
                <td hidden={item.category === "banners" || item.category === "bottomBlocks"}>
                  {item.category === "blocks" && item.detail ? (
                    <>
                      <div
                        className="blocks-row"
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          overflowX: "auto",
                        }}
                      >
                        {sortDetails(item.detail)
                          .filter((detailItem) =>
                            [
                              "video-1",
                              "upper-1",
                              "upper-2",
                              "video-2",
                            ].includes(detailItem.description)
                          )
                          .map((detailItem, i) => (
                            <Col
                              xs={6}
                              md={3}
                              lg={3}
                              className="blocks_col d-flex"
                              key={detailItem._id}
                            >
                              <Card className="blocks_card h-100">
                                <Card.Body className="blocks_card_body">
                                  <a href={detailItem.redirectURL}>
                                    {detailItem.image.endsWith(".mp4") ? (
                                      <video
                                        className="w-100 promotional_video"
                                        controls
                                        autoPlay
                                        muted
                                      >
                                        <source
                                          src={detailItem.image}
                                          type="video/mp4"
                                        />
                                      </video>
                                    ) : (
                                      <Card.Img
                                        variant="top"
                                        src={detailItem.image}
                                      />
                                    )}
                                  </a>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                      </div>

                      <div
                        className="blocks-row"
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          overflowX: "auto",
                        }}
                      >
                        {sortDetails(item.detail)
                          .filter((detailItem) =>
                            [
                              "bottom-1",
                              "bottom-2",
                              "bottom-3",
                              "bottom-4",
                            ].includes(detailItem.description)
                          )
                          .map((detailItem, i) => (
                            <Col
                              xs={6}
                              md={3}
                              lg={3}
                              className="blocks_col d-flex"
                              key={detailItem._id}
                            >
                              <Card className="blocks_card h-100">
                                <Card.Body className="blocks_card_body">
                                  <a href={detailItem.redirectURL}>
                                    <Card.Img
                                      variant="top"
                                      src={detailItem.image}
                                    />
                                  </a>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                      </div>
                    </>
                  ) : null}
                </td>

                <td hidden={item.category === "banners" || item.category === "blocks"}>
                  {item.category === "bottomBlocks" && item.detail ? (
                    <>
                      <div
                        className="blocks-row"
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          overflowX: "auto",
                        }}
                      >
                        {item.detail
                          .map((detailItem, i) => (
                            <Col
                              xs={6}
                              md={3}
                              lg={3}
                              className="blocks_col d-flex"
                              key={detailItem._id}
                            >
                              <Card className="blocks_card h-100">
                                <Card.Body className="blocks_card_body">
                                  <a href={detailItem.redirectURL}>
                                    {detailItem.image.endsWith(".mp4") ? (
                                      <video
                                        className="w-100 promotional_video"
                                        controls
                                        autoPlay
                                        muted
                                      >
                                        <source
                                          src={detailItem.image}
                                          type="video/mp4"
                                        />
                                      </video>
                                    ) : (
                                      <Card.Img
                                        variant="top"
                                        src={detailItem.image}
                                      />
                                    )}
                                  </a>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                      </div>

                      {/* <div
                        className="blocks-row"
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          overflowX: "auto",
                        }}
                      >
                        {sortDetails(item.detail)
                          .filter((detailItem) =>
                            [
                              "bottom-1",
                              "bottom-2",
                              "bottom-3",
                              "bottom-4",
                            ].includes(detailItem.description)
                          )
                          .map((detailItem, i) => (
                            <Col
                              xs={6}
                              md={3}
                              lg={3}
                              className="blocks_col d-flex"
                              key={detailItem._id}
                            >
                              <Card className="blocks_card h-100">
                                <Card.Body className="blocks_card_body">
                                  <a href={detailItem.redirectURL}>
                                    <Card.Img
                                      variant="top"
                                      src={detailItem.image}
                                    />
                                  </a>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                      </div> */}
                    </>
                  ) : null}
                </td>

                <td>
                  <LinkContainer to={`/admin/edit-promotion/${item._id}`}>
                    <Button className="btn-sm btn-light">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm btn-light"
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

export default PromotionComponent;
