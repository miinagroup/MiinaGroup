import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";

import "./page.css";

// 第276章节 先完成 pagination 然后去 productListPageComponent 继续完成, 最后去backend里面搞一搞
const PaginationComponent = ({
  categoryName,
  subCategoryName,
  childCategoryName,
  fourCategoryName,
  fiveCategoryName,
  sixCategoryName,
  sevenCategoryName,
  brandName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) => {
  // 如果category name 是the such part of the path，otherwise empty string
  // const category = categoryName ? `category/${categoryName}/` : "";
  // const search = searchQuery ? `search/${searchQuery}/` : "";
  let url = ""
  if (categoryName.includes("UNIFORM")) {
    url = `/uniform-list?categoryName=${categoryName || ""
      }&subCategoryName=${subCategoryName || ""
      }&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}&sixCategoryName=${sixCategoryName}&sevenCategoryName=${sevenCategoryName}&searchQuery=${searchQuery}&brandName=${brandName}&`
  } else {
    url = `/product-list?categoryName=${categoryName || ""
      }&subCategoryName=${subCategoryName || ""
      }&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&fiveCategoryName=${fiveCategoryName}&sixCategoryName=${sixCategoryName}&sevenCategoryName=${sevenCategoryName}&searchQuery=${searchQuery}&brandName=${brandName}&`
  }

  // return console.log(pageNum);
  // 如果上个return就不会走下面的了。而且这里是 pagination 这个的 to 不能解析？ query url

  return (
    <>
      <Pagination className="ms-4 mb-1 pagination_productlist desktop">
        <LinkContainer to={`${url}pageNum=${Math.max(1, 0)}`}>
          {/* <Pagination.First disabled={pageNum <= 10} /> */}
          <Pagination.Item disabled={pageNum <= 10}><i className="bi bi-chevron-bar-left"></i></Pagination.Item>
        </LinkContainer>
        <LinkContainer to={`${url}pageNum=${Math.max(1, (Math.ceil(pageNum / 10) * 10 - 10))}`}>
          {/* <Pagination.Prev disabled={pageNum <= 10} /> */}
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
          {/* <Pagination.Next disabled={pageNum > paginationLinksNumber - 10} /> */}
          <Pagination.Item disabled={Math.ceil(pageNum / 10) === Math.ceil(paginationLinksNumber / 10)} >{"...."}</Pagination.Item>
        </LinkContainer>
        <LinkContainer to={`${url}pageNum=${paginationLinksNumber}`}>
          {/* <Pagination.Last disabled={pageNum > paginationLinksNumber - 10} /> */}
          <Pagination.Item disabled={Math.ceil(pageNum / 10) === Math.ceil(paginationLinksNumber / 10)} ><i className="bi bi-chevron-bar-right"></i></Pagination.Item>
        </LinkContainer>
      </Pagination>
      <Pagination className="ms-4 mb-1 pagination_productlist mobile">
        <LinkContainer to={`${url}pageNum=${Math.max(1, 0)}`}>
          {/* <Pagination.First disabled={pageNum <= 10} /> */}
          <Pagination.Item disabled={pageNum <= 5}><i className="bi bi-chevron-bar-left"></i></Pagination.Item>
        </LinkContainer>
        <LinkContainer to={`${url}pageNum=${Math.max(1, (Math.ceil(pageNum / 5) * 5 - 5))}`}>
          {/* <Pagination.Prev disabled={pageNum <= 10} /> */}
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
          {/* <Pagination.Next disabled={pageNum > paginationLinksNumber - 10} /> */}
          <Pagination.Item disabled={Math.ceil(pageNum / 5) === Math.ceil(paginationLinksNumber / 5)} >{"...."}</Pagination.Item>
        </LinkContainer>
        <LinkContainer to={`${url}pageNum=${paginationLinksNumber}`}>
          {/* <Pagination.Last disabled={pageNum > paginationLinksNumber - 10} /> */}
          <Pagination.Item disabled={Math.ceil(pageNum / 5) === Math.ceil(paginationLinksNumber / 5)} ><i className="bi bi-chevron-bar-right"></i></Pagination.Item>
        </LinkContainer>
      </Pagination>
    </>
  );
};

export default PaginationComponent;
