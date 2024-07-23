import {
    Row,
    Col,
    Container,
    ListGroup,
    Button,
    Tab,
    Tabs,
    Form,
    Modal,
    Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../pages/general.css";
import FilterComponent from "../../components/filterQueryResultOptions/FilterComponent";

const NewsDetailsPageComponent = ({ fetchNews }) => {
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [adminUse, setAdminUse] = useState(false)
    const [news, setNews] = useState()
    const [updateNewsResponseState, setUpdateNewsResponseState] = useState({
        message: "",
        error: "",
    });

    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    useEffect(() => {
        fetchNews(id)
            .then((data) => {
                setNews(data);
            })
            .catch((err) =>
                console.log(
                    err.response.data.message ? err.response.data.message : err.response.data
                ));
    }, [2]);

    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault();
    };

    console.log(userInfo);
    return (
        <Container className="ms-3" fluid>
            <Row>
                <Col xxl={2} xl={3} lg={3} md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <FilterComponent />
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={9}>
                    {
                        userInfo.isAdmin === true ? (
                            <>
                                <div style={{
                                    flexDirection: "row",
                                    display: "flex",
                                    width: "100%",
                                    marginTop: "20px"
                                }}>
                                    <div className="mt-4">
                                        <LinkContainer to="/admin/newsHub">
                                            <Button
                                                variant="primary"
                                                className="m-0 me-4 p-0 pe-3 ps-3"
                                                size="lg"
                                            >
                                                Back
                                            </Button>
                                        </LinkContainer>
                                    </div>
                                    <div className="mt-4">
                                        <LinkContainer to={`/admin/edit-news/${news?._id}`}>
                                            <Button
                                                variant="primary"
                                                className="m-0 me-4 p-0 pe-3 ps-3"
                                                size="lg"
                                            >
                                                Edit
                                            </Button>
                                        </LinkContainer>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mt-4">
                                    <LinkContainer to="/news-list">
                                        <Button
                                            variant="primary"
                                            className="m-0 me-4 p-0 pe-3 ps-3"
                                            size="lg"
                                        >
                                            Back
                                        </Button>
                                    </LinkContainer>

                                </div>
                            </>
                        )
                    }
                    <div className="row w-100 mt-4" class="news_details_div">
                        <div class="news_tops">
                            <div className="me-5 pt-1" style={{ width: "70%", fontSize: 12, textAlign: "right" }}>
                                <a >
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        Author : {news?.author}
                                    </text>
                                </a>
                            </div>
                            <div className="me-3 pt-1" style={{ width: "14%", fontSize: 12 }}>
                                <a >
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        created Date : {news?.createdAt.split('T')[0]}
                                    </text>
                                </a>
                            </div>
                            <div className="me-3 pt-1" style={{ width: "14%", fontSize: 12 }}>
                                <a >
                                    <text className="text-uppercase" style={{ color: "black" }}>
                                        updated Date : {news?.updatedAt.split('T')[0]}
                                    </text>
                                </a>
                            </div>

                            {/* <div className="pt-1">
                                <LinkContainer to={`/admin/edit-news/${news._id}`}>
                                    <Button className="btn-sm btn-light">
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                </LinkContainer>
                                {" / "}
                                <Button
                                    variant="danger"
                                    className="btn-sm btn-light"
                                // onClick={() => deleteHandler(news._id)}
                                >
                                    <i className="bi bi-x-circle"></i>
                                </Button>
                            </div> */}
                        </div>

                        <div name="news_title" className="mt-4 mb-4">
                            <a >
                                <text className="text-uppercase" style={{ color: "Blue", fontSize: 25 }}>
                                    {news?.title}
                                </text>
                            </a>
                        </div>
                        <div name="news_details" >
                            <div dangerouslySetInnerHTML={{ __html: news?.details }} />
                        </div>
                    </div >
                </Col>
            </Row>
        </Container>
    );
};

export default NewsDetailsPageComponent;