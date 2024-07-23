import { Carousel, Button, Container, Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useIdleTimer } from "react-idle-timer";
import { useEffect, useState } from "react";
import "./page.css";
import "./promotion.css";
import StockPrice from "./StockPrice";
import OurProductComponent from "./OurProductComponent";
import axios from "axios";
import { useTrackEvents } from "../pages/trackEvents/useTrackEvents";
import { useSelector, useDispatch } from "react-redux";


const ProductsPromotionComponent = ({ blocks }) => {
  const promotionBlocks = blocks[0]?.detail;

  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  //Tracking user Interactions
  useTrackEvents();
  //var trackData = localStorage.getItem("trackData")
  //console.log("trackData", trackData);
  //   console.log('====================================');
  //   console.log(promotionBlocks);
  //   console.log('====================================');

  const correctOrder = [

    "upper-1",
    "upper-2",
    "bottom-1",
    "bottom-4",
    "video-1",
    "bottom-2",
    "bottom-3",
    "video-2",

  ];

  const orderedBlocks = promotionBlocks?.sort(
    (a, b) =>
      correctOrder.indexOf(a.description) - correctOrder.indexOf(b.description)
  );

  const topBlocks = orderedBlocks?.slice(0, 4);
  const bottomBlocks = orderedBlocks?.slice(4);

  const updateImageUrl = (url) => {
    const [start, end] = url.split("/upload");
    return `${start}/upload/c_scale,h_400,w_600${end}`;
  };

  const renderBlocks = (blocksArray) => {
    return blocksArray?.map((block) => {
      const updatedImageURL = updateImageUrl(block.image);
      const content = block.image.endsWith(".mp4") ? (
        <video
          className="w-100 promotional_video"
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
        <Col xs={6} lg={3} className="blocks_col d-flex" key={block._id}>
          <Card className="blocks_card h-100">
            <Card.Body className="blocks_card_body">
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
    {
      href: "/product-list?categoryName=HAND-TOOLS&subCategoryName=KNIVES",
      type: "video",
      source: "images2/RONSTA_knif.mp4",
    },
  ];

  const renderFixedBlocksData = (item) => {
    const content = item.type === "video" ? (
      <video
        className="w-100 promotional_video"
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
      <Col xs={6} md={3} lg={3} className="blocks_col d-flex">
        <Card className="blocks_card h-100">
          <Card.Body className="blocks_card_body">
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
          <Row className="blocks_row">
            {fixedBlocksData?.map(renderFixedBlocksData)}
          </Row>
          <StockPrice />
          <OurProductComponent />
          {/*         <img
              src="/loading-gif.gif"
              alt="Loading"
              style={{ display: "block", margin: "auto", width: "200px" }}
            /> */}
        </>
      ) : (
        <>
        <div className="mt-3 mb-3">
          <Row className="blocks_row">{renderBlocks(topBlocks)}</Row>
          <div className="mt-4 mb-4">
            <StockPrice />
          </div>
          
          <Row className="blocks_row_bottom">{renderBlocks(bottomBlocks)}</Row>
        </div>
          
        </>
      )}
    </>
  );
};

export default ProductsPromotionComponent;
