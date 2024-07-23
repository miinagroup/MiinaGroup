import React from "react";
import { useSelector } from "react-redux";
import styles from "./MineralPriceMobile.module.css";

const MineralPriceMobile = () => {
  const mineralPrice = useSelector((state) => state.minerals.minerals);

  let sortedMineralPrice = [];
  let updateDate;

  if (mineralPrice && Array.isArray(mineralPrice) && mineralPrice.length > 0) {
    sortedMineralPrice = [...mineralPrice].sort((a, b) => b.latestPrice - a.latestPrice);
    updateDate = sortedMineralPrice[0].updateDate;
  }

  return (
    <div className={styles.scroll_container}>
      <div id="minerals_price" className={styles.scroll_content}>
        {sortedMineralPrice.map((mineral, index) => (
          <div key={index + sortedMineralPrice.length} style={{ marginLeft: "5px" }}>
            <div className={styles.mineral}>
              <span className={styles.mineral_name}>{mineral.name}</span>
              <span className={styles.mineral_price}>${mineral.latestPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MineralPriceMobile;
