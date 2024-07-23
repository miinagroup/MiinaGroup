import React from "react";
import { useSelector } from "react-redux";
import "./StockPrice.css";

const StockPrice = () => {
  const stockPrice = useSelector((state) => state.stocks.stocks);

  let sortedstockPrice = [];
  let updateDate;

  if (stockPrice && Array.isArray(stockPrice) && stockPrice.length > 0) {
    sortedstockPrice = [...stockPrice].sort((a, b) => a.companySize - b.companySize);
    updateDate = sortedstockPrice[0].updateDate;
  }

  const top50Companies = sortedstockPrice.slice(10, 60)

  return (
    <div className="marquee_container">
      <div className="marquee_content">

        {top50Companies.map((stock, index) => (
          <div key={index} style={{ marginLeft: "20px" }}>
            <div style={{ fontWeight: "bold", marginLeft: "10px", whiteSpace: "nowrap" }}>
              <span id="stock_price">{stock.name}</span>
              <span id="stock_price" className={stock.difference < 0 ? "stocks_price_positive" : "stocks_price_negative"} style={{ marginLeft: "5px" }}>${stock.latestPrice}  {stock.difference}%</span>
            </div>
          </div>
        ))}
        <div style={{ marginLeft: "30px", marginRight: "30px", whiteSpace: "nowrap" }}>
          Last Updated:{updateDate}
        </div>


        {top50Companies.map((stock, index) => (
          <div key={index + top50Companies.length} style={{ marginLeft: "15px" }}>
            <div style={{ fontWeight: "bold", marginLeft: "10px", whiteSpace: "nowrap" }}>
              <span id="stock_price">{stock.name}</span>
              <span id="stock_price" className={stock.difference < 0 ? "stocks_price_positive" : "stocks_price_negative"} style={{ marginLeft: "5px" }}>${stock.latestPrice}  {stock.difference}%</span>
            </div>
          </div>
        ))}
        <div style={{ marginLeft: "30px", marginRight: "30px", whiteSpace: "nowrap" }}>
          Last Updated:{updateDate}
        </div>
      </div>
    </div>
  );
};

export default StockPrice;
