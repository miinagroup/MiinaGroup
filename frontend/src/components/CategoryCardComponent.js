import { Card, Col } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
import './page.css'

/* import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit"; */

const CategoryCardComponent = ({ category, idx }) => {
  const images = [
    "/images/products/PPE.jpg",
    "/images/products/POWERTOOLS.jpg",
    "/images/products/SITESAFETY.jpg",
    "/images/products/ELECTRICAL.jpg",
    "/images/products/MECHANICAL.jpg",
    "/images/products/HYDRATION.jpg",
    "/images/products/SURPLUSSTOCK.jpg",
  ];
  return (
    /*     <Col>
          <Card>
            <Card.Img crossOrigin="anonymous" variant="top" src={images[idx]} />
            <Card.Body>
              <Card.Title>{category}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <LinkContainer to="/product-list">
                <Button variant="primary">Details</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col> */

    <Col className="diagonal">
      <Card className="cardshadow">
        <Card.Img crossOrigin="anonymous" variant="top" className="content_new" src={images[idx]} />
        <p className="textover">{category}</p>
      </Card>
    </Col>




    /*     <Col>
      <MDBCard>
        <MDBCardImage src={images[idx]} position="top" alt="..." />
        <MDBCardBody>
          <MDBCardTitle>{category}</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
          <MDBBtn href="/product-list">MDB</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </Col> */
  );
};

export default CategoryCardComponent;
