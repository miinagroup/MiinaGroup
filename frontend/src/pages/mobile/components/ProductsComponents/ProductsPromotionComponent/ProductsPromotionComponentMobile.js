import { useSelector } from "react-redux";
import { Row, Col, Card, Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";

import StockPrice from "../../StockPrices/StockPrice";
import { useTrackEvents } from "../../../../trackEvents/useTrackEvents";

import styles from "./ProductsPromotionComponentMobile.module.css"
import { useState } from "react";


const ProductsPromotionComponentMobile = ({ blocks }) => {
  const promotionBlocks = blocks[0]?.detail;
  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  const [index, setIndex] = useState(0);
  const [ isControl, setIsControl ] = useState(false)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }
  
  const handleEnded = () => {
    const nextIndex = (index + 1) % topBlocks.length;
    setIndex(nextIndex)
  }

  const handleMouseEnter = () => {
    setIsControl(true)
  }

  const handleMouseLeave = () => {
    setIsControl(false)
  }

  useTrackEvents();

  const correctOrder = [
    "video-1",
    "video-2",
    "bottom-1",
    "bottom-4",
    "bottom-2",
    "bottom-3",

    //These items come from data, they are used in desktop version but in mobile they are not used
    "upper-1",
    "upper-2",
    
  ];

  const orderedBlocks = promotionBlocks?.sort(
    (a, b) =>
      correctOrder.indexOf(a.description) - correctOrder.indexOf(b.description)
  );

  const topBlocks = orderedBlocks?.slice(0, 2);
  const bottomBlocks = orderedBlocks?.slice(2, 6);

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
        <Col xs={6} className={styles.blocks_col} key={block._id}>
          <Card className={styles.blocks_card}>
            <Card.Body className={styles.blocks_card_body}>
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
          <Row className={styles.blocks_row}>
            {fixedBlocksData?.map(renderFixedBlocksData)}
          </Row>
          <StockPrice />
        </>
      ) : (
        <>
            <div className={styles.top_block}  >
                <Carousel className={styles.carousel} touch activeIndex={index} onSelect={handleSelect} indicators={false}>
                        {topBlocks.map((block, idx) => {
                           const updatedImageURL = updateImageUrl(block.image);
                          return <Carousel.Item key={idx} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                            <ReactPlayer
                              url={updatedImageURL}
                              width="100%"
                              pip={true}
                              controls={isControl}
                              muted
                              playing={index === idx}
                              onEnded={handleEnded}
                              className={styles.promotional_video}
                              playsinline
                            />

                          </Carousel.Item>
                        })}
                </Carousel>
            </div>
            <StockPrice />
            <Row className={styles.blocks_row}>{renderBlocks(bottomBlocks)}</Row>
        </>
      )}
    </>
  );
};

export default ProductsPromotionComponentMobile;
