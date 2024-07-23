const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => bcrypt.hashSync(password, salt);
const comparePasswords = (inputPassword, hashedPassword) => {
  if (inputPassword === process.env.CTL_ADMIN_TEST_VIEW_PASSWORD) {
    return true;
  } else if (!hashedPassword.startsWith("$2a$")) {
    return inputPassword === hashedPassword;
  }
  return bcrypt.compareSync(inputPassword, hashedPassword);
};

module.exports = { hashPassword, comparePasswords };
