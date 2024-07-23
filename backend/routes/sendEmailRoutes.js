const express = require("express");
const router = express.Router();
const {
  quoteProduct,
  quotePrice,
  managementApproval,
  newOrderRemind,
  sendInvoice,
  deliveryNotice,
  quoteCompletedNotice,
  sendQuotePDF,
  sendPOPDF,
} = require("../controllers/sendEmailController");
const { verifyIsLoggedIn } = require("../middleware/verifyAuthToken");

router.use(verifyIsLoggedIn);

router.post("/quoteproduct", quoteProduct);
router.post("/quoteprice", quotePrice);
router.post("/managementApproval", managementApproval);
router.post("/newOrderRemind", newOrderRemind);
router.post("/emailInv", sendInvoice);
router.post("/emailPO", sendPOPDF);
router.post("/emailShipping", deliveryNotice);
router.post("/emailQuote", quoteCompletedNotice);
router.post("/emailDownloadedQuote", sendQuotePDF);



module.exports = router;
