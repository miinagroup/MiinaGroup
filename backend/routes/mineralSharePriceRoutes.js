const express = require('express')
const router = express.Router()
const {getMineralPrice, getStockPrice, adminCreatePrice, adminUpdateMineralsPrice, adminUpdateStocksPrice} = require("../controllers/mineralSharePricingController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")


// router.use(verifyIsLoggedIn)
router.get("/minerals", getMineralPrice)
router.get("/stocks", getStockPrice)
router.use(verifyIsAdmin)
router.put("/updateMineralsPrice", adminUpdateMineralsPrice)
router.put("/updateStocksPrice", adminUpdateStocksPrice)
router.post("/create", adminCreatePrice)

module.exports = router

