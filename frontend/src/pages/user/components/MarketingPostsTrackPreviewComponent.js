import React, { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import moment from "moment";

const MarketingPostsTrackPreviewComponent = ({
  id,
  createdDtae,
  getVisitorTrackById,
}) => {
  const [visits, setVisits] = useState([]);
  useEffect(() => {
    getVisitorTrackById(id).then((data) => {
      setVisits(data.visits);
    });
  }, [id]);

  console.log(visits);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "visitTime", order: "asc" /* "desc" */ });

  const ITEMS_PER_PAGE = 40;

  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Visit Time", field: "visitTime", sortable: true },
    { name: "Visitor Type", field: "visitorType", sortable: true },
    { name: "Visitor Name", field: "userId.name", sortable: true },
    { name: "Visitor Company", field: "userId.company", sortable: true },
    { name: "Visitor Email", field: "userId.email", sortable: true },
  ];

  const visitorTracksData = useMemo(() => {
    let computedVisits = visits;

    if (search) {
      computedVisits = computedVisits.filter(
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

    setTotalItems(computedVisits.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedVisits = computedVisits.sort((a, b) => {
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
    return computedVisits.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [visits, currentPage, search, sorting]);

  return (
    <>
      <div className="m-2">
        <h1>Marketing Posts Track Preview</h1>
        <div className="row">
          <div className="col-md-4">
            <Pagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
          <div className="col-md-4">
            <span className="fw-bold">
              {moment(createdDtae).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
          <div className="col-md-4 d-flex flex-row-reverse mb-1">
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
                <td style={{ width: "5%" }}>{idx + 1}</td>
                <td style={{ width: "20%" }}>
                  {moment(item.visitTime).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td style={{ width: "20%" }}>{item.visitorType}</td>
                <td style={{ width: "20%" }}>
                  {item.userId?.name} {item.userId?.lastName}
                </td>
                <td style={{ width: "15%" }}>{item.userId?.company}</td>
                <td style={{ width: "20%" }}>{item.userId?.email}</td>
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
      </div>
    </>
  );
};

export default MarketingPostsTrackPreviewComponent;
