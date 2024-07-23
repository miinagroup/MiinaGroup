import { Row, Col, Table, Button, Tooltip } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { TableHeader, Pagination, Search } from "../../../components/DataTable";
import React, { useEffect, useState, useMemo } from "react";
import "../../../pages/general.css";
import ProductsPageReplenishment from "./ProductsPageReplenishment";
import ProductsPageStockTake from "./ProductsPageStockTake";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { useSelector } from "react-redux";

const ProductsPageComponent = ({
  fetchProducts,
  deleteProduct,
  productReplenishment,
  productStockTake,
}) => {
  const [products, setProducts] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "category", order: "asc" });
  const [filterValue, setFilterValue] = useState("");
  // items per page
  const ITEMS_PER_PAGE_OPTIONS = [40, 60, 100, 200];
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]);

  const ITEMS_PER_PAGE = itemsPerPage;

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
  };

  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  const accessRoles = ["isAdmin"];

  const hasAnyRole = (userInfo, accessRoles) => {
    return accessRoles.some((role) => {
      return (
        userInfo.hasOwnProperty(role.trim()) && Boolean(userInfo[role.trim()])
      );
    });
  };

  // 这里需要去到product controller 找到 adminGetProducts 改一些数据，才能显示出来
  // 因为数据库太大的话，我们限制 get products的数据，就能faster
  const headers = [
    { name: "No#", field: "index", sortable: false },
    { name: "Product Name", field: "name", sortable: true },
    { name: "Product Attrs", field: "attrs", sortable: true },
    { name: "Price", field: "price", sortable: true },
    { name: "Margin", field: "margin", sortable: true },
    { name: "Stock", field: "count", sortable: true },
    { name: "CTLsku", field: "ctlsku", sortable: true },
    { name: "Supplier sku", field: "suppliersku", sortable: true },
    { name: "Category", field: "category", sortable: true },
    { name: "View/Edit/Delete", field: "", sortable: false },
  ];

  const productsData = useMemo(() => {
    let computedProducts = products;
    if (filterValue === "withNoPricing") {
      computedProducts = computedProducts.filter((product) => product.displayPrice === 0)
    } else if (filterValue === "withPricing") {
      computedProducts = computedProducts.filter((product) => product.displayPrice !== 0)
    }

    if (search) {
      computedProducts = computedProducts.filter(
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

    /* const newCount = products.map((product) => product.slrsku);
    console.log(newCount); */

    setTotalItems(computedProducts.length);

    //Sorting products
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedProducts = computedProducts.sort((a, b) => {
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

    //Current Page slice
    return computedProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [products, currentPage, search, sorting, filterValue]);

  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteProduct(productId);
      if (data.message === "product removed") {
        setProductDeleted(!productDeleted);
      }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchProducts(abctrl)
      .then((res) => setProducts(res))
      .catch((er) => {
        if (er.code === "ERR_CANCELED") {
          // console.log("Fetch request was cancelled");
        } else if (er.response) {
          console.log(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          );
        } else {
          console.log(er);
        }
      });
    return () => abctrl.abort();
  }, [productDeleted, itemsPerPage]);

  const [productsCount, setProductsCount] = useState([])
  useEffect(() => {
    if (products) {
      productsCount.length = 0
      let productsWithoutPrice = []
      let productsWithPrice = []
      products?.map((product) => {
        if (product.displayPrice === 0 || product.displayPrice === null) {
          productsWithoutPrice.push(product)
        } else {
          productsWithPrice.push(product)
        }
      })
      setProductsCount([...productsCount,
      {
        totalProductsCount: products.length,
        productsWithPriceCount: productsWithPrice.length,
        productsWithoutPriceCount: productsWithoutPrice.length
      }])
    }
  }, [products])

  const pullStockItemsOut = (products) => {
    return products.map((product) => {
      const stockDataPullOut = {};

      product.stock.forEach((stockItem, index) => {
        const prefix = `stock[${index}].`;

        Object.keys(stockItem).forEach((name) => {
          const newName = `${prefix}${name}`;
          stockDataPullOut[newName] = stockItem[name];
        });
      });

      const rebuiltProduct = {
        ...product,
        ...stockDataPullOut,
      };

      delete rebuiltProduct.stock;

      return rebuiltProduct;
    });
  };

  const newProductsData = pullStockItemsOut(productsData);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async (fileName) => {
    const ws = XLSX.utils.json_to_sheet(newProductsData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Row className="content-container m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <div className="priceRange">
          <div className="priceRange_item">Total Products : <label style={{ fontWeight: "bold" }}> {productsCount[0]?.totalProductsCount}</label> </div>
          <div className="priceRange_item">Products With Pricing : <label style={{ fontWeight: "bold" }}>{productsCount[0]?.productsWithPriceCount}</label></div>
          <div className="priceRange_item">Products Without Pricing : <label style={{ fontWeight: "bold" }}>{productsCount[0]?.productsWithoutPriceCount}</label></div>
        </div>
        <h1>
          Product List{" "}
          <LinkContainer to="/admin/create-new-product">
            <Button
              variant="success"
              className="m-0 me-4 ms-4 p-0 pe-1 ps-1"
              size="lg"
            >
              Create New
            </Button>
          </LinkContainer>
          <ProductsPageReplenishment
            productReplenishment={productReplenishment}
          />
          <ProductsPageStockTake productStockTake={productStockTake} />
          <select
            className="ms-4 mt-1 fs-6"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
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

          <div className="col-md-6 d-flex justify-content-between mb-1">
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="form-select me-3"
            >
              <option value="">All Products</option>
              <option value="withNoPricing">With No Pricing</option>
              <option value="withPricing">With Pricing</option>
            </select>
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
            {/* 这里需要去到product controller 找到adminGetProducts 改一些数据，才能显示出来 */}
            {productsData.map((item, idx) => (
              <tr key={idx} id="product-row">
                <td>{idx + 1}</td>
                <td>
                  <a href={`/product-details/${item._id}`}>
                    <text className="text-uppercase" style={{ color: "black" }}>
                      {item.name}
                    </text>
                  </a>
                </td>
                <td>
                  {item.stock.map((stockItem) => (
                    <div key={stockItem.ctlsku}>{stockItem.attrs}</div>
                  ))}
                </td>
                <td>
                  {item.stock.map((stockItem) => (
                    <div key={stockItem.ctlsku}>
                      ${stockItem.price?.toFixed(2)}
                    </div>
                  ))}
                </td>
                <td>
                  {item.stock.map((stockItem) => (
                    <div key={stockItem.ctlsku}>
                      {(
                        (100 * (stockItem.price - stockItem.purchaseprice)) /
                        stockItem.purchaseprice
                      ).toFixed(2)}
                      %
                    </div>
                  ))}
                </td>
                <td>
                  {item.stock.map((stockItem) => (
                    <div key={stockItem.ctlsku}>{stockItem.count}</div>
                  ))}
                </td>
                <td>
                  {item.stock.map((stockItem) => (
                    <div key={stockItem.ctlsku}>{stockItem.ctlsku}</div>
                  ))}
                </td>
                <td>
                  {item.stock.map((stockItem) => (
                    <div key={stockItem.ctlsku}>{stockItem.suppliersku}</div>
                  ))}
                </td>
                <td>{item.category}</td>
                <td>
                  <Link to={`/product-details/${item._id}`} target="_blank">
                    <Button className="btn-sm btn-light">
                      <i className="bi bi-box-arrow-up-right"></i>
                    </Button>
                  </Link>
                  {" / "}
                  <LinkContainer to={`/admin/edit-product/${item._id}`}>
                    <Button className="btn-sm btn-light" disabled={!hasAnyRole(userInfo, accessRoles)}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm btn-light"
                    onClick={() => deleteHandler(item._id)}
                    disabled={!hasAnyRole(userInfo, accessRoles)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
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
          <div className="col-md-6 d-flex flex-row-reverse mb-1">
            <Button
              onClick={(e) => exportToExcel("products_List")}
              style={{ cursor: "pointer", fontSize: 14 }}
            >
              Excel Export
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductsPageComponent;
