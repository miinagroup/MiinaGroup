const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken');
const {
    getNews, getNewsById, adminCreateNews, adminRemoveNews, adminUpdateNews,
} = require('../controllers/newsController');

router.get('/', getNews);
router.get('/get-one/:id', getNewsById);
// admin routes:
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.post('/admin', adminCreateNews);
router.delete('/admin/:newsId', adminRemoveNews);
router.put("/admin/updateNews/:id", adminUpdateNews);


module.exports = router;