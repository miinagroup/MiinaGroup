const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductByCTLSKU,
  userUpdateSKU,
  adminGetProducts,
  adminGetCTLSKU,
  adminGetHobsonCTLSku,
  adminGetSupplierSku,
  adminDeleteProduct,
  adminUpdateSKU,
  adminUpdateImages,
  adminUpdateCategory,
  adminCreateProduct,
  adminCreateHobsonProduct,
  adminUpdateHobsonProduct,
  adminUpdateProduct,
  adminUpload,
  adminUploadPdf,
  adminDeleteProductImage,
  adminDeleteProductPdf,
  checkStockCount,
  productsCheck,
  adminReplenishment,
  adminStockTake,
  searchProducts,
  getProductsVisitor,
  searchProductsForVisitor,
  adminBulkUpdateClientSkus
} = require("../controllers/productController");
const {
  getClientSkuNamesList
} = require("../controllers/skuController");

const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

router.get("/visitor/search/:searchQuery", searchProductsForVisitor);
router.get("/visitor/category/:categoryName", getProductsVisitor);
router.get("/get-one/:id", getProductById);

router.use(verifyIsLoggedIn);
router.get("/category/:categoryName", getProducts);
router.get("/brand/:brandName", getProducts);
router.get("/", getProducts);
router.get("/get-one/:id", getProductById);
router.get("/getClientSKU", getProductByCTLSKU);
router.put("/client/updateSKU/:ctlsku", userUpdateSKU);
router.get("/search/:searchQuery", searchProducts);
router.get("/getClientsSkuList", getClientSkuNamesList);

// admin routes:
router.use(verifyIsAdmin);
router.get("/admin", adminGetProducts);
router.get("/admin/getCTLSKU", adminGetCTLSKU);
router.get("/admin/getHobsonCTLSKU/:supplier", adminGetHobsonCTLSku);
router.get("/admin/getSupplierSKU/:supplier", adminGetSupplierSku);
router.delete("/admin/:id", adminDeleteProduct);
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage);
router.delete("/admin/pdf/:pdfPath/:productId", adminDeleteProductPdf);
router.put("/admin/updateProduct/:id", adminUpdateProduct);
router.put("/admin/updateSKU/:ctlsku", adminUpdateSKU);
router.put("/admin/updateSKUBulk", adminBulkUpdateClientSkus);
router.put("/admin/updateImages/:id", adminUpdateImages);
router.put("/admin/updateCategory/:id", adminUpdateCategory);
router.put("/admin/replenishment", adminReplenishment);
router.put("/admin/stocktake", adminStockTake);
router.post("/admin/upload", adminUpload);
router.post("/admin/uploadpdf", adminUploadPdf);
router.post("/admin", adminCreateProduct);
router.post("/admin/hobson", adminCreateHobsonProduct);
router.put("/admin/hobsonUpdate", adminUpdateHobsonProduct);
router.get("/admin/checkStockCount", checkStockCount);
router.get("/admin/productsCheck", productsCheck);

module.exports = router;
