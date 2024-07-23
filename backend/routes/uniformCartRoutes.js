const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken');

const {
    getUniformCart, getUniformCartByCompany, getUniformCartById, getUniformCartGetOne, updateUniformCartOnPurchase, updateUniformCartByUser, updateUniformCart, updateUniformCartLimit, updateUniformCartOnCartItemDelete, updateUniformCartOnEmptyCart, deleteUniformCart, adminRemoveUniformCart, adminUpdateUniformCart, adminCreateUniformCart,

} = require('../controllers/uniformCartController');

router.use(verifyIsLoggedIn);

router.get("/", getUniformCart);
router.get("/getByCompany/:userCompany", getUniformCartByCompany);
router.get("/get-one/:id", getUniformCartById)
router.get("/getByUser/:userId", getUniformCartGetOne)
router.put("/updateOne/:id", updateUniformCart)
router.put("/updateByUser/:id", updateUniformCartByUser)
router.put("/updateLimit/:id", updateUniformCartLimit)
router.put("/updateOnCartItemDelete/:id", updateUniformCartOnCartItemDelete)
router.put("/updateOnPurchase/:id", updateUniformCartOnPurchase)
router.put("/updateOnEmptyCart/:id", updateUniformCartOnEmptyCart)
router.delete("/delete/:id", deleteUniformCart)

// admin routes:
router.use(verifyIsAdmin);
router.post("/admin", adminCreateUniformCart)
router.put("/admin/:id", adminUpdateUniformCart)
router.delete("/admin/:id", adminRemoveUniformCart)

module.exports = router;