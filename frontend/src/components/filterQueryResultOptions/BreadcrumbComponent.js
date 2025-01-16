import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import qs from "qs";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./Filter.css";

const BreadcrumbComponent = () => {
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  const [catList, setCatList] = useState([]);
  useEffect(() => {
    if (query.categoryPath) {
      const input = query.categoryPath;
      const parts = input.split("/");

      let result = [];
      let currentPath = "";

      for (let i = 0; i < parts.length; i++) {
        currentPath = currentPath ? `${currentPath}/${parts[i]}` : parts[i];
        result.push({ name: parts[i], link: currentPath });
      }
      setCatList(result);
    }
  }, [query.categoryPath]);

  return (
    <Breadcrumb className="breadCB">
      {catList.map((category, index) => (
        <Breadcrumb.Item
          className={!!query.categoryPath ? "active" : "hideit"}
          href={`/product-list?categoryPath=${category.link}`}
        >
          <span >{category ? category.name.replace(/-/g, " ").replace(/_/g, " & ").replace(/,/g, ".") : ""}</span>
        </Breadcrumb.Item>
      ))}

    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
