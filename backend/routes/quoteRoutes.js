const express = require("express");
const router = express.Router();
const {
    verifyIsLoggedIn,
    verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
    adminGetQuotes,
    getQuoteById,
    userGetQuotes,
    adminGetQuoteById,
    userCreateQuote,
    adminUpdateStatus,
    adminUpdateNewQuote,
    clientUploadImage,
    userAcceptQuote,
    userReRequestQuote,
    updateQuoteSubmittedAt,
    userRequestQuotePdf,
    deleteQuote,
    adminDuplicateQuote,
    adminCreateQuote,
    adminUpdateQuoteName,
    downloadQuotePDF,
} = require("../controllers/quoteController");

// user routes
router.use(verifyIsLoggedIn);
router.get("/user/:id", getQuoteById);
router.get("/user/", userGetQuotes);
router.post("/upload", clientUploadImage);
router.post("/create", userCreateQuote);
router.post("/accept", userAcceptQuote);
router.post("/rerequest", userReRequestQuote);
router.post("/requestPdf", userRequestQuotePdf);
router.post("/delete/:quoteId", deleteQuote);
router.post("/download", downloadQuotePDF);

// admin routes
router.use(verifyIsAdmin);
router.get("/admin/", adminGetQuotes);
router.post("/admin/status", adminUpdateStatus);
router.post("/admin/update", adminUpdateNewQuote);
router.get("/admin/quoteItem", adminGetQuoteById);
router.post("/admin/updateSubmittedAt", updateQuoteSubmittedAt);
router.post("/admin/duplicate", adminDuplicateQuote);
router.post("/admin/create", adminCreateQuote);
router.put("/admin/updateName", adminUpdateQuoteName);




module.exports = router;
