import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";

import "../page.css";

const PaginationComponent = ({
  categoryPath,
  brandName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) => {

  let url = `/product-list?categoryPath=${categoryPath}&searchQuery=${searchQuery}&brandName=${brandName}&`

  return (
    <>
      <Pagination className="ms-4 mb-1 pagination_productlist desktop">
        <LinkContainer to={`${url}pageNum=${Math.max(1, 0)}`}>
          <Pagination.Item disabled={pageNum <= 10}><i className="bi bi-chevron-bar-left"></i></Pagination.Item>
        </LinkContainer>
        <LinkContainer to={`${url}pageNum=${Math.max(1, (Math.ceil(pageNum / 10) * 10 - 10))}`}>
          <Pagination.Item disabled={pageNum <= 10} >{"...."}</Pagination.Item>
        </LinkContainer>

        {Array.from(
          { length: 10 },
          (_, index) => Math.ceil(pageNum / 10) * 10 - 9 + index
        )
          .filter((page) => page <= paginationLinksNumber)
          .map((page, index) => (
            <LinkContainer key={index + 1} to={`${url}pageNum=${page}`}>
              <Pagination.Item active={pageNum === page}>
                {page}
              </Pagination.Item>
            </LinkContainer>
          ))}

        <LinkContainer
          to={`${url}pageNum=${Math.min(paginationLinksNumber, (Math.ceil(pageNum / 10) * 10 + 1))}`}
        >
          <Pagination.Item disabled={Math.ceil(pageNum / 10) === Math.ceil(paginationLinksNumber / 10)} >{"...."}</Pagination.Item>
        </LinkContainer>
        <LinkContainer to={`${url}pageNum=${paginationLinksNumber}`}>
          <Pagination.Item disabled={Math.ceil(pageNum / 10) === Math.ceil(paginationLinksNumber / 10)} ><i className="bi bi-chevron-bar-right"></i></Pagination.Item>
        </LinkContainer>
      </Pagination>
      
      <Pagination className="ms-4 mb-1 pagination_productlist pagination_productlist_mobile">
        <LinkContainer to={`${url}pageNum=${Math.max(1, 0)}`}>
          <Pagination.Item disabled={pageNum <= 5}><i className="bi bi-chevron-bar-left"></i></Pagination.Item>
        </LinkContainer>
        <LinkContainer to={`${url}pageNum=${Math.max(1, (Math.ceil(pageNum / 5) * 5 - 5))}`}>
          <Pagination.Item disabled={pageNum <= 5} >{"...."}</Pagination.Item>
        </LinkContainer>

        {Array.from(
          { length: 5 },
          (_, index) => Math.ceil(pageNum / 5) * 5 - 4 + index
        )
          .filter((page) => page <= paginationLinksNumber)
          .map((page, index) => (
            <LinkContainer key={index + 1} to={`${url}pageNum=${page}`}>
              <Pagination.Item active={pageNum === page}>
                {page}
              </Pagination.Item>
            </LinkContainer>
          ))}

        <LinkContainer
          to={`${url}pageNum=${Math.min(paginationLinksNumber, (Math.ceil(pageNum / 5) * 5 + 1))}`}
        >
          <Pagination.Item disabled={Math.ceil(pageNum / 5) === Math.ceil(paginationLinksNumber / 5)} >{"...."}</Pagination.Item>
        </LinkContainer>
        <LinkContainer to={`${url}pageNum=${paginationLinksNumber}`}>
          <Pagination.Item disabled={Math.ceil(pageNum / 5) === Math.ceil(paginationLinksNumber / 5)} ><i className="bi bi-chevron-bar-right"></i></Pagination.Item>
        </LinkContainer>
      </Pagination>
    </>
  );
};

export default PaginationComponent;
