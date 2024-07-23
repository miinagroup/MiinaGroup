import React from "react";
import { useSelector } from "react-redux";
import "./MineralPrice.css";

const MineralPrice = () => {
  const mineralPrice = useSelector((state) => state.minerals.minerals);

  let sortedMineralPrice = [];
  let updateDate;

  if (mineralPrice && Array.isArray(mineralPrice) && mineralPrice.length > 0) {
    sortedMineralPrice = [...mineralPrice].sort((a, b) => b.latestPrice - a.latestPrice);
    updateDate = sortedMineralPrice[0].updateDate;
  }

  return (
    <div className="scroll_container">
      <div id="minerals_price" className="scroll_content">
        <div style={{ marginLeft: "30px", marginRight: "30px" }}>
          Prices(AUD/per ounce) - Last Updated:{updateDate}
        </div>
        {sortedMineralPrice.map((mineral, index) => (
          <div key={index} style={{ marginLeft: "20px" }}>
            <div style={{ fontWeight: "bold", marginLeft: "10px" }}>
              <span id="minerals_price">{mineral.name}</span>
              <span id="minerals_price" className="minerals_price" style={{ marginLeft: "5px" }}>${mineral.latestPrice}</span>
            </div>
          </div>
        ))}
        <div style={{ marginLeft: "30px", marginRight: "30px" }}>
          Prices(AUD/per ounce) - Last Updated:{updateDate}
        </div>
        {sortedMineralPrice.map((mineral, index) => (
          <div key={index + sortedMineralPrice.length} style={{ marginLeft: "15px" }}>
            <div style={{ fontWeight: "bold", marginLeft: "10px" }}>
              <span>{mineral.name}</span>
              <span className="minerals_price" style={{ marginLeft: "5px" }}>${mineral.latestPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MineralPrice;
