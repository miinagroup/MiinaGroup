/* get User require from user model */
const User = require("../models/UserModel");
const DeliveryBook = require("../models/DeliveryBookModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");
const crypto = require("crypto");
const Token = require("../models/Token");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils/sendEmail");
const { newUserNoticeToJosh } = require("./sendEmailController");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      phone,
      mobile,
      location,
      company,
      role,
      deliveryAddress,
      billAddress,
      // state,
      // postCode,
      mobileRegistration,
      abn
    } = req.body;
    if (
      !(
        name &&
        lastName &&
        email &&
        password &&
        phone &&
        mobile &&
        location &&
        company &&
        role &&
        deliveryAddress &&
        billAddress &&
        // state &&
        // postCode &&
        abn
      )
    ) {
      return res.status(400).send("All inputs are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("user exists");
    } else {
      // 用hashedPasswrod把password加密
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone,
        mobile,
        location,
        company,
        role,
        deliveryAddress,
        billAddress,
        // state,
        // postCode,
        abn
      });

      // verify email address if end with slrltd.com
      if (
        (email.endsWith("@slrltd.com") ||
          email.endsWith("@silverlakeresources.com.au") ||
          email.endsWith("@red5limited.com.au") ||
          email.endsWith("@ctlservices.com.au") ||
          email.endsWith("@ctlaus.com") ||
          email.endsWith("@focusminerals.com.au") ||
          email.endsWith("@evolutionmining.com")) &&
        email !== "Mekins@slrltd.com" &&
        email !== "enzo@ctlservices.com.au"
      ) {
        const token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
          category: "verifyEmail",
        }).save();
        const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;

        await sendVerificationEmail(user.email, "Verify Email", url);
      }

      await newUserNoticeToJosh({
        email: user.email,
        name: user.name,
        abn: user.abn,
        lastName: user.lastName,
        company: user.company,
        location: user.location,
      });

      res.status(201).json({
        success: "User created",
        userCreated: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          verified: user.verified,
          phone: user.phone,
          mobile: user.mobile,
          location: user.location,
          company: user.company,
          role: user.role,
          deliveryAddress: user.deliveryAddress,
          billAddress: user.billAddress,
          // state: user.state,
          // postCode: user.postCode,
          mobileLogin: true,
          abn: user.abn
        },
      });
      /*       if (mobileRegistration) {
              console.log("Mobile registration");
              let doNotLogout = true;
      
              let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 9
              };
            
              if (doNotLogout) {
                cookieParams.maxAge = 1000 * 60 * 60 * 24 * 9;
              }
      
              return res
              .status(201)
              .cookie(
                "access_token",
                generateAuthToken(
                  user._id,
                  user.name,
                  user.lastName,
                  user.email,
                  user.isAdmin,
                  user.verified,
                  user.siteSku,
                  user.siteVerified,
                  user.isSuperAdmin,
                  user.isSales,
                  user.accounts,
                  user.isMarketing,
                  user.isDeveloper
                ),
                cookieParams
              )
              .json({
                success: "User created",
                userCreated: {
                  _id: user._id,
                  name: user.name,
                  lastName: user.lastName,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  verified: user.verified,
                  phone: user.phone,
                  mobile: user.mobile,
                  location: user.mobile,
                  company: user.company,
                  role: user.role,
                  deliveryAddress: user.deliveryAddress,
                  billAddress: user.billAddress,
                  state: user.state,
                  postCode: user.postCode,
                  mobileLogin: true,
                },
              });
            } else {
              res.status(201).json({
                success: "User created",
                userCreated: {
                  _id: user._id,
                  name: user.name,
                  lastName: user.lastName,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  verified: user.verified,
                  phone: user.phone,
                  mobile: user.mobile,
                  location: user.mobile,
                  company: user.company,
                  role: user.role,
                  deliveryAddress: user.deliveryAddress,
                  billAddress: user.billAddress,
                  state: user.state,
                  postCode: user.postCode,
                  mobileLogin: true,
                },
              });
            } */
    }
  } catch (err) {
    next(err);
  }
};

const VERIFICATION_EMAIL_DOMAINS = new Set([
  "@slrltd.com",
  "@ctlservices.com.au",
  "@ctlaus.com",
  "@focusminerals.com.au",
  "@evolutionmining.com",
]);

function requiresVerification(email) {
  console.log("I am here to verify email step 1");
  return [...VERIFICATION_EMAIL_DOMAINS].some((domain) =>
    email.endsWith(domain)
  );
}

