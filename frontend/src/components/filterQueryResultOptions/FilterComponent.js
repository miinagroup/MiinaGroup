import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import "./Filter.css";
import { getCategories } from "../../redux/actions/categoryActions";

const FilterComponent = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const ColoredLine = () => (
    <hr
      style={{
        color: "#999A47",
        backgroundColor: "#999A47",
        height: 0.1,
        margin: 0,
      }}
    />
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const categories = useSelector((state) => state.getCategories.categories);
  const mainCategory = [
    {
      label: "PPE",
      link: "PPE",
    },
    {
      label: "SITE SAFETY",
      link: "SITE-SAFETY",
    },
    {
      label: "MERCHANDISING",
      link: "MERCHANDISING",
    },
    {
      label: "TRANSIT",
      link: "TRANSIT",
    }
  ];

  const [subCategory, setSubCategory] = useState({});

  useEffect(() => {
    let subCategories = {};
    const mainLinks = mainCategory.map((category) => category.link);
    categories?.forEach((category) => {
      if (!category.display) {
        return;
      }
      const parts = category.name.split("/");

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

  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const queryMainLink = query.categoryPath?.split("/")[0]
  const querySubLink = query.categoryPath?.split("/")[1]

  return (
    <div className="accordion_container">
      {mainCategory.map((main, idx) => {
        return (
          <div className="accordion" key={main + idx}>
            <div className="accordion-header">
              <a
                className={` ${main.disabled && Object.keys(userInfo).length === 0 ? "notActive" : ""} btn`}
                data-bs-toggle="collapse"
                href={`#collapse${idx}`}
                aria-expanded="true"
              >
                {main.label}
              </a>
            </div>
            <div
              id={`collapse${idx}`}
              className={
                queryMainLink === `${main.link}`
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
                        querySubLink === sub
                          ? "activeLabel subCatFilter"
                          : "subCatFilter"
                      }
                    >
                      <a
                        href={`/product-list?categoryPath=${main.link}/${sub}`}
                      >
                        {sub.replace(/-/g, " ").replace(/_/g, " & ")}
                      </a>
                      <ColoredLine />
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterComponent;
