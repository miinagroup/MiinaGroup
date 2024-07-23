const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin, } = require('../middleware/verifyAuthToken');

const {

} = require('../controllers/UniformSuppliersController');

router.use(verifyIsLoggedIn);

// admin routes:
router.use(verifyIsAdmin);

module.exports = router;