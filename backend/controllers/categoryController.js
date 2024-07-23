const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");

const cron = require("node-cron");
const moment = require("moment-timezone");


const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: "asc" }).orFail();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getT1Categories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: "asc" }).orFail();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

/* const categoriesForProductList = async (req, res, next) => {
  try {
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replace(/,/g, "/");
      var regEx = null;
      var subCategoryName = req.query.subCategoryName;
      var childCategoryName = req.query.childCategoryName;
      var fourCategoryName = req.query.fourCategoryName;
      if (fourCategoryName) {
        regEx = new RegExp(
          "^" +
          a +
          "/" +
          subCategoryName +
          "/" +
          childCategoryName +
          "/" +
          fourCategoryName
        );
      } else if (childCategoryName) {
        regEx = new RegExp(
          "^" + a + "/" + subCategoryName + "/" + childCategoryName
        );
      } else if (subCategoryName) {
        regEx = new RegExp("^" + a + "/" + subCategoryName);
      } else {
        regEx = new RegExp("^" + a);
      }
      console.log("xxx:", regEx);
      categoryQueryCondition = { name: regEx };
    }
    let categories = await Category.find(categoryQueryCondition)
    res.json(categories);
  } catch (error) {
    next(error);
  }
}; */

const categoriesForProductList = async (req, res, next) => {
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

    const categories = await Category.find(categoryQueryCondition);
    res.json(categories);
  } catch (error) {
    next(error);
  }
};



const newCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    if (!category) {
      res.status(400).send("Category input is required");
    }
    const categoryExists = await Category.findOne({ name: category });
    if (categoryExists) {
      res.status(400).send("Category already exists");
    } else {
      const categoryCreated = await Category.create({
        name: category,
      });
      res.status(201).send({ categoryCreated: categoryCreated });
    }
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    if (req.params.category !== "Choose category") {
      const categoryExists = await Category.findOne({
        name: decodeURIComponent(req.params.category),
      }).orFail();
      await categoryExists.remove();
      res.json({ categoryDeleted: true });
    }
  } catch (err) {
    next(err);
  }
};

const saveAttr = async (req, res, next) => {
  const { key, val, categoryChoosen } = req.body;
  if (!key || !val || !categoryChoosen) {
    return res.status(400).send("All inputs are required");
  }
  try {
    const category = categoryChoosen.split("/")[0];
    const categoryExists = await Category.findOne({ name: category }).orFail();
    if (categoryExists.attrs.length > 0) {
      var keyDoesNotExistsInDatabase = true;
      categoryExists.attrs.map((item, idx) => {
        if (item.key === key) {
          keyDoesNotExistsInDatabase = false;
          var copyAttributeValues = [...categoryExists.attrs[idx].value];
          copyAttributeValues.push(val);
          var newAttributeValues = [...new Set(copyAttributeValues)]; // Set ensures unique values
          categoryExists.attrs[idx].value = newAttributeValues;
        }
      });
      if (keyDoesNotExistsInDatabase) {
        categoryExists.attrs.push({ key: key, value: [val] });
      }
    } else {
      categoryExists.attrs.push({ key: key, value: [val] });
    }
    await categoryExists.save();
    let cat = await Category.find({}).sort({ name: "asc" });
    return res.status(201).json({ categoriesUpdated: cat });
  } catch (err) {
    next(err);
  }
};

/* const updateCategoryDisplay = async (req, res, next) => {
  console.log("update category started!!!");
  try {
    const categories = await Category.find({});
    let noProductCount = 0;
    let categoriesWithoutProducts = [];

    for (let category of categories) {
      console.log("category", category.name);
      const productExists = await Product.exists({ category: category.name });

      if (!productExists) {
        noProductCount++; 
        console.log("No product in", category.name);
        categoriesWithoutProducts.push(category.name);
        // category.display = false; 
      } else {
        // category.display = true; 
      }

      // await category.save();
    }

    console.log("Total categories without products:", noProductCount);

    res.status(200).json({ 
      message: "Categories updated successfully!",
      totalCategoriesWithoutProducts: noProductCount,
      categories: categoriesWithoutProducts
    });
  } catch (error) {
    console.log("Error while updating category display!!!");
    next(error);
  }
}; */

// check skip parent category
/* const updateCategoryDisplay = async (req, res, next) => {
  console.log("update category started!!!");
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    let noProductCount = 0;
    let categoriesWithoutProducts = [];

    for (let category of categories) {
      console.log("category", category.name);
      const isParentCategory = await Category.exists({ name: new RegExp("^" + category.name + "/") });

      if (isParentCategory) {
        continue; 
      }

      const productExists = await Product.exists({ category: category.name });

      if (!productExists) {
        noProductCount++; 
        console.log("No product in", category.name);
        categoriesWithoutProducts.push(category.name); 
        // category.display = false; 
      } else {
        // category.display = true; 
      }

      // await category.save();
    }

    console.log("Total leaf categories without products:", noProductCount);

    res.status(200).json({ 
      message: "Categories updated successfully!",
      totalCategoriesWithoutProducts: noProductCount,
      categories: categoriesWithoutProducts
    });
  } catch (error) {
    console.log("Error while updating category display!!!");
    next(error);
  }
}; */


const updateCategoryDisplay = async (req, res, next) => {
  console.log("update category started!!!");
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    let noProductCount = 0;
    let categoriesWithoutProducts = [];

    for (let category of categories) {

      // Checking existence of a product directly in the current category
      const productExistsInCategory = await Product.exists({ category: category.name });

      if (productExistsInCategory) {
        category.display = true;
        await category.save();
        continue;
      }

      // Checking existence of a product in any subcategories or deeper levels of the current category
      const productExistsInSubcategories = await Product.exists({ category: new RegExp("^" + category.name + "/") });

      if (productExistsInSubcategories) {
        category.display = true;
      } else {
        noProductCount++;
        console.log("No product in", category.name);
        categoriesWithoutProducts.push(category.name);
        category.display = false;
      }

      await category.save();
    }

    console.log("Total categories without products:", noProductCount);

    res.status(200).json({
      message: "Categories updated successfully!",
      totalCategoriesWithoutProducts: noProductCount,
      categories: categoriesWithoutProducts
    });
  } catch (error) {
    console.log("Error while updating category display!!!");
    next(error);
  }
};

// For 1pm Perth time (5am UTC)
cron.schedule("0 5 * * *", updateCategoryDisplay, {
  scheduled: true,
  timezone: "UTC",
});

// For 5:40pm Perth time (9:40am UTC)
cron.schedule("40 9 * * *", updateCategoryDisplay, {
  scheduled: true,
  timezone: "UTC",
});


module.exports = {
  getCategories,
  getT1Categories,
  newCategory,
  deleteCategory,
  saveAttr,
  categoriesForProductList,
  updateCategoryDisplay,
};
