const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken');
const {
  adminCreateChart, getCharts, adminRemoveChart,
} = require('../controllers/chartController');


// admin routes:
router.use(verifyIsLoggedIn)
router.get('/', getCharts);
router.use(verifyIsAdmin)
router.post('/admin', adminCreateChart);
router.delete('/admin/:chartId', adminRemoveChart);


module.exports = router;
