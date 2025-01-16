import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Container, Card, Col } from "react-bootstrap";
import "../pages/general.css";

const ProductCategoriesComponent = ({
  category,
  categoryPath
}) => {
  const onHover = {
    cursor: "pointer",
  };
  let baseCategory = `categoryPath=${categoryPath}/${category}`;
  const displayCategory = category.replace(/-/g, ' ').replace(/_/g, " & ").replace(/,/g, ".");

  return (
    <Col className="bigbox_product_categories_col">
      <Container className="bigbox_product_categories">
        <LinkContainer style={onHover} to={`/product-list?${baseCategory}`} className="bigbox_product_categories_item">
          <div className="subcategoryWrapper">
            <img src="/svg/SubmarkWhite.svg" alt="Miina Plant" className="logoPlant" />
            {displayCategory}
          </div>
        </LinkContainer>
      </Container>
    </Col>
  );
};

export default ProductCategoriesComponent;