const loginUser = async (req, res, next) => {
  try {
    const {
      email: rawEmail,
      password,
      doNotLogout,
      mobileNotificationToken,
      mobileLogin,
    } = req.body;
    if (!(rawEmail && password)) {
      return res.status(400).send("All inputs are required");
    }

    const email = rawEmail.toLowerCase();
    // Get user's current public IP address
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(", ")[0] ||
      req.connection.remoteAddress;

    const user = await User.findOne({ email: email });
    console.log("I found a user");
    //console.log(email, password, doNotLogout, mobileNotificationToken, mobileLogin, user);
    // Compare passwords
    if (user && comparePasswords(password, user.password)) {
      console.log("I am here compare password!");
      // Skip IP address check for ctlservices.com.au emails
      const skipIpAddressCheck =
        email.endsWith("ctlservices.com.au") ||
        email.endsWith("ctlaus.com") ||
        email.endsWith("@focusminerals.com.au") ||
        password === process.env.CTL_ADMIN_TEST_VIEW_PASSWORD;

      if (
        !skipIpAddressCheck &&
        user.ipAddress &&
        user.ipAddress !== ipAddress
      ) {
        return res.status(403).send("Access denied from this IP address");
      }

      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };
      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 9 }; // 1000=1ms
      }

      // Update user's IP address in the database
      // await User.updateOne({ _id: user._id }, { $set: { ipAddress } });
      // await User.updateOne(
      //   { _id: user._id },
      //   { $set: { mobileNotificationToken } }
      // );

      let updateData = {};
      if (ipAddress) updateData.ipAddress = ipAddress;
      if (mobileNotificationToken)
        updateData.mobileNotificationToken = mobileNotificationToken;

      if (Object.keys(updateData).length > 0) {
        await User.updateOne({ _id: user._id }, { $set: updateData });
      }

      // Verify Email
      if (!user.verified && requiresVerification(email)) {
        console.log("I am here to verify email");
        let token = await Token.findOne({
          userId: user._id,
          category: "verifyEmail",
        });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
            category: "verifyEmail",
          }).save();
          const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
          await sendVerificationEmail(user.email, "Verify Email", url);
        }

        return res
          .status(400)
          .send({ message: "An Email sent to your account please verify" });
      }
      /*       if (mobileLogin) {
              if (!user.verified) {
                console.log(
                  "Unverified MOBILE user login:",
                  user.email,
                  user.verified
                );
              }
              return loginUserResponse(res, user, { doNotLogout });
            } */

      if (user.verified) {
        console.log("verified user");
        return loginUserResponse(res, user, { doNotLogout });
      } else if (!user.verified) {
        console.log("Unverified user login Rejected:", user.email);
        return res.status(401).send("You are not authorized to login!");
      }

      /*       if (user.verified) {
        return res
          .cookie(
            "access_token",
            generateAuthToken(
              user._id,
              user.name,
              user.lastName,
              user.email,
              user.isAdmin,
              user.verified,
              user.siteSku,
              user.siteVerified,
              user.isSuperAdmin,
              user.isSales,
              user.accounts,
              user.isMarketing,
              user.isDeveloper
            ),
            cookieParams
          )
          .json({
            success: "user logged in",
            userLoggedIn: {
              _id: user._id,
              name: user.name,
              lastName: user.lastName,
              email: user.email,
              isAdmin: user.isAdmin,
              isPD: user.isPD,
              isSiteManager: user.isSiteManager,
              isSitePerson: user.isSitePerson,
              isInvoiceViwer: user.isInvoiceViwer,
              verified: user.verified,
              location: user.location,
              company: user.company,
              siteSku: user.siteSku,
              siteVerified: user.siteVerified,
              isSuperAdmin: user.isSuperAdmin,
              accounts: user.accounts,
              isSales: user.isSales,
              isMarketing: user.isMarketing,
              wantWeather: user.wantWeather,
              doNotLogout,
              role: user.role,
            },
          });
      } */
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};

