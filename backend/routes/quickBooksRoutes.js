const express = require('express');
const router = express.Router();
const {
  fetchAuthori,
  callback,
  retrieveToken,
  makeAPICall,
  refreshAccessToken,
  disconnect,
  updateData,
  processProductsInOrderTable,
  processInovices,
  processPayment,
  checkInvTax,
  processTnxDate
} = require("../controllers/quickBooksController");
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");

/* router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin) */

router.get("/fetchAuthori", fetchAuthori);
router.get("/callback", callback);
router.get("/retrieveToken", retrieveToken);
router.get("/makeAPICall", makeAPICall);
router.get("/refreshAccessToken", refreshAccessToken);
router.get("/disconnect", disconnect);
router.post("/updateData", updateData);
router.post("/processProducts", processProductsInOrderTable);
router.post("/processInovices", processInovices);
router.post("/processPayment", processPayment);
router.post("/checkInvBalance", checkInvTax);
router.post("/processTnxDate", processTnxDate);

module.exports = router;
