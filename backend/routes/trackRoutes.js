const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken');
const { saveTrackData, getUserTrackData, getUserEventTrackData } = require('../controllers/trackController');

//router.get('/', getCharts);

// admin routes:
router.use(verifyIsLoggedIn)
//router.use(verifyIsAdmin)
router.post('/', saveTrackData);
router.get("/admin", getUserTrackData);
router.get("/admin/:id", getUserEventTrackData);
//router.delete('/admin/:chartId', adminRemoveChart);


module.exports = router;
