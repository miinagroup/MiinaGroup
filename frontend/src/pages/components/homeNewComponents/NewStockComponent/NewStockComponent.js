import InfiniteLooper from '../helpers/infiniteLoopComponent';

import styles from "./NewStockComponent.module.css";

const NewStockComponent = ({top50Companies}) => {
    return  <div>
                {top50Companies.length > 0 && <InfiniteLooper speed="155" direction="right">
                  <div 
                    className={`line ${styles.wrapper}`}
                    >
                  {top50Companies.map((stock, index) => (
                    <div key={index} className={stock.difference < 0 ? styles.stockNegativePrice : styles.stockPositivePrice}>
                      <div style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                        <span id="stock_price">{stock.name}</span>
                        <span id="stock_price" className={stock.difference < 0 ? "stocks_price_positive" : "stocks_price_negative"} style={{ marginLeft: "5px" }}>${stock.latestPrice}  {stock.difference}%</span>
                      </div>
                    </div>
                  ))}
  </div>
</InfiniteLooper>}
  </div>
}

export default NewStockComponent;
