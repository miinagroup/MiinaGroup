const express = require('express')
const router = express.Router()
const {getWeather, getAdminWeather, adminCreateWeather, adminUpdateWeather} = require("../controllers/weatherController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")


router.use(verifyIsLoggedIn)
router.get("/weather/:location", getWeather)
router.use(verifyIsAdmin)
router.post("/create", adminCreateWeather)
router.put("/update", adminUpdateWeather)
router.get("/admin", getAdminWeather)

module.exports = router

