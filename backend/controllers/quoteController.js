const Quote = require("../models/QuoteModel");
const Product = require("../models/ProductModel");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const imageValidate = require("../utils/imageValidate");
const cron = require("node-cron");
const moment = require("moment-timezone");
const {
  quoteCompletedNotice,
  sendQuotePDF,
} = require("../controllers/sendEmailController");
const axios = require("axios");

const adminGetQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find({})
      .populate("user", "-password")
      .populate("product", "-description")
      .sort({
        submittedAt: "asc",
      });

    let quotesWithEmptyStock = [];

    quotes.forEach((quote) => {
      if (quote.product) {
        quote.product.stock = quote.product.stock.filter((stock) => {
          const quoteCtlsku = quote.ctlsku?.split("-")[0];
          const stockCtlsku = stock.ctlsku?.split("-")[0];
          return quoteCtlsku && stockCtlsku && stockCtlsku === quoteCtlsku;
        });

        if (quote.product.stock.length === 0) {
          quotesWithEmptyStock.push({
            quoteId: quote._id,
            ctlsku: quote.ctlsku,
          });
        }
      }
    });

    if (quotesWithEmptyStock.length > 0) {
      console.log("Quotes with empty stock:", quotesWithEmptyStock);
    }
    res.send(quotes);
    // console.log(quotes);
  } catch (e) {
    next(e);
    console.log("Error while getting Quotes:", e);
  }
};

const userGetQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find({ user: ObjectId(req.user._id) })
      .populate("user")
      .populate("product", "-description")
      .sort({
        submittedAt: "asc",
      });
    quotes.forEach((quote) => {
      if (quote.product) {
        quote.product.stock = quote.product.stock.filter(
          (stock) => stock.ctlsku === quote.ctlsku
        );
      }
    });
    res.send(quotes);
    // console.log(quotes);
  } catch (e) {
    next(e);
    console.log("Error while get Quotes:", e);
  }
};

const getQuoteById = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate("user")
      .populate("product", "-description")
      .orFail();

    if (quote.product) {
      quote.product.stock = quote.product.stock.filter(
        (stock) => stock.ctlsku === quote.ctlsku
      );
    }
    // console.log(quote);
    res.json(quote);
  } catch (e) {
    console.error("Error while getting Quotes:", e);
    next(e);
  }
};

const adminGetQuoteById = async (req, res, next) => {
  try {
    // console.log("adminGetQuoteById");
    const quoteId = req.query.quoteId;
    // console.log(quoteId,);

    const quote = await Quote.findById(quoteId)
      .populate({
        path: "user",
        model: "User",
      })
      .populate({
        path: "product",
        model: "Product",
        select: "-description",
      })
      .orFail(new Error("Quote not found"));

    if (quote.product) {
      quote.product.stock = quote.product.stock.filter(
        (stock) => stock.ctlsku === quote.ctlsku
      );
    }

    res.send(quote);
    // console.log(quote);
  } catch (e) {
    console.error("Error while getting Quotes:", e);
    next(e);
  }
};

const adminDuplicateQuote = async (req, res, next) => {
  try {
    const quoteId = req.query.quoteId;
    const { number } = req.body;

    const originalQuote = await Quote.findById(quoteId);
    if (!originalQuote) {
      throw new Error("Original quote not found");
    }

    const nameMatch = originalQuote.name.match(/(.*?)(?: - (\d+))?$/);
    let baseName = nameMatch[1];
    let startNumber;

    if (nameMatch[2]) {
      startNumber = parseInt(nameMatch[2]) + 1;
    } else {
      originalQuote.name = `${baseName} - 1`;
      await originalQuote.save();
      startNumber = 2;
    }

    for (let i = 0; i < number; i++) {
      const newQuote = new Quote({
        ...originalQuote.toObject(),
        name: `${baseName} - ${startNumber + i}`,
        _id: undefined,
      });
      await newQuote.save();
    }

    res.status(200).json({ message: "Quotes duplicated successfully" });
  } catch (err) {
    next(err);
  }
};

