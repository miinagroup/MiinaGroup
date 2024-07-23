const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
  getAllPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  deletePurchaseOrder,
  getTodayPONumber,
  updatePurchaseOrder,
  updatePurchaseOrderStatus
} = require("../controllers/purchaseOrderController");

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);

router.get("/", getAllPurchaseOrders);
router.get("/get-one/:id", getPurchaseOrderById);
router.get("/getPON", getTodayPONumber);
router.post("/add", createPurchaseOrder);
router.put("/update/:id", updatePurchaseOrder);
router.put("/updateStatus", updatePurchaseOrderStatus);
router.delete("/delete/:id", deletePurchaseOrder);

module.exports = router;
