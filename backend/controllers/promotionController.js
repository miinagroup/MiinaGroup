const Promotion = require("../models/PromotionModel");
const cron = require("node-cron");
const moment = require("moment-timezone");
const imageValidate = require("../utils/imageValidate");

const adminGetPromotions = async (req, res, next) => {
  try {
    const promotions = await Promotion.find({}).sort({
      category: 1,
      endDate: 1,
    });
    res.json(promotions);
  } catch (error) {
    console.log("Failed To get ALL Promotions");
    next(error);
  }
};

const getPromotions = async (req, res, next) => {
  try {
    const date = new Date(req.params.date);
    if (!isNaN(date)) {
      const promotions = await Promotion.find({
        startDate: { $lte: date },
        endDate: { $gte: date },
      }).orFail();
      res.json(promotions);
    } else {
      const now = new Date();
      const promotions = await Promotion.find({
        startDate: { $lte: now },
        endDate: { $gte: now },
      }).orFail();
      res.json(promotions);
    }
  } catch (error) {
    console.log("something wrong in getPromotions!!!");
    next(error);
  }
};

const createPromotions = async (req, res, next) => {
  try {
    const promotion = new Promotion();
    const { category, detail, startDate, endDate } = req.body;

    promotion.category = category;
    promotion.startDate = startDate;
    promotion.endDate = endDate;
    if (detail.length > 0) {
      promotion.detail = [];
      detail.map((item) => {
        const { image, redirectURL, description } = item;
        promotion.detail.push({
          image: image || "",
          redirectURL: redirectURL || "",
          description: description || "",
        });
      });
    } else {
      promotion.detal = [];
    }
    await promotion.save();
    res.json({
      message: "Promotion Created",
    });
  } catch (error) {
    console.log("Failed to create new promotions!!!");
    next(error);
  }
};

const updateExpiredPromotion = async () => {
  try {
    const now = moment().tz("Australia/Perth");
    // const now = new Date();
    console.log("====================================");
    console.log(now);
    console.log("====================================");

    const expiredPromotions = await Promotion.find({
      endDate: { $lt: now },
    });
    console.log("expiredPromotions", expiredPromotions);
    for (let promotion of expiredPromotions) {
      promotion.startDate = moment(promotion.startDate)
        .add(promotion.rotateDays, "days")
        .toDate();
      promotion.endDate = moment(promotion.endDate)
        .add(promotion.rotateDays, "days")
        .toDate();
      await promotion.save();
    }

    console.log(`${expiredPromotions.length} promotions extended!`);
  } catch (error) {
    console.error("Error updating promotion dates:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/* cron.schedule("0 0 12 * * *", updateExpiredPromotion, {
  scheduled: true,
  timezone: "Australia/Perth",
}); */
cron.schedule("10 17 * * *", updateExpiredPromotion, {
  scheduled: true,
  timezone: "Australia/Perth",
});

const getPromotionById = async (req, res, next) => {
  try {
    const promotion = await Promotion.findById(req.params.id).orFail();
    res.json(promotion);
  } catch (err) {
    next(err);
  }
};

const adminUploadPromotionImage = async (req, res, next) => {
  if (req.query.cloudinary === "true") {
    try {
      let promotion = await Promotion.findById(req.query.promotionID).orFail();
      promotion.detail.push({ path: req.body.url });
      await promotion.save();
    } catch (err) {
      next(err);
    }
    return;
  }
};

const adminUpdatePromotion = async (req, res, next) => {
  try {
    // const promotion = await Promotion.findById(req.params.id).orFail();
    const promotion = await Promotion.findById(req.params.id).orFail(
      new Error("Promotion not found")
    );

    const { startDate, endDate, rotateDays, detail } = req.body;
    promotion.startDate = startDate || promotion.startDate;
    promotion.endDate = endDate || promotion.endDate;
    promotion.rotateDays = rotateDays || promotion.rotateDays;
    promotion.category = promotion.category;
    if (detail.length > 0) {
      promotion.detail = [];
      detail.map((item) => {
        const { image, redirectURL, description } = item;
        promotion.detail.push({
          image: image || "",
          redirectURL: redirectURL || "",
          description: description || "",
        });
      });
    } else {
      promotion.detal = [];
    }
    await promotion.save();
    res.json({
      message: "Promotion Updated",
    });
  } catch (err) {
    console.log("Failed to update promotion!!!");
    next(err);
  }
};

module.exports = {
  adminGetPromotions,
  getPromotions,
  createPromotions,
  getPromotionById,
  adminUpdatePromotion,
  updateExpiredPromotion
};
