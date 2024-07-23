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
import { LinkContainer } from "react-router-bootstrap";
import { TableHeader, Pagination, Search } from "../../components/DataTable";
import "../../pages/general.css";
import React, { useEffect, useState, useMemo } from "react";
import FilterComponent from "../../components/filterQueryResultOptions/FilterComponent";

const NewsListPageComponent = ({ fetchNews }) => {
    const [validated, setValidated] = useState(true);
    const [news, setNews] = useState();
    const [newsDeleted, setNewsDeleted] = useState(false);

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "category", order: "asc" });

    // items per page
    const ITEMS_PER_PAGE_OPTIONS = [40, 60, 100, 200];
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]);

    const ITEMS_PER_PAGE = itemsPerPage;

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
    };

    const headers = [
        { name: "No#", field: "index", sortable: false },
        { name: "Title", field: "title", sortable: true },
        { name: "Author", field: "author", sortable: true },
        { name: "Created Date", field: "createdDate", sortable: true },
        { name: "Edit/Delete", field: "", sortable: false },
    ];

    const newsData = useMemo(() => {
        let newsList = news;

        if (search) {
            newsList = newsList.filter(
                (news) =>
                    news.title?.toLowerCase().includes(search.toLowerCase()) ||
                    news.details?.toLowerCase().includes(search.toLowerCase()) ||
                    news.author?.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(newsList?.length);

        //Sorting products
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            newsList = newsList?.sort((a, b) => {
                const fieldA = a[sorting.field];
                const fieldB = b[sorting.field];

                if (typeof fieldA === "number" && typeof fieldB === "number") {
                    return reversed * (fieldA - fieldB);
                } else if (typeof fieldA === "string" && typeof fieldB === "string") {
                    return reversed * fieldA.localeCompare(fieldB);
                } else {
                    // If field types are different, compare their string representations
                    return reversed * String(fieldA).localeCompare(String(fieldB));
                }
            });
        }
        return newsList?.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [news, currentPage, search, sorting]);

    // const deleteHandler = async (id) => {
    //     if (window.confirm("Are you sure?")) {
    //         const data = await adminRemoveNews(id);
    //         if (data.message === "News Deleted") {
    //             setNewsDeleted(!newsDeleted);
    //         }
    //     }
    // };

    useEffect(() => {
        const abctrl = new AbortController();
        fetchNews(abctrl)
            .then((data) => {
                setNews(data);
            })
            .catch((er) =>
                console.log(
                    er.response.data.message ? er.response.data.message : er.response.data
                ));
        return () => abctrl.abort();
    }, [itemsPerPage]);


    console.log(news);

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

                    <div style={{
                        borderBottomWidth: "1",
                        borderBottomStyle: "solid",
                        flexDirection: "row",
                        display: "flex",
                        width: "100%",
                        marginTop: "20px"
                    }}>
                        <div style={{ width: "70%" }}>
                            <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                        <div className="d-flex flex-row-reverse mb-1 me-1">
                            <select
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                            >
                                {ITEMS_PER_PAGE_OPTIONS?.map((option) => (
                                    <option key={option} value={option}>
                                        {option} per page
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex flex-row-reverse mb-1">
                            <Search
                                onSearch={(value) => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    {newsData?.map((item, idx) => (
                        <>
                            <div className="row w-100" class="news_div">
                                <div class="news_tops">
                                    <div className="me-5 pt-1" style={{ minWidth: "14%", fontSize: 12 }}>
                                        <a >
                                            <text className="text-uppercase" style={{ color: "black" }}>
                                                Author : {item.author}
                                            </text>
                                        </a>
                                    </div>
                                    <div className="me-3 pt-1" style={{ width: "14%", fontSize: 12 }}>
                                        <a >
                                            <text className="text-uppercase" style={{ color: "black" }}>
                                                created Date : {item.createdAt.split('T')[0]}
                                            </text>
                                        </a>
                                    </div>
                                    <div className="me-3 pt-1" style={{ width: "70%", fontSize: 12 }}>
                                        <a >
                                            <text className="text-uppercase" style={{ color: "black" }}>
                                                updated Date : {item.updatedAt.split('T')[0]}
                                            </text>
                                        </a>
                                    </div>

                                    {/* <div className="pt-1">
                                        <LinkContainer to={`/admin/edit-news/${item._id}`}>
                                            <Button className="btn-sm btn-light">
                                                <i className="bi bi-pencil-square"></i>
                                            </Button>
                                        </LinkContainer>
                                        {" / "}
                                        <Button
                                            variant="danger"
                                            className="btn-sm btn-light"
                                            onClick={() => deleteHandler(item._id)}
                                        >
                                            <i className="bi bi-x-circle"></i>
                                        </Button>
                                    </div> */}
                                </div>

                                <div name="news_title">
                                    <a href={`/news-details/${item._id}`}>
                                        <text className="text-uppercase" style={{ color: "Blue" }}>
                                            {item.title}
                                        </text>
                                    </a>
                                </div>
                                <div name="news_details" style={{ paddingLeft: "30px" }}>
                                    <div dangerouslySetInnerHTML={{ __html: item.details }} />
                                </div>
                            </div >

                        </>
                    ))}

                    <div className="row">
                        <div className="col-md-6">
                            <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>

                    </div>
                </Col>
            </Row >
        </Container>
    );
};

export default NewsListPageComponent;