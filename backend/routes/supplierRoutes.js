const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken');
const {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
} = require('../controllers/supplierController');

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);

router.get('/', getAllSuppliers);
router.get('/get-one/:id', getSupplierById);
router.post('/add', createSupplier);
router.put('/:id', updateSupplier);
router.delete('/delete/:id', deleteSupplier);

module.exports = router;
