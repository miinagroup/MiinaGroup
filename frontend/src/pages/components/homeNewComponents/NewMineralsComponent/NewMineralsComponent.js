import { useSelector } from 'react-redux';
import {isMobile} from 'react-device-detect';

import InfiniteLooper from '../helpers/infiniteLoopComponent';

import styles from "./NewMineralsComponent.module.css";

const NewMineralsComponent = () => {
  const mineralPrice = useSelector((state) => state.minerals.minerals);
  let sortedMineralPrice = [];
  let updateDate;

  if (mineralPrice && Array.isArray(mineralPrice) && mineralPrice.length > 0) {
    sortedMineralPrice = [...mineralPrice].sort((a, b) => b.latestPrice - a.latestPrice);
    updateDate = sortedMineralPrice[0].updateDate;
  }

  return <div className={styles.container} >
   
          {sortedMineralPrice.length > 0 && <InfiniteLooper speed={isMobile ? "70" : "50"} direction="right">
            <div 
              className={`line ${styles.wrapper}`}>
                {sortedMineralPrice?.map((mineral, index) => (
                  <div key={index} className="mineralBlock" style={{ padding: "5px 10px", background: "rgba(89, 183, 228, 0.25)", borderRadius: "5px"}}>
                    <div style={{ fontWeight: "bold" }}>
                      <span id="minerals_price">{mineral.name}</span>
                      <span id="minerals_price" className="minerals_price" style={{ marginLeft: "5px" }}>${mineral.latestPrice}</span>
                    </div>
                  </div>
                ))}
                </div>
              </InfiniteLooper>}
</div>
}

export default NewMineralsComponent;
