import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import "./dataTablePagination.css";

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  noDom,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [path, setPath] = useState("");

  const location = useLocation(); 

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0) {
      setTotalPages(Math.ceil(total / itemsPerPage));
    }
  }, [total, itemsPerPage]);

  currentPage = Number(currentPage);

  let [params] = useSearchParams();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("pageNum");
    const newSearch = searchParams.toString();
    setPath(`${location.pathname}?${newSearch}${newSearch ? '&' : ''}`); 
    onPageChange(params.get("pageNum") || 1);
  }, [location, onPageChange, params]);

  if (totalPages === 0) return null;

  return (
    <Pagination className="m-1">
      <LinkContainer to={`${path}pageNum=${Math.max(1, 0)}`}>
        <Pagination.Item disabled={currentPage <= 10}>
          <i className="bi bi-chevron-bar-left"></i>
        </Pagination.Item>
      </LinkContainer>
      <LinkContainer
        to={`${path}pageNum=${Math.max(
          1,
          Math.ceil(currentPage / 10) * 10 - 10
        )}`}
      >
        <Pagination.Item disabled={currentPage <= 10}>{"...."}</Pagination.Item>
      </LinkContainer>

      {Array.from(
        { length: 10 },
        (_, index) => Math.ceil(currentPage / 10) * 10 - 9 + index
      )
        .filter((page) => page <= totalPages)
        .map((page, index) => (
          <LinkContainer key={index + 1} to={`${path}pageNum=${page}`}>
            <Pagination.Item
              key={page}
              active={currentPage === page}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Pagination.Item>
          </LinkContainer>
        ))}

      <LinkContainer
        to={`${path}pageNum=${Math.min(
          totalPages,
          Math.ceil(currentPage / 10) * 10 + 1
        )}`}
      >
        <Pagination.Item
          disabled={
            Math.ceil(currentPage / 10) === Math.ceil(totalPages / 10)
          }
        >
          {"...."}
        </Pagination.Item>
      </LinkContainer>
      <LinkContainer to={`${path}pageNum=${totalPages}`}>
        <Pagination.Item
          disabled={
            Math.ceil(currentPage / 10) === Math.ceil(totalPages / 10)
          }
        >
          <i className="bi bi-chevron-bar-right"></i>
        </Pagination.Item>
      </LinkContainer>
    </Pagination>
  );
};

export default PaginationComponent;