const userCreateQuote = async (req, res, next) => {
  console.log("userCreateQuote");
  try {
    const {
      name,
      existingProduct,
      product,
      ctlsku,
      status,
      userDescription,
      quoteType,
      quantity,
    } = req.body;
    const userId = req.user._id;
    const userEmail = req.user.email;
    const userName = req.user.name + " " + req.user.lastName;

    console.log(req.body);

    if (product && !mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).send({ message: "Invalid product ID" });
    }

    const existingQuote = await Quote.findOne({ user: userId, ctlsku: ctlsku });

    // console.log(existingQuote);
    if (existingProduct && existingQuote) {
      if (existingQuote.accepted !== false) {
        return res.send({ message: "Product already in quotelist" });
      } else {
        await Quote.updateOne(
          { _id: existingQuote._id },
          {
            $unset: { accepted: 1 },
            $set: { submittedAt: new Date(), status: "Received" },
          }
        );
        return res.status(200).send({
          message: "Quote created",
          quoteId: existingQuote._id,
        });
      }
    }

    const quote = new Quote({
      name: name?.toUpperCase(),
      user: userId,
      existingProduct: existingProduct,
      ctlsku: ctlsku,
      status: status,
      product: mongoose.Types.ObjectId(product),
      userEmail: userEmail,
      userName: userName,
      userDescription: userDescription,
      quoteType: quoteType,
      quantity: quantity,
      submittedAt: new Date(),
    });

    await quote.save();
    console.log("quote created");
    res.status(201).json({
      message: "Quote created",
      quoteId: quote._id,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while creating the quote." });
  }
};

const adminCreateQuote = async (req, res, next) => {
  console.log("adminCreateQuote");
  try {
    const {
      userId,
      userEmail,
      userName,
      name,
      userDescription,
      quoteType,
      quantity,
    } = req.body;

    const quote = new Quote({
      name: name.toUpperCase(),
      user: mongoose.Types.ObjectId(userId),
      status: "Received",
      userEmail: userEmail,
      userName: userName,
      userDescription: userDescription,
      quoteType: quoteType,
      quantity: quantity,
      submittedAt: new Date(),
      existingProduct: false,
    });
    console.log(quote);
    await quote.save();
    res.status(201).json({
      message: "Quote created",
      quoteId: quote._id,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while creating the quote." });
  }
};

const updateRelatedQuotes = async (productId, expireDate) => {
  try {
    console.log(`Updating related quotes for product ${productId}`);
    const relatedQuotes = await Quote.find({
      product: productId,
      status: { $ne: "Completed" },
    });

    for (let relatedQuote of relatedQuotes) {
      try {
        relatedQuote.status = "Completed";
        relatedQuote.expireDate = expireDate;
        await relatedQuote.save();
      } catch (saveError) {
        console.error(
          `Error saving related quote ${relatedQuote._id}:`,
          saveError
        );
      }
    }
    console.log(`Processed related quotes for product ${productId}`);
  } catch (err) {
    console.error("Error while updating related quotes:", err);
  }
};


const sendNoticeToMobile = async (pushToken, messageTitle, messageBody) => {
  try {
    const response = await axios.post("https://exp.host/--/api/v2/push/send", {
      to: pushToken,
      sound: "default",
      title: messageTitle,
      body: messageBody,
      data: { withSome: "data" },
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "accept-encoding": "gzip, deflate",
      }
    });

    console.log("send noti", response.data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

const adminUpdateStatus = async (req, res, next) => {
  try {
    console.log("editQuoteTest");
    const quoteId = req.query.quoteId;
    const expireDate = req.body.expireDate;
    const adminMessage = req.body.adminMessage;

    console.log(quoteId, expireDate, adminMessage);
    let quote = await Quote.findById(quoteId).orFail().populate("user", "-password");

    if (!quote) {
      return res.status(404).send({ message: "Quote not found" });
    }

    if (quote.status === "Received") {
      quote.status = "Processing";
      await quote.save();
    } else if (quote.status === "Processing") {
      let product = await Product.findById(quote.product).orFail();

      if (!product?.expireDate && !expireDate) {
        return res.json({ message: "Product expire date is not exist!!!" });
      } else if (
        !expireDate &&
        new Date(
          product.expireDate.split(" ")[1].split("/").reverse().join("-")
        ) < new Date()
      ) {
        return res.json({ message: "Product expire date is in the past." });
      }

      if (!product?.expireDate && expireDate) {
        quote.expireDate = expireDate;
        quote.status = "Completed";
      } else {
        let [time, date] = product.expireDate.split(" ");
        let [day, month, year] = date.split("/");
        quote.expireDate = `${year}-${month}-${day - 1}`;
        quote.status = "Completed";
      }

      await quote.save();

      if (quote.status === "Completed") {
        await updateRelatedQuotes(quote.product, quote.expireDate);
        if (quote.user && quote.user.mobileNotificationToken) {
          const userPushToken = quote.user.mobileNotificationToken;
          const title = "Quote Completed";
          const body = `Your quote: ${product.name} has been completed.`;

          console.log("Sending notification to Mobile", userPushToken);
          sendNoticeToMobile(userPushToken, title, body)
            .then(() => console.log("Notification sent successfully"))
            .catch((err) => console.error("Failed to send notification", err));
        } else {
          console.log("User does not have a mobile notification token or user object is not available.");
        }
      }

      quoteCompletedNotice({
        userEmail: quote.userEmail,
        productName: product.name,
        quoteLink: "http://www.ctlaus.com",
        adminMessage: adminMessage,
      })
        .then(() => console.log("Notice sent successfully"))
        .catch((err) => console.error("Failed to send notice", err));
    } else {
      quote.status = status || quote.status;
      await quote.save();
    }

    res.json({ message: "Quote status updated", quote: quote });
  } catch (err) {
    next(err);
    console.log("Error while updating quote status:", err);
  }
};

const adminUpdateQuoteName = async (req, res, next) => {
  try {
    console.log("adminUpdateQuoteName");
    const quoteId = req.query.quoteId;
    const { quoteName } = req.body;

    let quote = await Quote.findById(quoteId).orFail();
    if (!quote) {
      return res.status(404).send({ message: "Quote not found" });
    }
    quote.name = quoteName;
    // console.log(quote);
    await quote.save();
    res.json({ message: "Quote name updated", quote: quote });
  } catch (err) {
    next(err);
    console.log("Error while updating quote name:", err);
  }
};


const adminUpdateNewQuote = async (req, res, next) => {
  try {
    console.log("adminUpdateNewQuote");
    const quoteId = req.query.quoteId;
    console.log(req.body);
    console.log(quoteId);

    let quote = await Quote.findById(quoteId).orFail().populate("user", "-password");

    const { status, ctlsku, expireDate, adminMessage } = req.body;

    let product = await Product.findOne({ "stock.ctlsku": ctlsku }).orFail();

    // console.log(product);

    if (!quote) {
      return res.status(404).send({ message: "Quote not found" });
    }

    quote.product = mongoose.Types.ObjectId(product._id) || quote.product;
    quote.status = status || quote.status;
    quote.ctlsku = ctlsku || quote.ctlsku;
    quote.expireDate = expireDate || quote.expireDate;
    // quote.accepted = null;

    await quote.save();


    if (quote.status === "Completed") {
      await updateRelatedQuotes(quote.product, quote.expireDate);

      if (quote.user && quote.user.mobileNotificationToken) {
        const userPushToken = quote.user.mobileNotificationToken;
        const title = "Quote Completed";
        const body = `Your quote: ${product.name} has been completed.`;

        console.log("Sending notification to Mobile", userPushToken);
        sendNoticeToMobile(userPushToken, title, body)
          .then(() => console.log("Notification sent successfully"))
          .catch((err) => console.error("Failed to send notification", err));
      } else {
        console.log("User does not have a mobile notification token or user object is not available.");
      }
    }


    quoteCompletedNotice({
      userEmail: quote.userEmail,
      productName: product.name,
      quoteLink: "http://www.ctlaus.com",
      adminMessage: adminMessage,
    })
      .then(() => console.log("Notice sent successfully"))
      .catch((err) => console.error("Failed to send notice", err));

    res.json({ message: "New Quote Updated", quote: quote });
  } catch (err) {
    next(err);
    console.log("Error while get Quotes:", err);
  }
};

const clientUploadImage = async (req, res, next) => {
  try {
    const update = await Quote.updateOne(
      { _id: req.query.quoteId },
      { $push: { clientImages: { path: req.body.url } } }
    );

    if (update.nModified === 0)
      throw new Error("Document not found or no changes made.");

    res.json({ message: "Quote updated successfully!" });
  } catch (err) {
    next(err);
  }
};

const userAcceptQuote = async (req, res, next) => {
  try {
    console.log("userAcceptQuote");
    const quoteId = req.query.quoteId;
    const { userAction } = req.body;

    // console.log(quoteId, userAction);
    let quote = await Quote.findById(quoteId).orFail();
    quote.accepted = userAction;
    await quote.save();

    if (quote.accepted === true) {
      res.json({ message: "Quote has been accepted" });
    } else {
      res.json({ message: "Quote has been declined" });
    }
  } catch (err) {
    next(err);
  }
};

const userReRequestQuote = async (req, res, next) => {
  try {
    console.log("userReRequestQuote");

    const quoteId = req.query.quoteId;
    console.log(quoteId);

    let quote = await Quote.findById(quoteId).orFail();
    console.log(quote);

    if (!quote) {
      return res.status(404).send({ message: "Quote not found" });
    }

    const updates = {
      $unset: {
        accepted: "",
        reason: "",
        requested: "",
        expireDate: "",
      },
      $set: {
        status: "Received",
        existingProduct: true,
        submittedAt: new Date(),
      },
    };

    await Quote.findByIdAndUpdate(quoteId, updates, { new: true });

    quote = await Quote.findById(quoteId);

    console.log(quote);
    res.json({ message: "Quote has been re-requested", quote: quote });
  } catch (err) {
    next(err);
  }
};

const updateQuoteSubmittedAt = async (req, res, next) => {
  try {
    console.log("updateQuoteSubmittedAt");
    const quotes = await Quote.find({});
    quotes.forEach(async (quote) => {
      if (quote.createdAt) {
        quote.submittedAt = quote.createdAt;
        await quote.save();
      } else {
        console.log("quote.createdAt is null");
      }
    });
    console.log("updateQuoteSubmittedAt done");
    res.json({ message: "updateQuoteSubmittedAt done" });
  } catch (err) {
    next(err);
  }
};

const userRequestQuotePdf = async (req, res, next) => {
  try {
    console.log("userRequestQuotePdf");
    const quoteIds = req.body.quoteIds;
    console.log(quoteIds);
    let quotes = await Quote.find({ _id: { $in: quoteIds } });

    quotes.forEach(async (quote) => {
      quote.requested = true;
      // await quote.save();
    });
    res.json({ message: "Quote has been requested" });
  } catch (err) {
    next(err);
  }
};

const deleteQuote = async (req, res, next) => {
  try {
    const { isAdmin, isSuperAdmin, isSales, email } = req.user;

    const quote = await Quote.findById(req.params.quoteId).orFail();

    if (isAdmin && !isSuperAdmin && !isSales) {
      const editHistoryEntry = {
        operator: email,
        editedAt: new Date(),
        function: "delete quote",
      };

      quote.editeHistroys.push(editHistoryEntry);
      await quote.save();

      return res
        .status(403)
        .json({ message: "You do not have permission to delete quotes." });
    }

    await quote.remove();
    res.send("uote deleted");
  } catch (err) {
    next(err);
  }
};

const downloadQuotePDF = async (req, res, next) => {
  try {
    const quoteIds = req.body.quoteIds;
    const quoteNumber = req.query.quoteNumber;
    const userEmail = req.body.userEmail;
    const base64Data = req.body.base64Data;

    await sendQuotePDF({
      quoteNumber: quoteNumber,
      base64data: base64Data,
      userEmail: userEmail,
    });

    console.log("quote pdf sent successfully");

    await Quote.updateMany(
      { _id: { $in: quoteIds } },
      { $set: { quoteNumber: quoteNumber } }
    );
    console.log("updateMany done");
    res.json({ message: "Quotes number have been updated!!!" });
  } catch (err) {
    console.error("Failed to send quote pdf or update quotes", err);
    res.status(500).json({ message: "Failed to process request" });
  }
};

module.exports = {
  adminGetQuotes,
  userGetQuotes,
  getQuoteById,
  userCreateQuote,
  adminUpdateStatus,
  adminUpdateNewQuote,
  adminUpdateQuoteName,
  clientUploadImage,
  adminGetQuoteById,
  userAcceptQuote,
  userReRequestQuote,
  updateQuoteSubmittedAt,
  userRequestQuotePdf,
  deleteQuote,
  adminDuplicateQuote,
  adminCreateQuote,
  downloadQuotePDF,
};
