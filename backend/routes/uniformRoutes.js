const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin, } = require('../middleware/verifyAuthToken');

const {
    getUniforms, getAllUniforms, getUniformsByCategory, getUniformById, adminCreateUniform, adminRemoveUniform, adminUpdateUniform, adminDeleteUniformImage, adminDeleteUniformPdf, adminUploadImg, adminUploadPdf
} = require('../controllers/uniformController');

router.use(verifyIsLoggedIn);
router.get("/category/:categoryName/search/:searchQuery", getUniforms);
router.get("/category/:categoryName", getUniforms);
router.get("/search/:searchQuery", getUniforms);
router.get("/brand/:brandName", getUniforms);
router.get("/", getAllUniforms);
router.get("/categoryName/:categoryName", getUniformsByCategory);
router.get("/get-one/:uniformId", getUniformById)

// admin routes:
router.use(verifyIsAdmin);
router.delete("/admin/:uniformId", adminRemoveUniform)
router.delete("/admin/image/:imagePath/:uniformId", adminDeleteUniformImage);
router.delete("/admin/pdf/:pdfPath/:uniformId", adminDeleteUniformPdf);
router.put("/admin/updateUniform/:id", adminUpdateUniform);
router.post("/admin", adminCreateUniform)
router.post("/admin/uploadimg", adminUploadImg);
router.post("/admin/uploadpdf", adminUploadPdf);

module.exports = router;
