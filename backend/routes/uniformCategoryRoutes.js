const express = require('express')
const router = express.Router()
const { categoriesForUniformList, getCategories } = require("../controllers/UniformCategoryController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")

router.use(verifyIsLoggedIn)
router.get("/uniformCategoryBlocks/:categoryName", categoriesForUniformList)
router.get("/", getCategories)
router.use(verifyIsAdmin)


module.exports = router