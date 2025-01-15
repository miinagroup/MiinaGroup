const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn } = require('../middleware/verifyAuthToken');
const {
  // createCart,
  // getUserCart,
  getCart,
  addToCart,
  reOrder,
  updateItem,
  deleteItem,
  removeAllItems
} = require('../controllers/cartController');

router.use(verifyIsLoggedIn);

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/reOrder', reOrder);
router.put('/update/:itemId', updateItem);
router.delete('/delete/:itemId', deleteItem);
router.delete('/remove', removeAllItems);

module.exports = router;
