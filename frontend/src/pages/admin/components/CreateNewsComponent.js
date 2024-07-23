import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import JoditEditor from "jodit-react";
//import "./styles.css";

const CreateNewsComponent = ({ createNews, fetchNews }) => {
    const [validated, setValidated] = useState(false);
    const [adminUse, setAdminUse] = useState(false)
    const [news, setNews] = useState()
    const [createNewsResponseState, setCreateNewsResponseState] = useState({
        message: "",
        error: "",
    });

    const navigate = useNavigate();
    const editor = useRef(null);
    const [newsContent, setNewsContent] = useState("");
    const config = {
        readonly: false,
        height: 400
    };
    const handleUpdate = (event) => {
        const editorContent = event;
        setNewsContent(editorContent);
    };


    useEffect(() => {
        fetchNews()
            .then((data) => {
                setNews(data);
            })
            .catch((err) =>
                console.log(
                    err.response.data.message ? err.response.data.message : err.response.data
                ));
    }, [2]);

    const checkAlreadyExists = (title) => {
        return news?.some((oneNews) => oneNews.title === title);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        const title = form.elements.title.value;
        const author = form.elements.author.value;
        const details = newsContent;

        const alreadyExists = checkAlreadyExists(title);
        if (alreadyExists) {
            window.alert("News already exists");
            return;
        }
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        createNews(title, details, author)
            .then((data) => {
                if (data.message === "news created") {
                    navigate("/admin/newsHub");
                }
            })
            .catch((er) => {
                setCreateNewsResponseState({
                    error: er.response.data.message ? er.response.data.message : er.response.data,
                });
            });
    };

    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault();
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5 content-container">
                <Col md={1}>

                </Col>
                <Col md={10}>
                    <h1>Create News</h1>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    //onKeyDown={(e) => checkKeyDown(e)}
                    >
                        <Form.Group className="mb-4" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control name="author" required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDetails">
                            <Form.Label>Details</Form.Label>
                            <JoditEditor
                                ref={editor}
                                value={newsContent}
                                config={config}
                                onBlur={handleUpdate}
                                onChange={(newContent) => { }}
                                name="details"
                            />
                            {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit" className="w-25">
                                Save
                            </Button>
                            <Link to="/admin/newsHub" className="btn btn-info my-3 ms-2 w-25">
                                Cancel
                            </Link>
                            <p>{createNewsResponseState.error}</p>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateNewsComponent;