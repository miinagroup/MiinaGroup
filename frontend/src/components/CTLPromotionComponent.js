import { Carousel, Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useIdleTimer } from "react-idle-timer";
import { useEffect, useState, React } from "react";
import "./page.css";
import "./promotion.css";
import StockPrice from "./StockPrice";
import OurProductComponent from "./OurProductComponent";
import axios from "axios";
import { useTrackEvents } from "../pages/trackEvents/useTrackEvents";
import { useSelector, useDispatch } from "react-redux";
import ReturnProfitCalculator from "../pages/ReturnProfitCalculator";


const CTLPromotionComponent = ({ blocks }) => {
  const promotionBlocks = blocks[0]?.detail;

  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const [promoVideos, setPromoVideos] = useState([])
  const [promoImages, setPromoImages] = useState([])
  const [current, setCurrent] = useState(0);

  //Tracking user Interactions
  useTrackEvents();
  //var trackData = localStorage.getItem("trackData")
  //console.log("trackData", trackData);

  useEffect(() => {
    promoVideos.length = 0
    promoImages.length = 0
    promotionBlocks?.map((promo) => {
      if (promo.image.endsWith(".mp4")) {
        setPromoVideos(promoVideos => [...promoVideos, {
          description: promo.description,
          image: promo.image,
          redirectURL: promo.redirectURL,
          _id: promo._id
        }])
      } else {
        setPromoImages(promoImages => [...promoImages, {
          description: promo.description,
          image: promo.image,
          redirectURL: promo.redirectURL,
          _id: promo._id
        }])
      }
    })
  }, [promotionBlocks])


  const updateImageUrl = (url) => {
    const [start, end] = url?.split("/upload");
    return `${start}/upload/c_scale,h_400,w_600${end}`;
  };


  const handleVideoNext = () => {
    setCurrent(current < promoVideos.length - 1 ? current + 1 : 0)
  };

  /* *************** Preview Quote *************** */
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };



  const renderBlocks = (blocksArray) => {
    return blocksArray?.map((block) => {
      const updatedImageURL = updateImageUrl(block.image);
      const content = block.image.endsWith(".mp4") ? (
        <video
          className="w-100 bottom_promotional_video"
          id="promotional_video"
          controls
          autoPlay
          muted
        >
          <source src={updatedImageURL} type="video/mp4" />
        </video>
      ) : (
        <Card.Img
          variant="top"
          src={updatedImageURL}
          id="promotional_image"
        />
      );

      return (
        <Col xs={3} md={2} lg={4} className="bottom_blocks_col d-flex" key={block._id}>
          <Card className="bottom_blocks_card h-100">
            <Card.Body className="bottom_blocks_card_body">
              {userInfo && Object.keys(userInfo).length > 0 ? (
                <a href={block.redirectURL}>{content}</a>
              ) : (
                <div>{content}</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  // if promotionBlocks is undifined use the fixed blocks
  const fixedBlocksData = [
    {
      href: "/product-list?categoryName=SITE-SAFETY&subCategoryName=EMERGENCY-SHOWERS-EYEWASH",
      type: "video",
      source: "images2/SAFETY_SHOWER.mp4",
    },
    {
      href: "/product-list?categoryName=PPE&subCategoryName=HAND-PROTECTION",
      type: "img",
      source: "images/promotional/PIP_1.jpg",
    },
    {
      href: "/product-list?categoryName=PPE&subCategoryName=EYE-PROTECTION",
      type: "img",
      source: "images/promotional/PROSA_block.jpg",
    },

  ];

  const renderFixedBlocksData = (item) => {
    const content = item.type === "video" ? (
      <video
        className="w-100 bottom_promotional_video"
        id="promotional_video"
        controls
        autoPlay
        muted
      >
        <source src={item.source} type="video/mp4" />
      </video>
    ) : (
      <Card.Img
        variant="top"
        src={item.source}
        id="promotional_image"
      />
    );

    return (
      <Col xs={6} md={2} lg={4} className="bottom_blocks_col d-flex">
        <Card className="bottom_blocks_card h-100">
          <Card.Body className="bottom_blocks_card_body">
            {userInfo && Object.keys(userInfo).length > 0 ? (
              <a href={item.href}>{content}</a>
            ) : (
              <div>{content}</div>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <>
      {!promotionBlocks ? (
        <>
          <Row className="bottom_blocks_row">
            {fixedBlocksData?.map(renderFixedBlocksData)}
          </Row>

        </>
      ) : (
        <>
          {/* <Row className="bottom_blocks_row">{renderBlocks(topBlocks)}</Row> */}
          <Row className="bottom_blocks_row mb-2">
            {/* <Col xs={3} md={2} lg={4} className="bottom_blocks_col d-flex" key={promoVideos[current]?._id}>
              <Card className="bottom_blocks_card">
                <Card.Body className="bottom_blocks_card_body ">
                  {promoVideos[current] ? (
                    userInfo && Object.keys(userInfo).length > 0 ? (
                      <>
                        <a href={promoVideos[current]?.redirectURL}>
                          <video
                            className="w-100 bottom_promotional_video"
                            id="promotional_video"
                            controls
                            autoPlay
                            muted
                            onEnded={handleVideoNext}
                          >
                            <source src={updateImageUrl(promoVideos[current].image)} type="video/mp4" />
                          </video>
                        </a>
                        <button className="video_buttons" id="video_buttons_prev"
                          onClick={() => setCurrent(current > 0 ? current - 1 : promoVideos.length - 1)}>
                          <i class="bi bi-chevron-compact-left"></i>
                        </button>
                        <button className="video_buttons" id="video_buttons_next"
                          onClick={() => setCurrent(current < promoVideos.length - 1 ? current + 1 : 0)}>
                          <i class="bi bi-chevron-compact-right"></i>
                        </button>
                      </>

                    ) : (
                      <>

                        <video
                          className="w-100 bottom_promotional_video"
                          id="promotional_video"
                          controls
                          autoPlay
                          muted
                          onEnded={handleVideoNext}
                        >
                          <source src={updateImageUrl(promoVideos[current].image)} type="video/mp4" />
                        </video>

                        <button className="video_buttons" id="video_buttons_prev"
                          onClick={() => setCurrent(current > 0 ? current - 1 : promoVideos.length - 1)}>
                          <i class="bi bi-chevron-compact-left"></i>
                        </button>
                        <button className="video_buttons" id="video_buttons_next"
                          onClick={() => setCurrent(current < promoVideos.length - 1 ? current + 1 : 0)}>
                          <i class="bi bi-chevron-compact-right"></i>
                        </button>
                      </>
                    )
                  ) : ""

                  }
                </Card.Body>
              </Card>
            </Col> */}
            {/* <Col xs={3} md={2} lg={4} className="bottom_blocks_col d-flex" key={promoImages[0]?._id}>
              <Card className="bottom_blocks_card">
                <Card.Body className="bottom_blocks_card_body">
                  {promoImages[0] ? (
                    userInfo && Object.keys(userInfo).length > 0 ? (
                      <a href={promoImages[0]?.redirectURL}>
                        {/* <a href="/news-list"> 
                        <Card.Img
                          variant="top"
                          src={updateImageUrl(promoImages[0].image)}
                          id="promotional_image"
                        />
                      </a>
                    ) : (
                      <div>
                        <Card.Img
                          variant="top"
                          src={updateImageUrl(promoImages[0].image)}
                          id="promotional_image"
                        />
                      </div>
                    )

                  ) : ""
                  }
                </Card.Body>
              </Card>
            </Col> */}
            <Col xs={3} md={2} lg={4} className="bottom_blocks_col d-flex" key={promoImages[0]?._id}>
              <Card className="bottom_blocks_card">
                <Card.Body className="bottom_blocks_card_body" style={{ textAlign: "center", paddingTop: "20%" }}>
                  <h1>Maximum Return on Investment</h1>
                  The below calculator demonstrates the total estimated savings over a 25-year asset lifecycle from installing MineTech light poles.
                  <br /><br />
                  <Button onClick={() => handleShow()}>
                    Calculate
                  </Button>


                </Card.Body>
              </Card>
            </Col>
            <Col xs={3} md={2} lg={4} className="bottom_blocks_col d-flex" key={promoImages[0]?._id}>
              <Card className="bottom_blocks_card">
                <Card.Body className="bottom_blocks_card_body">
                  {promoImages[0] ? (
                    userInfo && Object.keys(userInfo).length > 0 ? (
                      <a href={promoImages[0]?.redirectURL}>
                        {/* <a href="/news-list"> */}
                        <Card.Img
                          variant="top"
                          src={updateImageUrl(promoImages[0].image)}
                          id="promotional_image"
                        />
                      </a>
                    ) : (
                      <div>
                        <Card.Img
                          variant="top"
                          src={updateImageUrl(promoImages[0].image)}
                          id="promotional_image"
                        />
                      </div>
                    )

                  ) : ""
                  }
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3} md={2} lg={4} className="bottom_blocks_col d-flex" key={promoImages[1]?._id}>
              <Card className="bottom_blocks_card ">
                <Card.Body className="bottom_blocks_card_body">
                  {
                    promoImages[1] ? (
                      userInfo && Object.keys(userInfo).length > 0 ? (
                        <a href={promoImages[1]?.redirectURL}>
                          <Card.Img
                            variant="top"
                            src={updateImageUrl(promoImages[1].image)}
                            id="promotional_image"
                          />
                        </a>
                      ) : (
                        <div> <Card.Img
                          variant="top"
                          src={updateImageUrl(promoImages[1].image)}
                          id="promotional_image"
                        />
                        </div>
                      )
                    ) : ""
                  }
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Modal show={show} onHide={handleClose} className="order_preview_items">
            <ReturnProfitCalculator />
          </Modal>
        </>
      )
      }
    </>
  );
};

export default CTLPromotionComponent;
