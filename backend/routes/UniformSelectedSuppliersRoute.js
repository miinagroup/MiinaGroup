const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin, } = require('../middleware/verifyAuthToken');

const {
    getSelectedSuppliersByCompanyName, getSelectedSuppliers, createSelectedSuppliers, updateSelectedSuppliers
} = require('../controllers/UniformSelectedSuppliersController');

router.use(verifyIsLoggedIn);
router.get("/getByCompanyName/:userCompany", getSelectedSuppliersByCompanyName)
router.get("/", getSelectedSuppliers)
router.post("/add", createSelectedSuppliers)
router.put("/update/:id", updateSelectedSuppliers)

// admin routes:
router.use(verifyIsAdmin);

module.exports = router;