import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import UserLinksComponent from "../../../components/user/UserLinksComponent";
import MarketingPostsCreateComponenet from "./MarketingPostsCreateComponenet";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import MarketingPostsTrackPreviewComponent from "./MarketingPostsTrackPreviewComponent";

const MarketingPostsTrackComponenet = ({
  createVisitorTrack,
  getVisitorTracks,
  getVisitorTrackById,
}) => {
  const [visitorTracks, setVisitorTracks] = useState([]);

  useEffect(() => {
    getVisitorTracks().then((data) => {
      setVisitorTracks(data);
    });
  }, []);

  // console.log(getVisitorTrackById);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "createdAt", order: "desc" });

  const ITEMS_PER_PAGE = 40;

  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Social Media", field: "from", sortable: true },
    { name: "Source", field: "source", sortable: true },
    { name: "Tracking Link", field: "link", sortable: true },
    { name: "Total Visited", field: "entryNumber", sortable: true },
    { name: "Created Date", field: "createdAt", sortable: true },
  ];

  const visitorTracksData = useMemo(() => {
    let computedVisitorTracks = visitorTracks;

    if (search) {
      computedVisitorTracks = computedVisitorTracks.filter(
        (products) =>
          products.name?.toLowerCase().includes(search.toLowerCase()) ||
          products.category?.toLowerCase().includes(search.toLowerCase()) ||
          products.supplier?.toLowerCase().includes(search.toLowerCase()) ||
          products.stock.some(
            (stockItem) =>
              stockItem.ctlsku?.toLowerCase().includes(search.toLowerCase()) ||
              stockItem.slrsku?.toLowerCase().includes(search.toLowerCase()) ||
              stockItem.suppliersku
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
              stockItem.barcode?.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    setTotalItems(computedVisitorTracks.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedVisitorTracks = computedVisitorTracks.sort((a, b) => {
        const fieldA = a[sorting.field];
        const fieldB = b[sorting.field];

        if (typeof fieldA === "number" && typeof fieldB === "number") {
          return reversed * (fieldA - fieldB);
        } else if (typeof fieldA === "string" && typeof fieldB === "string") {
          return reversed * fieldA.localeCompare(fieldB);
        } else {
          return reversed * String(fieldA).localeCompare(String(fieldB));
        }
      });
    }

    //Current Page slice
    return computedVisitorTracks.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [visitorTracks, currentPage, search, sorting]);

  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [selectedTrackDate, setSelectedTrackDate] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (trackId, trackDate) => {
    setSelectedTrackId(trackId);
    setSelectedTrackDate(trackDate)
    setShow(true);
  };

  return (
    <>
      <Row className="content-container m-5">
        <Col md={2}>
          <UserLinksComponent />
        </Col>

        <Col md={10}>
          <h1>
            Posts Tracking{" "}
            <MarketingPostsCreateComponenet
              createVisitorTrack={createVisitorTrack}
            />{" "}
          </h1>
          <div className="row">
            <div className="col-md-6">
              <Pagination
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="col-md-6 d-flex flex-row-reverse mb-1">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <table className="table table-striped">
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {visitorTracksData.map((item, idx) => (
                <tr key={idx} id="visitorTrack-row">
                  <td>{idx + 1}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShow(item._id, item.createdAt)}
                  >
                    {item.from}
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShow(item._id, item.createdAt)}
                  >
                    {item.source}
                  </td>
                  <td>{item.link}</td>
                  <td>{item.entryNumber}</td>
                  <td>{item.createdAt.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </Row>
      <Modal show={show} onHide={handleClose} className="order_preview_items">
        <MarketingPostsTrackPreviewComponent
          id={selectedTrackId}
          createdDtae={selectedTrackDate}
          getVisitorTrackById={getVisitorTrackById}
        />
      </Modal>
    </>
  );
};

export default MarketingPostsTrackComponenet;
