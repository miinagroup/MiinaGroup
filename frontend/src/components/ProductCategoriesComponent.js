import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Container, Card, Col } from "react-bootstrap";
import "../pages/general.css";

const ProductCategoriesComponent = ({
  category,
  categoryName,
  subCat,
  childCat,
  fourCat,
  fiveCat,
  sixCat,
  sevenCat
}) => {
  const onHover = {
    cursor: "pointer",
  };

  let baseCategory = `categoryName=${categoryName}`;
  if (!subCat) {
    if (!childCat) {
      baseCategory += `&subCategoryName=${category}`;
    } else {
      return baseCategory;
    }
  }
  if (subCat) {
    if (!childCat) {
      baseCategory += `&subCategoryName=${subCat}&childCategoryName=${category}`;
    } else {
      baseCategory += `&subCategoryName=${subCat}`;
    }
  }
  if (childCat) {
    if (!fourCat) {
      baseCategory += `&childCategoryName=${childCat}&fourCategoryName=${category}`;
    } else {
      baseCategory += `&childCategoryName=${childCat}`;
    }
  }
  if (fourCat) {
    if (!fiveCat) {
      baseCategory += `&fourCategoryName=${fourCat}&fiveCategoryName=${category}`;
    } else {
      baseCategory += `&fourCategoryName=${fourCat}`;
    }
  }
  if (fiveCat) {
    if (!sixCat) {
      baseCategory += `&fiveCategoryName=${fiveCat}&sixCategoryName=${category}`;
    } else {
      baseCategory += `&fiveCategoryName=${fiveCat}`;
    }
  }
  if (sixCat) {
    if (!sevenCat) {
      baseCategory += `&sixCategoryName=${sixCat}&sevenCategoryName=${category}`;
    } else {
      baseCategory += `&sixCategoryName=${sixCat}`;
    }
  }

  const displayCategory = category.replace(/-/g, ' ').replace(/_/g, " & ");

  return (
    <Col className="bigbox_product_categories_col">
      <Container className="bigbox_product_categories">
        <LinkContainer style={onHover} to={`/product-list?${baseCategory}`} className="bigbox_product_categories_item">
          <div className="box_product_categories">
            <div className="box1_product_categories">
              <div className="box2_product_categories">
                <div className="box3_product_categories">
                  <p className="hexagon_product_categories">{displayCategory}</p>
                </div>
              </div>
            </div>
          </div>
        </LinkContainer>
      </Container>
    </Col>
  );
};

export default ProductCategoriesComponent;
