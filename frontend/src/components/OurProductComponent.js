import React from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Row, Container, Card, Col } from "react-bootstrap";
import "../pages/general.css";


const OurProductComponent = () => {
  const onHover = {
    cursor: "pointer",
  };

  const productCategories = [
    { name: "PPE", className: "img_ppe", img: "/images/products/ppe.png" },
    {
      name: "HAND-TOOLS",
      className: "img_handtools",
      img: "/images/products/handtools.png",
    },
    {
      name: "ELECTRICAL",
      className: "img_electrical",
      img: "/images/products/electrical.png",
    },
    {
      name: "SITE-SAFETY",
      className: "img_siteSafety",
      img: "/images/products/siteSafety.png",
    },
    {
      name: "INDUSTRIAL",
      className: "img_mechanical_up",
      img: "/images/products/gear.png",
      hasSecondImg: true,
    },
  ];

  return (
    <div className="bg_our_products bg-light w-100">
      <Container>
        <div className="o_p_box">
          <h1 className="o_p">OUR PRODUCTS</h1>
        </div>
      </Container>

      <Container className="bigbox">
        <Row xs={2} md={3} lg={4} xl={5} className="g-4">
          {productCategories.map((item) => (
            <Col key={item.name}>
              <LinkContainer
                style={onHover}
                to={`/product-list?categoryName=${item.name}`}
              >
                <div className="box">
                  <div className="box1">
                    <div className="box2">
                      <div id={`op_${item.name}`} className="box3">
                        <img
                          id={`op_${item.name}`}
                          className={item.className}
                          src={item.img}
                          alt=""
                        />
                        {item.hasSecondImg && (
                          <img
                            id={`op_${item.name}`}
                            className="img_mechanical_down"
                            src={item.img}
                            alt=""
                          />
                        )}
                        <p id={`op_${item.name}`} className={`hexagon_${item.name}`}>{item.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LinkContainer>
            </Col>
          ))}
        </Row>

        <LinkContainer to="/product-list" className="allproducts_box">
          <button className="allproducts bg-light">ALL PRODUCTS</button>
        </LinkContainer>
      </Container>
    </div>
  )
}

export default OurProductComponent