const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")

const { adminCreateDeliveryBook, getAllDeliveryBook, adminDeleteDeliveryBook, adminUpdateDeliveryBook, getAdminDeliveryBook, getDeliveryBook, getDeliveryBookById } = require("../controllers/deliveryBookController")
router.use(verifyIsLoggedIn)
router.get("/", getAllDeliveryBook)
router.get("/get-one/:id", getDeliveryBookById)
router.get("/deliveryBook/:email", getDeliveryBook)

router.use(verifyIsAdmin)
router.get("/admin", getAdminDeliveryBook)
router.post("/admin", adminCreateDeliveryBook)
router.put("/admin/:id", adminUpdateDeliveryBook)
router.delete("/admin/:id", adminDeleteDeliveryBook)

module.exports = router