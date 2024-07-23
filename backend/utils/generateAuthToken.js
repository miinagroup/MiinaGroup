const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, name, lastName, email, isAdmin, verified, siteSku, siteVerified, isSuperAdmin, isSales, isSalesAdmin, accounts, isMarketing, isDeveloper) => {
  return jwt.sign(
    { _id, name, lastName, email, isAdmin, verified, siteSku, siteVerified, isSuperAdmin, isSales, isSalesAdmin, accounts, isMarketing, isDeveloper },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "8d" }
  );
};
module.exports = generateAuthToken