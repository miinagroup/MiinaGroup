const DeliveryBook = require("../models/DeliveryBookModel");
const User = require("../models/UserModel");

const getAdminDeliveryBook = async (req, res, next) => {
  try {
    const deliveryBooks = await DeliveryBook.find({})
      .sort({ companyName: "asc" })
      .orFail();
    res.json(deliveryBooks);
  } catch (error) {
    next(error);
  }
};

/* const getDeliveryBook = async (req, res, next) => {
    try {
        const userEmail = req.params.email?.split("@")[1];
        const deliveryBooks = await DeliveryBook.find({ emailHost: userEmail }).orFail();
        res.json(deliveryBooks);
    } catch (error) {
        next(error);
    }
}; */
const getAllDeliveryBook = async (req, res, next) => {
  try {
    const deliveryBooks = await DeliveryBook.find({}).orFail();
    res.json(deliveryBooks);
  } catch (error) {
    next(error);
  }
};

const getDeliveryBook = async (req, res, next) => {
  try {
    const userEmail = req.params.email?.split("@")[1];
    if (!userEmail) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const deliveryBooks = await DeliveryBook.find({
      emailHost: new RegExp(userEmail, "i")
    }).orFail();

    res.json(deliveryBooks);
  } catch (error) {
    next(error);
  }
};

const getDeliveryBookById = async (req, res, next) => {
  try {
    const deliveryBook = await DeliveryBook.findById(req.params.id).orFail();
    res.json(deliveryBook);
  } catch (err) {
    next(err);
  }
};

const adminCreateDeliveryBook = async (req, res, next) => {
  try {
    const deliveryBook = new DeliveryBook();
    const { companyName, emailHost, billingEmail, companyAccount, quickBooksCustomerId, sites } =
      req.body;
    deliveryBook.companyName = companyName;
    deliveryBook.emailHost = emailHost;
    deliveryBook.billingEmail = billingEmail;
    deliveryBook.companyAccount = companyAccount;
    deliveryBook.quickBooksCustomerId = quickBooksCustomerId;
    if (sites.length > 0) {
      deliveryBook.sites = [];
      sites.map((item) => {
        const { name, billingAddress, deliveryAddress, storeEmail } = item;
        deliveryBook.sites.push({
          name: name || "",
          billingAddress: billingAddress || "",
          deliveryAddress: deliveryAddress || "",
          storeEmail: storeEmail || "",

        });
      });
    } else {
      deliveryBook.sites = [];
    }
    await deliveryBook.save();

    res.json({
      message: "Delivery Book Created",
      deliveryBookId: deliveryBook._id,
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateDeliveryBook = async (req, res, next) => {
  try {

    const { isAdmin, isSuperAdmin, email } = req.user;

    const deliveryBook = await DeliveryBook.findById(req.params.id).orFail();

    if (isAdmin && !isSuperAdmin) {
      const editHistoryEntry = {
        operator: email,
        editedAt: new Date(),
        function: 'update delivery book'
      };

      deliveryBook.editeHistroys.push(editHistoryEntry);
      await deliveryBook.save();

      return res.status(403).json({ message: "You do not have permission to update delivery book." });
    }

    const { companyName, emailHost, billingEmail, companyAccount, quickBooksCustomerId, dueDays, sites } =
      req.body;
    deliveryBook.companyName = companyName || deliveryBook.companyName;
    deliveryBook.emailHost = emailHost || deliveryBook.emailHost;
    deliveryBook.billingEmail = billingEmail || deliveryBook.billingEmail;
    deliveryBook.companyAccount = companyAccount || deliveryBook.companyAccount;
    deliveryBook.quickBooksCustomerId = quickBooksCustomerId || deliveryBook.quickBooksCustomerId;
    deliveryBook.dueDays = dueDays || deliveryBook.dueDays;
    if (sites.length > 0) {
      deliveryBook.sites = [];
      sites.map((item) => {
        const { name, billingAddress, deliveryAddress, siteSku, storeEmail } = item;
        deliveryBook.sites.push({
          name: name || "",
          billingAddress: billingAddress || "",
          deliveryAddress: deliveryAddress || "",
          siteSku: siteSku || "",
          storeEmail: storeEmail || "",
        });
      });
    } else {
      deliveryBook.sites = [];
    }

    await deliveryBook.save();
    res.json({
      message: "Delivery Book Updated",
    });
  } catch (err) {
    next(err);
  }
};

const adminDeleteDeliveryBook = async (req, res, next) => {
  try {

    const { isAdmin, isSuperAdmin, email } = req.user;

    const deliveryBook = await DeliveryBook.findById(req.params.id).orFail();

    if (isAdmin && !isSuperAdmin) {
      const editHistoryEntry = {
        operator: email,
        editedAt: new Date(),
        function: 'delete delivery book'
      };

      deliveryBook.editeHistroys.push(editHistoryEntry);
      await deliveryBook.save();

      return res.status(403).json({ message: "You do not have permission to delete delivery book." });
    }

    await deliveryBook.remove();

    res.json({ message: "Delivery Book Deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  adminCreateDeliveryBook,
  adminDeleteDeliveryBook,
  adminUpdateDeliveryBook,
  getDeliveryBook,
  getAllDeliveryBook,
  getDeliveryBookById,
  getAdminDeliveryBook,
};
