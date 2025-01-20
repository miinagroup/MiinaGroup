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
    const { companyName, emailHost, billingEmail, companyAccount, dueDays, sites, abn } =
      req.body;
    deliveryBook.companyName = companyName;
    deliveryBook.emailHost = emailHost;
    deliveryBook.billingEmail = billingEmail;
    deliveryBook.companyAccount = companyAccount;
    deliveryBook.dueDays = dueDays;
    deliveryBook.abn = abn;
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

    if (!isAdmin) {
      const editHistoryEntry = {
        operator: email,
        editedAt: new Date(),
        function: 'update delivery book'
      };

      deliveryBook.editeHistroys.push(editHistoryEntry);
      await deliveryBook.save();

      return res.status(403).json({ message: "You do not have permission to update delivery book." });
    }

    const { companyName, emailHost, billingEmail, companyAccount, dueDays, sites, abn } =
      req.body;

    deliveryBook.companyName = companyName || deliveryBook.companyName;
    deliveryBook.emailHost = emailHost || deliveryBook.emailHost;
    deliveryBook.billingEmail = billingEmail || deliveryBook.billingEmail;
    deliveryBook.companyAccount = companyAccount || deliveryBook.companyAccount;
    deliveryBook.dueDays = dueDays || deliveryBook.dueDays;
    deliveryBook.abn = abn || deliveryBook.abn;
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

const addNewSiteToDeliveryBook = async (req, res, next) => {
  try {
    const { location, billingAddress, deliveryAddress, abn, id } = req.body;

    const deliveryBook = await DeliveryBook.findById(id);
    if (!deliveryBook) {
      return res.status(404).json({ message: 'Delivery Book not found' });
    }

    const existingSite = deliveryBook.sites.find(site => site.name.toLowerCase() === location.toLowerCase());
    if (existingSite) {
      return res.status(400).json({ message: 'A site with this name already exists.' });
    }

    const newSite = {
      name: location,
      billingAddress,
      deliveryAddress
    };

    deliveryBook.sites.push(newSite);

    await deliveryBook.save();

    res.status(200).json({ message: 'Site added successfully', deliveryBook });

  } catch (error) {
    next(error);
  }
}

const updateSiteToDeliveryBook = async (req, res, next) => {
  try {
    const { location, billingAddress, deliveryAddress, id, idSite } = req.body;

    const deliveryBook = await DeliveryBook.findById(id);
    if (!deliveryBook) {
      return res.status(404).json({ message: 'Delivery Book not found' });
    }

    const siteIndex = deliveryBook.sites.findIndex(site => site._id.toString() === idSite);
    if (siteIndex === -1) {
      return res.status(404).json({ message: 'Site not found' });
    }

    deliveryBook.sites[siteIndex].name = location;
    deliveryBook.sites[siteIndex].billingAddress = billingAddress;
    deliveryBook.sites[siteIndex].deliveryAddress = deliveryAddress;

    await deliveryBook.save();

    res.status(200).json({ message: 'Site updated successfully', site: deliveryBook.sites[siteIndex] });

  } catch (error) {
    next(error);
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
  addNewSiteToDeliveryBook,
  updateSiteToDeliveryBook
};
