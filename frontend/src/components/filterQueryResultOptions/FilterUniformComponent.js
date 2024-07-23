import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import qs from "qs";
import "./Filter.css";

const FilterUniformComponent = ({ categories }) => {
  const ColoredLine = (/* { color } */) => (
    <hr
      style={{
        color: "grey",
        backgroundColor: "grey",
        height: 0.1,
        margin: 0,
      }}
    />
  );

  //console.log("categories", categories);

  const mainCategory = [
    {
      label: "SHIRTS",
      link: "SHIRTS",
    },
    {
      label: "JACKETS & VESTS",
      link: "JACKETS",
    },
    {
      label: "PANTS & SHORTS",
      link: "PANTS",
    },
    {
      label: "OVERALLS",
      link: "OVERALLS",
    },
    {
      label: "BOOTS",
      link: "BOOTS",
    },
  ];
  const [subCategory, setSubCategory] = useState({});

  useEffect(() => {
    let subCategories = {};
    const mainLinks = mainCategory.map((category) => category.link); // extract links for validation

    categories?.forEach((category) => {
      // Only process this category if display is true
      if (!category.display) {
        return;
      }

      const parts = category.name.split("/");

      // Only process categories if they belong to the predefined main categories links
      if (mainLinks.includes(parts[0])) {
        if (parts.length >= 2) {
          if (!subCategories[parts[0]]) {
            subCategories[parts[0]] = [];
          }
          if (!subCategories[parts[0]].includes(parts[1])) {
            subCategories[parts[0]].push(parts[1]);
          }
        }
      }
    });

    setSubCategory(subCategories);
  }, [categories]);

  // console.log("mainCategory", mainCategory);
  // console.log("subCategory", subCategory);

  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  // console.log("query.subCategoryName", query.subCategoryName);
  // console.log("query", query);


  return (
    <div className="accordion_container">
      {mainCategory.map((main, idx) => {
        return (
          <div className="accordion">
            <div className="accordion-header">
              <a
                className="btn"
                href={`/uniform-list?categoryName=UNIFORM&subCategoryName=${main.link}`}
                aria-expanded="true"
              >
                {main.label}
              </a>
            </div>
            {/* <div
              id={`collapse${idx}`}
              className={
                query.categoryName === `${main.link}`
                  ? "collapse show"
                  : "collapse"
              }
              data-bs-parent="#accordion"
            >
              <div className="accordion-body">
                {subCategory[main.link]?.map((sub, index) => {
                  return (

                    <li
                      key={`${sub}-${index}`}
                      className={
                        query.subCategoryName === sub
                          ? "activeLabel subCatFilter"
                          : "subCatFilter"
                      }
                    >
                      <a
                        href={`/uniform-list?categoryName=${main.link}&subCategoryName=${sub}`}
                      >
                        {sub.replace(/-/g, " ").replace(/_/g, " & ")}
                      </a>
                      <ColoredLine />
                    </li>
                  );
                })}
              </div>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default FilterUniformComponent;
