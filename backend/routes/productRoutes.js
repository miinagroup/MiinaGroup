const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductByMNASKU,
  userUpdateSKU,
  adminGetProducts,
  adminGetMNASKU,
  adminGetSupplierSku,
  adminDeleteProduct,
  adminUpdateSKU,
  adminUpdateImages,
  adminUpdateCategory,
  adminCreateProduct,
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
  adminUpdateTags,
  adminFindDuplicateMNASKU
} = require("../controllers/productController");

const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

router.get("/visitor/search", searchProductsForVisitor);
router.get("/visitor/category/:categoryPath", getProductsVisitor);
router.get("/get-one/:id", getProductById);

router.use(verifyIsLoggedIn);
router.get("/category/:categoryPath", getProducts);
router.get("/brand/:brandName", getProducts);
router.get("/", getProducts);
router.get("/get-one/:id", getProductById);
router.put("/client/updateSKU/:mnasku", userUpdateSKU);
router.get("/search", searchProducts);

// admin routes:
router.use(verifyIsAdmin);
router.get("/admin", adminGetProducts);
router.get("/admin/getMNASKU", adminGetMNASKU);
router.get("/admin/getSupplierSKU/:supplier", adminGetSupplierSku);
router.delete("/admin/:id", adminDeleteProduct);
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage);
router.delete("/admin/pdf/:pdfPath/:productId", adminDeleteProductPdf);
router.put("/admin/updateProduct/:id", adminUpdateProduct);
router.put("/admin/updateSKU/:mnasku", adminUpdateSKU);
router.put("/admin/updateImages/:id", adminUpdateImages);
router.put("/admin/updateCategory/:id", adminUpdateCategory);
router.put("/admin/replenishment", adminReplenishment);
router.put("/admin/stocktake", adminStockTake);
router.post("/admin/upload", adminUpload);
router.post("/admin/uploadpdf", adminUploadPdf);
router.post("/admin", adminCreateProduct);
router.get("/admin/checkStockCount", checkStockCount);
router.get("/admin/productsCheck", productsCheck);
router.put("/admin/updateTags", adminUpdateTags);
router.get("/admin/findDuplicateSKU", adminFindDuplicateMNASKU)
module.exports = router;
