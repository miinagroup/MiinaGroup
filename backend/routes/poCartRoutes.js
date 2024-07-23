const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken');
const {
  getPOCart,
  addToPOCart,
  deleteItemFromPOCart,
  updateItemFromPOCart,
  removeAllItems
} = require('../controllers/poCartController');

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);

router.get('/', getPOCart);
router.post('/add', addToPOCart);
router.delete('/delete/:itemId', deleteItemFromPOCart);
router.put('/update/:itemId', updateItemFromPOCart);
router.delete('/remove', removeAllItems);

module.exports = router;