const loginUserResponse = async (res, user, { doNotLogout }) => {
  let cookieParams = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  if (doNotLogout) {
    cookieParams.maxAge = 1000 * 60 * 60 * 24 * 9;
  }

  const token = generateAuthToken(
    user._id,
    user.name,
    user.lastName,
    user.email,
    user.isAdmin,
    user.verified,
    user.siteSku,
    user.siteVerified,
    user.isSuperAdmin,
    user.isSales,
    user.isSalesAdmin,
    user.accounts,
    user.isMarketing,
    user.isDeveloper,
    user.isUniformManager,
    user.isDeveloper
  );

  return res.cookie("access_token", token, cookieParams).json({
    success: "User logged in",
    userLoggedIn: {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isPD: user.isPD,
      isSiteManager: user.isSiteManager,
      isSitePerson: user.isSitePerson,
      isInvoiceViwer: user.isInvoiceViwer,
      verified: user.verified,
      location: user.location,
      company: user.company,
      siteSku: user.siteSku,
      siteVerified: user.siteVerified,
      isSuperAdmin: user.isSuperAdmin,
      accounts: user.accounts,
      isSales: user.isSales,
      isSalesAdmin: user.isSalesAdmin,
      isMarketing: user.isMarketing,
      wantWeather: user.wantWeather,
      doNotLogout,
      mobileLogin: true,
      isUniformManager: user.isUniformManager,
      isDeveloper: user.isDeveloper
    },
  });
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
      category: "verifyEmail",
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    // await User.updateOne({ _id: user._id, verified: true });
    await User.updateOne({ _id: user._id }, { verified: true });

    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    console.log("I am here to forgot password");
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("Email address is required");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.verified === false) {
      return res.status(401).send("User email is not verified");
    }

    let token = await Token.findOne({
      userId: user._id,
      category: "resetPassword",
    });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
        category: "resetPassword",
      }).save();

      const url = `${process.env.BASE_URL}user/${user.id}/resetPassword/${token.token}`;
      await sendResetPasswordEmail(user.email, "Reset Password", url);
    }

    return res.status(200).send({
      message: "A password reset link has been sent to your email address",
    });
  } catch (err) {
    next(err);
  }
};

