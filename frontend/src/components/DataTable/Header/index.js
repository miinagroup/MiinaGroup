import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ headers, onSorting, widths }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead>
      <tr style={{ whiteSpace: 'nowrap' }}>
        {headers.map((header, index) => {
          const width = widths && widths.length > index ? widths[index] : null;
          return (
            <th
              key={header.name}
              onClick={() => (header.sortable ? onSortingChange(header.field) : null)}
              style={{ borderTop: "1px solid #1e4881", cursor: header.sortable ? "pointer" : "default", width: width }}
            >
              {header.name}
              {sortingField && sortingField === header.field && (
                <i className={
                  sortingOrder === "asc"
                    ? "bi bi-arrow-down"
                    : "bi bi-arrow-up"
                } />
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default Header;
