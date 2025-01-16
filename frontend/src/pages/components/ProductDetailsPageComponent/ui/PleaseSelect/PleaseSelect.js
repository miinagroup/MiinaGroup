const PleaseSelect = ({selectedProduct, product, handleProductChange }) => {
     return <div>
     <div
       hidden={selectedProduct !== "Please-Select"}
       className="mt-5"
     >
       <label htmlFor="attrs">
         Choose Product:&nbsp;&nbsp;&nbsp;{" "}
       </label>
       <select
         id="product-select"
         value={selectedProduct}
         onChange={handleProductChange}
       >
         {product.stock &&
           (product.stock.length === 1 ? (
             <option value={product.stock[0].attrs}>
               {product.stock[0].attrs}
             </option>
           ) : (
             <>
               <option value="Please-Select">
                 <b>Please Select</b>
               </option>
               {product.stock.map((stock) => (
                 <option
                   key={"productMap1" + stock.attrs}
                   value={stock.attrs}
                 >
                   {stock.attrs}
                 </option>
               ))}
             </>
           ))}
       </select>
     </div>
     <div hidden={selectedProduct === "Please-Select"}>
       <label htmlFor="attrs">
         Choose Product:&nbsp;&nbsp;&nbsp;{" "}
       </label>
       <select
         id="product-select"
         value={selectedProduct}
         onChange={handleProductChange}
       >
         {product.stock &&
           (product.stock.length === 1 ? (
             <option value={product.stock[0].attrs}>
               {product.stock[0].attrs}
             </option>
           ) : (
             <>
               <option value="Please-Select">
                 <b>Please Select</b>
               </option>
               {product.stock.map((stock) => (
                 <option
                   key={"productMap2" + stock.attrs}
                   value={stock.attrs}
                 >
                   {stock.attrs}
                 </option>
               ))}
             </>
           ))}
       </select>
     </div>
   </div>
}

export default PleaseSelect;