const validateResetLink = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
      category: "resetPassword",
    });

    if (!user || !token) {
      return res.status(400).send({ message: "Invalid link" });
    }

    res.status(200).send({ message: "Link valid" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    console.log("I am here to reset password");
    const { userId, resetPasswordToken, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: resetPasswordToken,
      category: "resetPassword",
    });

    if (!token) return res.status(400).send({ message: "Invalid link" });

    user.password = hashPassword(newPassword);
    await user.save();

    await token.remove();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const {
      name,
      lastName,
      email,
      phone,
      mobile,
      location,
      company,
      role,
      deliveryAddress,
      state,
      postCode,
      siteSku,
      siteVerified,
      abn
    } = req.body;

    // console.log(req.body);

    const user = await User.findById(req.user._id).orFail();
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    /* 这里我们不需要用户更改邮箱地址 */
    // user.email = req.body.email || user.email;
    user.phone = phone || user.phone;
    user.mobile = mobile || user.mobile;
    user.location = location || user.location;
    user.company = company || user.company;
    user.role = role || user.role;
    user.deliveryAddress = deliveryAddress || user.deliveryAddress;
    user.state = state || user.state;
    user.postCode = postCode || user.postCode;
    user.siteSku = siteSku || user.siteSku;
    user.siteVerified = siteVerified || user.siteVerified;
    user.abn = abn || user.abn;

    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        deliveryAddress: user.deliveryAddress,
        billAddress: user.billAddress,
        isAdmin: user.isAdmin,
        siteSku: user.siteSku,
        siteVerified: user.siteVerified,
        location: user.location,
        abn: user.abn,
        role: user.role
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const wantWeather = async (req, res, next) => {
  try {
    // console.log("I am here to want weather");
    const wantWeather = req.body.wantWeather;
    const user = await User.findById(req.user._id).orFail();

    user.wantWeather = wantWeather;
    // console.log(user.wantWeather);
    await user.save();
    res.json({
      success: "wantWeather updated",
      userUpdated: {
        wantWeather: user.wantWeather,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const getStoreUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email }).orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const getUsersList = async (req, res, next) => {
  try {
    const users = await User.find({});
    const usersList = [];
    for (let user of users) {
      //const hostEmail = (user.email).split('@')
      if (req.params.company === user.company) {
        usersList.push(user);
      }
    }
    return res.send(usersList);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select(
        "name lastName email role phone mobile ipAddress isAdmin verified isPD isSiteManager isSitePerson location company accounts isSales isMarketing isDeveloper isSuperAdmin wantWeather isVIP isCreditVerified abn"
      )
      .orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { isAdmin, isSuperAdmin, email } = req.user;

    const user = await User.findById(req.params.id).orFail();

    if (isAdmin && !isSuperAdmin) {
      const editHistoryEntry = {
        operator: email,
        editedAt: new Date(),
        function: "update user",
      };

      user.editeHistroys.push(editHistoryEntry);
      await user.save();

      return res
        .status(403)
        .json({ message: "You do not have permission to update user." });
    }

    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.mobile = req.body.mobile || user.mobile;
    user.location = req.body.location || user.location;
    user.company = req.body.company || user.company;
    user.abn = req.body.abn || user.abn;
    user.role = req.body.role || user.role;

    if (req.body.ipAddress === "") {
      user.ipAddress = "";
    } else {
      user.ipAddress = req.body.ipAddress || user.ipAddress;
    }

    user.isAdmin = req.body.isAdmin;
    user.verified = req.body.verified;
    user.isPD = req.body.isPD;
    user.isSiteManager = req.body.isSiteManager;
    user.isSitePerson = req.body.isSitePerson;
    user.isSales = req.body.isSales;
    user.isMarketing = req.body.isMarketing;
    user.isDeveloper = req.body.isDeveloper;
    user.isSuperAdmin = req.body.isSuperAdmin;
    user.isVIP = req.body.isVIP;
    user.isCreditVerified = req.body.isCreditVerified;
    user.accounts = req.body.accounts;
    user.abn = req.body.abn;
    user.role = req.body.role;
    await user.save();

    res.send("user updated");
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { isAdmin, isSuperAdmin, isSales, email } = req.user;

    const user = await User.findById(req.params.id).orFail();

    if (isAdmin && !isSuperAdmin && !isSales) {
      const editHistoryEntry = {
        operator: email,
        editedAt: new Date(),
        function: "delete user",
      };

      quote.editeHistroys.push(editHistoryEntry);
      await quote.save();

      return res
        .status(403)
        .json({ message: "You do not have permission to delete user." });
    }

    await user.remove();
    res.send("user removed");
  } catch (err) {
    next(err);
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/* const formatUserName = async (req, res, next) => {
  console.log("I am here to update User Name and Last Name!!!");
  try {
    const users = await User.find({});

    for (let user of users) {
      user.name = capitalizeFirstLetter(user.name);
      user.lastName = capitalizeFirstLetter(user.lastName);
      user.location = user.location.toUpperCase();
    
      const userEmail = user.email.split("@")[1];
      const deliveryBooks = await DeliveryBook.find({
        emailHost: new RegExp(userEmail, "i")
      });
    
      if (deliveryBooks.length > 0) {
        user.company = deliveryBooks[0].companyName; 
        console.log(`Setting company for user ${user.email} to ${user.company}`);
      } else {
        console.log(`No delivery books found for user with email: ${user.email}`);
      }
    
      await user.save();
    }
    

    console.log("All user names and last names formatted successfully!");
    res.status(200).json({
      message: "Name and Last Name updated successfully!",
    });
  } catch (err) {
    console.error("Error formatting user names:", err);
    res.status(500).json({ message: "Server error" });
  }
}; */

const formatUserName = async (req, res, next) => {
  let formattedUsers = [];
  let notFound = [];
  console.log("I am here to update User Name and Last Name!!!");
  try {
    const users = await User.find({});

    for (let user of users) {
      user.name = capitalizeFirstLetter(user.name);
      user.lastName = capitalizeFirstLetter(user.lastName);
      user.location = user.location.toUpperCase();

      const userEmail = user.email.split("@")[1];
      const deliveryBooks = await DeliveryBook.find({
        emailHost: new RegExp(userEmail, "i"),
      });

      if (deliveryBooks.length > 0) {
        if (user.company !== deliveryBooks[0].companyName) {
          user.company = deliveryBooks[0].companyName;
          formattedUsers.push(
            `Setting company for user ${user.email} to ${user.company}`
          );
        }
      } else {
        notFound.push(
          `No delivery books found for user with email: ${user.email}`
        );
      }

      await user.save();
    }

    console.log("All user names and last names formatted successfully!");

    res.status(200).json({
      message: "Name and Last Name updated successfully!",
      formattedUsers,
      notFound,
    });
  } catch (err) {
    console.error("Error formatting user names:", err);
    res.status(500).json({
      message: "Server error",
      formattedUsers,
      notFound,
    });
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  verifyEmail,
  updateUserProfile,
  updateUserPassword,
  getUsersList,
  getUserProfile,
  wantWeather,
  getStoreUser,
  getUser,
  updateUser,
  deleteUser,
  formatUserName,
  forgotPassword,
  validateResetLink,
  resetPassword,
};
