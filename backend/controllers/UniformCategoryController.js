const UniformCategory = require("../models/UniformCategoryModel");

const cron = require("node-cron");
const moment = require("moment-timezone");

const getCategories = async (req, res, next) => {
    try {
        const categories = await UniformCategory.find({}).sort({ name: "desc" }).orFail();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

const categoriesForUniformList = async (req, res, next) => {
    try {
        let categoryQueryCondition = {};
        const categoryName = req.params.categoryName || "";

        if (categoryName) {
            const a = categoryName.replace(/,/g, "/");
            let regEx = null;
            const subCategoryName = req.query.subCategoryName;
            const childCategoryName = req.query.childCategoryName;
            const fourCategoryName = req.query.fourCategoryName;
            var fiveCategoryName = req.query.fiveCategoryName;


            if (fiveCategoryName) {
                regEx = new RegExp(
                    "^" +
                    a +
                    "/" +
                    subCategoryName +
                    "/" +
                    childCategoryName +
                    "/" +
                    fourCategoryName +
                    "/" +
                    fiveCategoryName +
                    "(?![\\w-])"
                );
            } else if (fourCategoryName) {
                regEx = new RegExp(
                    "^" +
                    a +
                    "/" +
                    subCategoryName +
                    "/" +
                    childCategoryName +
                    "/" +
                    fourCategoryName +
                    "(?![\\w-])"
                );
            } else if (childCategoryName) {
                regEx = new RegExp(
                    "^" +
                    a +
                    "/" +
                    subCategoryName +
                    "/" +
                    childCategoryName +
                    "(?![\\w-])"
                );
            } else if (subCategoryName) {
                regEx = new RegExp("^" + a + "/" + subCategoryName + "(?![\\w-])");
            } else {
                regEx = new RegExp("^" + a + "(?![\\w-])");
            }

            // console.log("xxx:", regEx);
            categoryQueryCondition = { name: regEx, display: true };
        }

        const categories = await UniformCategory.find(categoryQueryCondition);
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    categoriesForUniformList, getCategories,
};