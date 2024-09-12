const express = require('express')
const router = express.Router()
const { getCategories, getT1Categories, newCategory, deleteCategory, saveAttr, categoriesForProductList, updateCategoryDisplay, getSubcategoriesT2 } = require("../controllers/categoryController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")

router.get("/T1Categories", getT1Categories)
router.get("/subcategories", getSubcategoriesT2)
// router.use(verifyIsLoggedIn)
router.get("/categoryBlocks/:categoryName", categoriesForProductList)
router.get("/", getCategories)
router.use(verifyIsAdmin)
router.post("/", newCategory)
router.post("/updateDisplay", updateCategoryDisplay)
router.delete("/:category", deleteCategory) //有：是说this is dynamic part of the address
router.post("/attr", saveAttr) //没有：是说this is NOT dynamic part of the address


module.exports = router

