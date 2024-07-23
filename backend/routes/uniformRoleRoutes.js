const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin, } = require('../middleware/verifyAuthToken');

const {
    getUniformRole, getUniformRoleByRole, adminCreateUniformRole, adminRemoveUniformRole, adminUpdateUniformRole
} = require('../controllers/uniformRoleController');

router.use(verifyIsLoggedIn);
router.get("/", getUniformRole);
router.get("/get-one/:userRole", getUniformRoleByRole)

// admin routes:
router.use(verifyIsAdmin);
router.delete("/admin/:uniformRoleId", adminRemoveUniformRole)
router.put("/admin/updateUniformRole/:id", adminUpdateUniformRole);
router.post("/admin", adminCreateUniformRole)

module.exports = router;
