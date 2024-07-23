const express = require("express");
const router = express.Router();
const {
  adminGetPromotions,
  getPromotions,
  createPromotions,
  getPromotionById,
  adminUpdatePromotion,
  updateExpiredPromotion
} = require("../controllers/promotionController");
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

router.get("/promotion/:date", getPromotions);
router.use(verifyIsLoggedIn);

router.use(verifyIsAdmin);
router.post("/admin", createPromotions);
router.get("/admin/fetchPromotions", adminGetPromotions);
router.get("/admin/get-one/:id", getPromotionById);
router.put("/admin/update/:id", adminUpdatePromotion);
router.put("/admin/extend", updateExpiredPromotion);

module.exports = router;
