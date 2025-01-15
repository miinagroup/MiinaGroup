const Product = require("../models/ProductModel");
const ObjectId = require("mongodb").ObjectId;
// const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const pdfValidate = require("../utils/pdfValidate");
const cron = require("node-cron");
const moment = require("moment-timezone");
const _ = require('lodash');
const recordsPerPage = 100

const excludedSuppliers = ["CAPRARI", "CABLE SUPPLY", "CABLE DISTRIBUTION SERVICES", "ELECTRA CABLES", "POWER SAFE", "SCINTEX"];
const appToken = "9Ark2TryUeCOQObeKkxnVoB4IwPznpoE"
const storeCode = "EMBLETON"
const apiKey = "6d234218-9973-4e57-9b29-d93d1c98e436"

const getCombinations = (array, length) => {
  let result = [];
  const f = (active, rest, length) => {
    if (!active.length && !rest.length) return;
    if (active.length === length) {
      result.push(active);
    } else {
      if (rest.length) {
        f(active.concat(rest[0]), rest.slice(1), length);
        f(active, rest.slice(1), length);
      }
    }
  };
  f([], array, length);
  return result;
};

const getProductsVisitor = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replace(/,/g, "/");
      var regEx = null;
      var subCategoryName = req.query.subCategoryName;
      var childCategoryName = req.query.childCategoryName;
      var fourCategoryName = req.query.fourCategoryName;
      var fiveCategoryName = req.query.fiveCategoryName;
      var sixCategoryName = req.query.sixCategoryName;
      var sevenCategoryName = req.query.sevenCategoryName;

      if (sevenCategoryName) {
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
          "/" +
          sixCategoryName +
          "/" +
          sevenCategoryName +
          "(?:/|$)"
        );
      } else if (sixCategoryName) {
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
          "/" +
          sixCategoryName +
          "(?:/|$)"
        );
      } else if (fiveCategoryName) {
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
          "(?:/|$)"
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
          "(?:/|$)"
        );
      } else if (childCategoryName) {
        regEx = new RegExp(
          "^" + a + "/" + subCategoryName + "/" + childCategoryName + "(?:/|$)"
        );
      } else if (subCategoryName) {
        regEx = new RegExp("^" + a + "/" + subCategoryName + "(?:/|$)");
      } else {
        regEx = new RegExp("^" + a);
      }
      categoryQueryCondition = { category: regEx };
    }
    const pageNum = Number(req.query.pageNum) || 1;
    let sort = {};
    const sortOption = req.params.sortOrder || "";
    if (sortOption) {
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    if (queryCondition) {
      query = {
        $and: [
          categoryQueryCondition,
          { supplier: { $nin: excludedSuppliers } }
        ],
      };
    }

    let totalProducts = await Product.countDocuments(query);
    let products = await Product.find(query)
      .skip(recordsPerPage * (pageNum - 1))
      .limit(recordsPerPage);

    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });

  } catch (error) {
    next(error);
  }
}

const getProducts = async (req, res, next) => {
  try {
    const userSiteSku = req.user.siteSku;

    let query = {};
    let queryCondition = false;
    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }

    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replace(/,/g, "/");
      var regEx = null;
      var subCategoryName = req.query.subCategoryName;
      var childCategoryName = req.query.childCategoryName;
      var fourCategoryName = req.query.fourCategoryName;
      var fiveCategoryName = req.query.fiveCategoryName;
      var sixCategoryName = req.query.sixCategoryName;
      var sevenCategoryName = req.query.sevenCategoryName;

      if (sevenCategoryName) {
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
          "/" +
          sixCategoryName +
          "/" +
          sevenCategoryName +
          "(?:/|$)"
        );
      } else if (sixCategoryName) {
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
          "/" +
          sixCategoryName +
          "(?:/|$)"
        );
      } else if (fiveCategoryName) {
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
          "(?:/|$)"
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
          "(?:/|$)"
        );
      } else if (childCategoryName) {
        regEx = new RegExp(
          "^" + a + "/" + subCategoryName + "/" + childCategoryName + "(?:/|$)"
        );
      } else if (subCategoryName) {
        regEx = new RegExp("^" + a + "/" + subCategoryName + "(?:/|$)");
      } else {
        regEx = new RegExp("^" + a);
      }
      categoryQueryCondition = { category: regEx };
    }

    let brandQueryCondition = {};
    const brandName = req.params.brandName || "";
    console.log(brandName);
    if (brandName) {
      queryCondition = true;
      let a = brandName.replace(/,/g, "-");
      var regEx = new RegExp(a, "i");
      brandQueryCondition = { supplier: regEx };
    }

    let attrsQueryCondition = [];
    if (req.query.attrs) {
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-");
          let values = [...a];
          values.shift();
          let a1 = {
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);
          return acc;
        } else return acc;
      }, []);
      queryCondition = true;
    }

    const pageNum = Number(req.query.pageNum) || 1;
    let sort = {};
    const sortOption = req.params.sortOrder || "";
    if (sortOption) {
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    /* ******* search function ******* */

    // 第九版 searchQuery
    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondition = {};
    let select = {};

    const performSearch = async (query) => {
      const searchWords = query.searchQuery.split(" ");
      let results = new Map();

      let queriesToSearch = [];
      if (searchWords.length === 2 || searchWords.length === 3) {
        const permutations = generatePermutations(searchWords);
        queriesToSearch = permutations.map((perm) => `"${perm.join(" ")}"`);
      } else {
        queriesToSearch = [`"${query.searchQuery}"`];
      }

      // console.log("Queries to search:", queriesToSearch);

      for (const queryText of queriesToSearch) {
        // console.log("Performing text search for:", queryText);
        // ! 下面这个原来是 performTextSearch 可以改回来

        let queryResults;

        queryResults = await performRegexSearch(queryText);

        if (!Array.isArray(queryResults)) {
          console.error("Expected an array of results, got:", queryResults);
          continue;
        }

        queryResults.forEach((result) => {
          results.set(result._id.toString(), result);
        });
      }

      const resultsIds = Array.from(results.values()).map(
        (result) => result._id
      );
      return { _id: { $in: resultsIds } };
      // return Array.from(results.values());
    };

    const performTextSearch = async (searchQuery) => {
      // console.log("Text search for:", searchQuery);
      const searchCondition = {
        $text: {
          $search: searchQuery,
          $caseSensitive: false,
          $diacriticSensitive: false,
        },
      };
      // console.log("Query filter:", searchQueryCondition);
      const results = await Product.find(searchCondition);
      // console.log("Results:", results.length);
      return results;
    };

    const performRegexSearch = async (searchQuery) => {
      console.log("Performing regex search for:", searchQuery);
      const regexPattern = new RegExp(searchQuery.replace(/["']/g, ""), "i");

      if ((req.user.email.includes("ctlservices.com.au")) || (req.user.email.includes("ctlaus.com"))) {
        searchCondition = {
          $or: [
            { name: regexPattern },
            // { description: regexPattern },
            { supplier: regexPattern },
            // { "stock.slrsku": regexPattern },
            { "stock.ctlsku": regexPattern },
            { "stock.suppliersku": regexPattern }
          ],
        };
      } else {
        searchCondition = {
          $or: [
            { name: regexPattern },
            // { description: regexPattern },
            { supplier: regexPattern },
            // { "stock.slrsku": regexPattern },
            { "stock.ctlsku": regexPattern },
            { "stock.suppliersku": regexPattern },
            { [`stock.${userSiteSku}`]: regexPattern },
          ],
        };
      }




      // console.log("Debug Search Condition:", searchCondition);

      const results = await Product.find(searchCondition);
      console.log("Results:", results.length);
      return results;
    };

    const generatePermutations = (array) => {
      if (array.length === 2) {
        return [array, [array[1], array[0]]];
      } else if (array.length === 3) {
        return [
          array,
          [array[0], array[2], array[1]],
          [array[1], array[0], array[2]],
          [array[1], array[2], array[0]],
          [array[2], array[0], array[1]],
          [array[2], array[1], array[0]],
        ];
      } else {
        return [array];
      }
    };

    const performIndividualSearches = async (searchWords, productIds) => {
      console.log("Performing individual searches for:", searchWords);
      const searchConditions = searchWords.map((word) => ({
        name: {
          $regex: word,
          $options: "i",
        },
      }));

      const query =
        productIds.length > 0
          ? { _id: { $in: productIds }, $or: searchConditions }
          : { $or: searchConditions };

      const products = await Product.find(query);
      return products;
    };

    if (searchQuery) {
      queryCondition = true;
      const searchWords = searchQuery.split(" ");

      if (searchWords.length > 1) {
        const results = await performSearch({ searchQuery, productIds: [] });
        if (results && results.length > 0) {
          searchQueryCondition = { _id: { $in: results.map((p) => p._id) } };
        } else {
          let categoryMatchedProducts = [];
          const filteredSearchWords = searchWords.filter(
            (word) => word.length > 1
          );

          for (const word of filteredSearchWords) {
            const regex = new RegExp(`${word}`, "i");
            const categoryMatch = await Product.find({
              category: {
                $regex: regex,
              },
            });
            categoryMatchedProducts =
              categoryMatchedProducts.concat(categoryMatch);
          }

          const productIds = categoryMatchedProducts.map((p) => p._id);

          if (categoryMatchedProducts.length > 0) {
            searchQueryCondition = await performSearch({
              searchQuery,
              productIds,
            });

            if (searchQueryCondition === null) {
              const products = await performIndividualSearches(
                filteredSearchWords,
                productIds
              );
              searchQueryCondition = {
                _id: { $in: products.map((p) => p._id) },
              };
            } else {
              searchQueryCondition = {
                _id: { $in: productIds },
                ...searchQueryCondition,
              };
            }
          } else {
            searchQueryCondition = await performSearch({
              searchQuery,
              productIds: [],
            });

            if (searchQueryCondition === null) {
              const products = await performIndividualSearches(
                filteredSearchWords,
                []
              );
              searchQueryCondition = {
                _id: { $in: products.map((p) => p._id) },
              };
            }
          }
        }
      } else {
        if (searchWords.length === 1 && searchWords[0].startsWith("CTL")) {
          searchQueryCondition = {
            "stock.ctlsku": {
              $regex: new RegExp(`${searchWords[0]}`, "i"),
            },
          };
        } else {
          searchQueryCondition = await performSearch({
            searchQuery,
            productIds: [],
          });
        }
      }
    }

    let suppliersCondition = {};

    if (req.user.email.endsWith("@slrltd.com") ||
      req.user.email.endsWith("@silverlakeresources.com.au") ||
      req.user.email.endsWith("@red5limited.com.au") ||
      req.user.email.endsWith("@ctlservices.com.au") ||
      req.user.email.endsWith("@ctlaus.com") ||
      req.user.email.endsWith("@focusminerals.com.au") ||
      req.user.email.endsWith("@evolutionmining.com")) {
      queryCondition = true;
      suppliersCondition = {};
    } else {
      queryCondition = true;
      suppliersCondition = { supplier: { $nin: excludedSuppliers } };
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          brandQueryCondition,
          searchQueryCondition,
          suppliersCondition,
          ...attrsQueryCondition,
        ],
      };
    }

    const sortCriteria = [
      ["sortOrder", 1],
      ["category", 1],
      ["supplier", 1],
      ["name", 1],
      ["material", 1],
      ["width", 1],
      ["length", 1],
      ["thickness", 1],
    ];

    const isAdmin = req.user.isAdmin;
    let totalProducts = await Product.countDocuments(query);
    let products = await Product.find(query)
      .select(select)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sortCriteria)
      .limit(recordsPerPage);

    if (!isAdmin) {
      products = products.filter((product) => product.category !== "QUOTE");

    }

    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      // .sort({ ctlsku: 1 })
      .select(
        "name category displayPrice supplier stock.price stock.purchaseprice stock.ctlsku stock.count stock.suppliersku stock.attrs stock.uom stock.barcode images pdfs"
      );
    return res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminFindDuplicateCTLSKU = async (req, res, next) => {
  try {
    const duplicates = await Product.aggregate([
      {
        $group: {
          _id: "$stock.ctlsku", // Group by the field to check
          count: { $sum: 1 }, // Count occurrences
        },
      },
      {
        $match: {
          count: { $gt: 1 }, // Filter only duplicates
        },
      },
    ]);

    res.json(duplicates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const adminGetCTLSKU = async (req, res, next) => {
  try {
    const products = await Product.find({})
      // .sort({ ctlsku: 1 })
      .select("stock.ctlsku");
    return res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminGetSupplierSku = async (req, res, next) => {
  try {
    console.log("CHECK");
    const products = await Product.find({ supplier: req.params.supplier })
      // .sort({ suppliersku: 1 })
      .select("stock.suppliersku");
    return res.json(products);
  } catch (err) {
    next(err);
  }
};


const adminDeleteProduct = async (req, res, next) => {
  try {
    const { isSuperAdmin, email } = req.user;
    const product = await Product.findById(req.params.id).orFail();

    if (!isSuperAdmin) {
      const editHistoryEntry = {
        operator: email,
        editedAt: new Date(),
        function: 'delete product'
      };

      product.editeHistroys.push(editHistoryEntry);
      await product.save();

      return res.status(403).json({ message: "You do not have permission to delete products." });
    }
    await product.remove();
    res.json({ message: "Product removed" });
  } catch (err) {
    next(err);
  }
};

const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const {
      name,
      description,
      saleunit,
      max,
      displayPrice,
      supplier,
      category,
      attributesTable,
      stock,
      sortOrder,
      standards,
      createdBy,
      editedBy,
      tags
    } = req.body;

    // console.log(req.body);
    product.name = name.toUpperCase();
    product.description = description;
    product.saleunit = saleunit;
    product.max = max;
    product.sortOrder = sortOrder;
    product.displayPrice = displayPrice;
    product.supplier = supplier;
    product.category = category;
    product.createdBy = createdBy;
    product.editedBy = editedBy;
    product.standards = standards || "";
    product.tags = tags;
    if (stock.length > 0) {
      product.stock = [];
      stock.map((item) => {
        const {
          attrs,
          uom,
          count,
          price,
          purchaseprice,
          barcode,
          ctlsku,
          suppliersku,
        } = item;
        product.stock.push({
          attrs: attrs || "",
          uom: uom.toUpperCase() || "",
          count: count || 0,
          price: price || 0,
          purchaseprice: purchaseprice || 0,
          barcode: barcode || "",
          ctlsku: ctlsku || "",
          suppliersku: suppliersku || ""
        });
      });
    } else {
      product.stock = [];
    }

    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();

    res.json({
      message: "product created",
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};


const schedulePriceReset = async (productId, expireDate) => {
  const [time, date] = expireDate.split(" ");
  const [hour, minute, second] = time.split(":");
  const [day, month, year] = date.split("/");

  const expireDateTimePerth = moment.tz(
    `${year}-${month}-${day} ${hour}:${minute}:${second}`,
    "Australia/Perth"
  );

  const expireDateTimeUTC = expireDateTimePerth.clone().tz("UTC");
  const cronExpression = `${expireDateTimeUTC.seconds()} ${expireDateTimeUTC.minutes()} ${expireDateTimeUTC.hours()} ${expireDateTimeUTC.date()} ${expireDateTimeUTC.month() + 1
    } *`;

  cron.schedule(cronExpression, async () => {
    const product = await Product.findById(productId);
    product.displayPrice = 0;
    await product.save();
  });
};

const dailyPriceResetCheck = async () => {
  console.log("Daily Price Reset Check");

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  const options = {
    timeZone: "Australia/Perth",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-AU", options);
  const [day, month, year] = formatter.format(now).split("/");
  const formattedDate = new Date(`${month}/${day}/${year}`);

  const products = await Product.find();

  for (const product of products) {
    if (!product.expireDate || product.expireDate === "00:00:00 00/00/00")
      continue;

    const [time, date] = product.expireDate.split(" ");
    const [expDay, expMonth, expYear] = date.split("/");
    const expireDate = new Date(`${expMonth}/${expDay}/${expYear}`);

    if (expireDate.setHours(0, 0, 0, 0) <= formattedDate.setHours(0, 0, 0, 0)) {
      if (product.displayPrice !== 0) {
        product.displayPrice = 0;
        await product.save();
      }
    }
  }
};

cron.schedule("0 10 16 * * *", dailyPriceResetCheck, {
  scheduled: true,
  timezone: "UTC",
});

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const {
      name,
      description,
      supplier,
      RRP,
      category,
      tags,
      images,
      pdfs,
      sortOrder,
      displayPrice,
      saleunit,
      max,
      stock,
      standards,
      expireDate,
      editedBy,
    } = req.body;
    product.name = name.toUpperCase() || product.name;
    product.description = description || product.description;
    product.supplier = supplier || product.supplier;
    product.RRP = RRP || product.RRP;
    product.category = category || product.category;
    product.tags = tags || product.tags;
    product.images = images || product.images;
    product.pdfs = pdfs || product.pdfs;
    product.sortOrder = sortOrder || product.sortOrder;
    product.displayPrice = displayPrice || product.displayPrice;
    product.saleunit = saleunit || product.saleunit;
    product.max = max || product.max;
    product.standards = standards || product.standards;
    product.editedBy = editedBy || product.editedBy;
    product.expireDate =
      expireDate === "remove" ? undefined : expireDate || product.expireDate;
    if (stock.length > 0) {
      product.stock = [];
      stock.map((item) => {
        const {
          _id,
          attrs,
          uom,
          count,
          price,
          purchaseprice,
          barcode,
          ctlsku,
          suppliersku,
        } = item;
        product.stock.push({
          _id: _id,
          attrs: attrs || "",
          uom: uom.toUpperCase() || "",
          count: count || 0,
          price: price || 0,
          purchaseprice: purchaseprice || 0,
          barcode: barcode || "",
          ctlsku: ctlsku || "",
          suppliersku: suppliersku || ""
        });
      });
    } else {
      product.stock = [];
    }
    await product.save();

    res.json({
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
};

const getProductByCTLSKU = async (req, res, next) => {
  try {
    const cltsku = req.query.ctlsku;
    const product = await Product.findOne({ "stock.ctlsku": cltsku });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const stockItem = product.stock.find((item) => item.ctlsku === cltsku);
    if (!stockItem) {
      return res.status(404).json({ error: "Stock item not found" });
    }
    res.json({ stockItem });
  } catch (err) {
    next(err);
  }
};

const userUpdateSKU = async (req, res, next) => {
  try {
    const ctlsku = req.params.ctlsku;
    let product = await Product.findOne({ "stock.ctlsku": ctlsku });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const adminUpdateSKU = async (req, res, next) => {
  try {
    const ctlsku = req.params.ctlsku;

    let product = await Product.findOne({
      "stock.ctlsku": ctlsku,
    });

    const stockItem = product.stock.find(item => item.ctlsku === ctlsku);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};


const adminUpdateImages = async (req, res, next) => {
  try {
    const id = req.params.id;
    const images = req.body.images;
    console.log(id, images);
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $set: { images: images } }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const adminUpdateTags = async (req, res, next) => {
  try {
    // const id = req.params.id;
    // const tags = req.body.tags;
    // console.log(id, tags);
    var bulk = Product.collection.initializeUnorderedBulkOp();
    const tagsArray = req.body.completeArray
    tagsArray?.forEach((tag) => {
      bulk.find({
        _id: ObjectId(tag.id),
        //tags: { $exists: false } // Check if `tags` field is not present 
      }).updateOne(
        {
          $set: { tags: tag.tags }  // Add the `tags` field
        },
        { upsert: true } // Insert document if not found
      );
    })

    // Execute bulk operation only if there are pending operations
    if (bulk.length > 0) {
      bulk.execute((err, result) => {
        if (err) {
          console.error("Bulk operation error:", err);
          return res.status(500).json({ message: "Bulk operation failed.", error: err });
        } else {
          console.log("Bulk operation success:", result);
          return res.status(200).json({ message: "Bulk operation succeeded.", result: result });
        }
      });
    } else {
      console.log("No operations to execute in bulk.");
      return res.status(400).json({ message: "No bulk operations to execute." });
    }

    //return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const adminUpdateCategory = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { category: req.body.selectedCategory } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const adminUpload = async (req, res, next) => {
  if (req.query.bunny === "true") {
    try {
      let product = await Product.findById(req.query.productId).orFail();
      product.images.push({ path: req.body.url });
      await product.save();
    } catch (err) {
      next(err);
    }
    return;
  }
  try {
    if (!req.files || !!req.files.images === false) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResultImage = imageValidate(req.files.images);
    if (validateResultImage.error) {
      return res.status(400).send(validateResultImage.error);
    }

    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectoryImage = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "products"
    );

    let product = await Product.findById(req.query.productId).orFail();

    // iamge
    let imagesTable = [];
    if (Array.isArray(req.files.images)) {
      imagesTable = req.files.images;
    } else {
      imagesTable.push(req.files.images);
    }

    for (let image of imagesTable) {
      var fileName = uuidv4() + path.extname(image.name);
      var uploadPath = uploadDirectoryImage + "/" + fileName;
      product.images.push({ path: "/images/products/" + fileName });
      image.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await product.save();
    return res.send("Files uploaded!");
  } catch (err) {
    next(err);
  }
};

// PDFs
const adminUploadPdf = async (req, res, next) => {
  if (req.query.bunny === "true") {
    try {
      let product = await Product.findById(req.query.productId).orFail();
      product.pdfs.push({ path: req.body.url });
      await product.save();
    } catch (err) {
      next(err);
    }
    return;
  }
  try {
    if (!req.files || !!req.files.pdfs === false) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResultPdf = pdfValidate(req.files.pdfs);
    if (validateResultPdf.error) {
      return res.status(400).send(validateResultPdf.error);
    }

    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectoryPdf = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "documents"
    );

    let product = await Product.findById(req.query.productId).orFail();
    let pdfsTable = [];
    if (Array.isArray(req.files.pdfs)) {
      pdfsTable = req.files.pdfs;
    } else {
      pdfsTable.push(req.files.pdfs);
    }

    for (let pdf of pdfsTable) {
      var uploadPath = uploadDirectoryPdf + "/" + pdf.name;
      product.pdfs.push({ path: "/images/documents/" + pdf.name });
      pdf.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await product.save();
    return res.send("Files uploaded!");
  } catch (err) {
    next(err);
  }
};

const adminDeleteProductImage = async (req, res, next) => {
  const imagePath = decodeURIComponent(req.params.imagePath);
  if (req.query.cloudinary === "true") {
    try {
      await Product.findOneAndUpdate(
        { _id: req.params.productId },
        { $pull: { images: { path: imagePath } } }
      ).orFail();
      return res.end();
    } catch (er) {
      next(er);
    }
    return;
  }
  try {
    const path = require("path");
    const finalPath = path.resolve("../frontend/public") + imagePath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imagePath } } }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};

const adminDeleteProductPdf = async (req, res, next) => {
  const pdfPath = decodeURIComponent(req.params.pdfPath);
  if (req.query.cloudinary === "true") {
    try {
      await Product.findOneAndUpdate(
        { _id: req.params.productId },
        { $pull: { pdfs: { path: pdfPath } } }
      ).orFail();
      return res.end();
    } catch (er) {
      next(er);
    }
    return;
  }
  try {
    const path = require("path");
    const finalPath = path.resolve("../frontend/public") + pdfPath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { pdfs: { path: pdfPath } } }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};

const checkStockCount = async (req, res) => {
  try {
    console.log("Checking stock count...");
    const productsWithStock = await Product.aggregate([
      { $unwind: "$stock" },
      {
        $match: {
          $or: [
            {
              "stock.ctlsku": { $exists: true },
              "stock.count": { $exists: false },
            },
            { "stock.ctlsku": { $exists: true }, "stock.count": null },
            { "stock.ctlsku": { $exists: false } },
            { "stock.ctlsku": null },
            { "stock.ctlsku": "" },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          ctlsku: "$stock.ctlsku",
          count: "$stock.count",
          productName: "$name",
        },
      },
    ]);

    const bulkOps = [];
    const productsToUpdate = [];
    const productsToDelete = [];
    const productsNoCTLSKU = [];

    productsWithStock.forEach((p) => {
      if (p.ctlsku && (p.count === null || p.count === undefined)) {
        productsToUpdate.push(p);
        bulkOps.push({
          updateOne: {
            filter: { _id: p._id, "stock.ctlsku": p.ctlsku },
            update: { $set: { "stock.$.count": 0 } },
          },
        });
      } else if (!p.ctlsku || p.ctlsku === "" || p.ctlsku === null) {
        productsNoCTLSKU.push(p);
      }
    });

    const productsWithoutStock = await Product.find({
      "stock.0": { $exists: false },
    });
    productsWithoutStock.forEach((p) => {
      productsToDelete.push(p);
      bulkOps.push({
        deleteOne: {
          filter: { _id: p._id },
        },
      });
    });

    if (bulkOps.length > 0) {
      // await Product.bulkWrite(bulkOps);
    }

    console.log("productsToUpdate", productsToUpdate.length);
    console.log("productsToDelete", productsToDelete.length);
    console.log("productStockItemsToDelete", productsNoCTLSKU.length);

    res.status(200).json({
      message: "Stock update and deletion completed",
      updatedProducts: productsToUpdate,
      deletedProducts: productsToDelete,
      productsNoCTLSKU: productsNoCTLSKU,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while checking stock count." });
  }
};

const productsCheck = async (req, res) => {
  try {
    const products = await Product.find({});
    let missingMainFields = [];
    let missingStockFields = [];
    let updatedDisplayPrice = [];

    for (let product of products) {
      let missingMain = false;
      let missingStock = false;

      if (
        product.displayPrice === undefined ||
        product.displayPrice === null ||
        product.displayPrice === "" ||
        product.displayPrice < 0
      ) {
        product.displayPrice = 0;
        await product.save();
        updatedDisplayPrice.push(product);
      }
      let displayPriceChanged = false
      let stockPriceChanged = false
      product.stock.forEach((stockItem) => {
        if (stockItem.price > 0) {
          if (product.displayPrice > stockItem.price) {
            product.displayPrice = stockItem.price
            displayPriceChanged = true
          }
        } else if (stockItem.price === 0 && product.displayPrice !== 0) {
          stockItem.price = product.displayPrice
          stockPriceChanged = true
        }
      })
      if (displayPriceChanged === true) {
        await product.save();
      }
      if (stockPriceChanged === true) {
        await product.save();
      }

      if (
        !product.name ||
        !product.description ||
        !product.category ||
        !product.saleunit
      ) {
        missingMainFields.push(product);
        missingMain = true;
      }

      product.stock.forEach((stockItem) => {
        if (
          stockItem.attrs === undefined ||
          stockItem.price === undefined ||
          (product.displayPrice !== 0 && stockItem.price <= 0) ||
          stockItem.ctlsku === undefined
        ) {
          if (!missingStock) {
            missingStockFields.push(product);
            missingStock = true;
          }
        }
      });
    }

    const duplicateCtlSku = await Product.aggregate([
      { $unwind: "$stock" },
      {
        $group: {
          _id: "$stock.ctlsku",
          count: { $sum: 1 },
          products: { $addToSet: { id: "$_id", name: "$name" } },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ]);

    if (duplicateCtlSku.length === 0) {
      console.log("No duplicates found");
    } else {
      duplicateCtlSku.forEach((dup) => {
        console.log(
          `Duplicate ctlsku found: ${dup._id}, in products: ${dup.products.join(
            ", "
          )}`
        );
      });
    }

    res.status(200).send({
      missingMainFields,
      missingStockFields,
      updatedDisplayPrice,
      duplicateCtlSku,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while checking products data." });
  }
};

async function findProductsWithDuplicateCtlSku() {
  try {
    const duplicates = await Product.aggregate([
      // Unwind to deconstruct the stock array
      { $unwind: "$stock" },
      // Group by ctlsku and collect the product IDs
      {
        $group: {
          _id: "$stock.ctlsku",
          count: { $sum: 1 },
          products: { $addToSet: "$_id" },
        },
      },
      // Filter for ctlsku values that appear in more than one product
      { $match: { count: { $gt: 1 } } },
    ]);

    if (duplicates.length === 0) {
      console.log("No duplicates found");
    } else {
      duplicates.forEach((dup) => {
        console.log(
          `Duplicate ctlsku found: ${dup._id}, in products: ${dup.products.join(
            ", "
          )}`
        );
      });
    }
  } catch (error) {
    console.error("Error finding duplicates:", error);
  }
}

const adminReplenishment = async (req, res, next) => {
  try {
    console.log("adminReplenishment");
    const { barcode, suppliersku, replenishment } = req.body;

    let product = null;
    let stockItem = null;

    if (barcode) {
      console.log("barcode");
      product = await Product.findOne({ "stock.barcode": barcode });
      if (product) {
        stockItem = product.stock.find((item) => item.barcode === barcode);
      } else {
        return res.json({ message: "Product not found with given barcode" });
      }
    } else if (suppliersku) {
      console.log("suppliersku");
      const regex = new RegExp("^" + suppliersku.trim() + "\\s*$", "i");

      product = await Product.findOne({
        "stock.suppliersku": { $regex: regex },
      });
      if (product) {
        stockItem = product.stock.find((item) => regex.test(item.suppliersku));
      } else {
        return res.json({
          message: "Product not found with given supplier SKU",
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Barcode or Supplier SKU is required" });
    }

    if (
      stockItem &&
      (!replenishment || replenishment === undefined || replenishment === null)
    ) {
      return res.status(200).json({
        product: {
          ...product.toObject(),
          stock: [stockItem],
        },
        message: "Please provide replenishment number",
      });
    }

    if (!stockItem) {
      return res.status(404).json({ error: "Stock item not found" });
    }

    if (replenishment && replenishment <= 0) {
      return res
        .status(400)
        .json({ error: "Replenishment must be a positive number" });
    }

    const replenishmentNumber = Number(replenishment);

    if (isNaN(replenishmentNumber)) {
      return res.status(400).json({ error: "Invalid replenishment number" });
    }

    stockItem.count += replenishmentNumber;

    await product.save();

    return res.status(200).json({
      product: {
        ...product.toObject(),
        stock: [stockItem],
      },
      message: "Product replenishment successful",
    });
  } catch (error) {
    next(error);
  }
};

const adminStockTake = async (req, res, next) => {
  try {
    console.log("adminStockTake");
    const { barcode, count } = req.body;

    let product = null;
    let stockItem = null;

    if (barcode) {
      product = await Product.findOne({ "stock.barcode": barcode });
      if (product) {
        stockItem = product.stock.find((item) => item.barcode === barcode);
      } else {
        return res.json({ message: "Product not found with given barcode" });
      }
    } else {
      return res.status(400).json({ message: "Barcode is required" });
    }

    if (stockItem && (!count || count === undefined || count === null)) {
      return res.status(200).json({
        product: {
          ...product.toObject(),
          stock: [stockItem],
        },
        message: "Please provide count number",
      });
    }

    if (!stockItem) {
      return res.status(404).json({ error: "Stock item not found" });
    }

    if (count && count <= 0) {
      return res.status(400).json({ error: "count must be a positive number" });
    }

    const countNumber = Number(count);

    if (isNaN(countNumber)) {
      return res.status(400).json({ error: "Invalid count number" });
    }

    stockItem.count = countNumber;

    await product.save();

    return res.status(200).json({
      product: {
        ...product.toObject(),
        stock: [stockItem],
      },
      message: "Product stock take successful",
    });
  } catch (error) {
    next(error);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    let skuSearch = true;
    const { searchQuery } = req.query;
    const limit = parseInt(req.query.limit) || 24;
    const offset = parseInt(req.query.offset) || 0;
    let query = searchQuery.split(/[\s-]+/);
    const pageNum = Number(req.query.pageNum) || 1;
    const skip = (pageNum - 1) * recordsPerPage;
    let totalProducts = 0;
    let products = [];
    let productFound = []

    const combineNumberWithNext = (keywords) => {
      const combinedKeywords = [];
      for (let i = 0; i < keywords.length; i++) {
        if (/^\d+$/.test(keywords[i]) && i + 1 < keywords.length) {
          // Combine the number-containing keyword with the next one
          combinedKeywords.push(`${keywords[i]} ${keywords[i + 1]}`);
          i++; // Skip the next keyword since it's already combined
        } else {
          combinedKeywords.push(keywords[i]);
        }
      }

      return combinedKeywords;
    };
    let modifiedKeywords = []
    if (query.length > 1) {
      modifiedKeywords = combineNumberWithNext(query)
    }

    console.log(modifiedKeywords);
    if (modifiedKeywords.length > 0) {
      query = modifiedKeywords
    }


    function sortByName(array) {
      let withQueryWordsInName = [];
      let withoutQueryWordsInName = [];

      query.map(word => {
        array.map(product => {
          let nameWords = product.name.toLowerCase().split(/\s+/);
          if (nameWords.includes(word.toLowerCase())) {
            if (!withQueryWordsInName.some(item => item.name === product.name)) {
              return withQueryWordsInName.push(product);
            }
          } else {
            return withoutQueryWordsInName.push(product);
          }
        });
      });

      const sortedWithQueryWordsInName = sortByNameArray(withQueryWordsInName);

      return [...new Set([...sortedWithQueryWordsInName, ...withoutQueryWordsInName])]
    }

    function sortByNameArray(array) {
      let lowerCaseQuery = query.map(word => word.toLowerCase());
      let productsWithCounts = array.map(product => {
        let nameWords = product.name.toLowerCase().split(/\s+/);
        let count = lowerCaseQuery.reduce((acc, word) => {
          if (nameWords.includes(word)) {
            acc++;
          }
          return acc;
        }, 0);
        return { product: product, count: count };
      });

      productsWithCounts.sort((a, b) => b.count - a.count);
      let sortedProducts = productsWithCounts.map(obj => obj.product);

      return sortedProducts;
    }

    function getProductsbyPage(pageNumber, array) {
      const startIndex = (pageNumber - 1) * recordsPerPage;
      return array.slice(startIndex, startIndex + recordsPerPage);
    }

    if (searchQuery !== "" || searchQuery !== null || searchQuery !== undefined) {
      console.log("Test");

      const spaceReplaced = searchQuery.replace(/ /g, '-')
      const escapeRegex = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
      };
      const escapedSearchQuery = escapeRegex(searchQuery);
      const regex = new RegExp(`${escapedSearchQuery}s?`, "i");
      const regExact = new RegExp(`\\b${escapedSearchQuery.replace(/\s/g, '\\s*')}s?\\b`, "i");
      const regexSpace = new RegExp(`(^|[\\/\\s])${searchQuery}s?([\\/\\s]|$)`, "i");

      const categoryMatches = await Product.find({ "category": regexSpace }).limit(250);
      productFound = productFound.concat(categoryMatches);
      productFound = _.uniqBy(productFound, 'id');

      if (productFound.length < 250) {
        const supplierMatches = await Product.find({ "supplier": regExact }).limit(250 - productFound.length);
        productFound = productFound.concat(supplierMatches);
      }
      productFound = _.uniqBy(productFound, 'id');
      if (productFound.length < 250) {
        const nameMatches = await Product.find({ "name": regExact }).limit(250 - productFound.length);
        productFound = productFound.concat(nameMatches);
      }
      productFound = _.uniqBy(productFound, 'id');
      if (productFound.length < 250) {
        const ctlskuMatches = await Product.find({ "stock.ctlsku": regex }).limit(250 - productFound.length);
        productFound = productFound.concat(ctlskuMatches);
      }
      productFound = _.uniqBy(productFound, 'id');
      if (productFound.length < 250) {
        const supplierskuMatches = await Product.find({ "stock.suppliersku": regex }).limit(250 - productFound.length);
        productFound = productFound.concat(supplierskuMatches);
      }
      productFound = _.uniqBy(productFound, 'id');
      if (productFound.length < 250) {
        const tagsMatches = await Product.find({ "tags": regex }).limit(250 - productFound.length);
        productFound = productFound.concat(tagsMatches);
      }
      productFound = _.uniqBy(productFound, 'id');
      console.log(productFound.length);

      if (productFound.length === 250) {
        const filetredProducts = _.uniqBy(productFound, 'id');
        const productMatch = filetredProducts.filter((product) => (product.category !== "QUOTE") && (product.category !== "CLIENTQUOTE"));
        const productsNew = productMatch;
        const totalProductsMatch = productFound.length

        if (productsNew.length === 0) {
          skuSearch = false
        } else {
          products = products.concat(productsNew);
          totalProducts = totalProducts += totalProductsMatch
        }
      }
    }

    // General search by supplier, name, description depending on how many words in search.
    // Now search by tags doesn't work as field tag is not completed for a Product. It is for future. 
    if (productFound.length < 250 && query.length === 1) {
      console.log("Test1");

      const regNormal = new RegExp(`${searchQuery.replace(/\s/g, '\\s*')}s?`, "i");
      const regExact = new RegExp(`\\b${searchQuery.replace(/\s/g, '\\s*')}s?\\b`, "i");
      const supplierFilter = new RegExp(`^${searchQuery}$`, 'i')

      let searchCondition = {}

      if (req.user?.email.endsWith("@slrltd.com") ||
        req.user?.email.endsWith("@silverlakeresources.com.au") ||
        req.user?.email.endsWith("@red5limited.com.au") ||
        req.user?.email.endsWith("@ctlservices.com.au") ||
        req.user?.email.endsWith("@ctlaus.com") ||
        req.user?.email.endsWith("@focusminerals.com.au") ||
        req.user?.email.endsWith("@evolutionmining.com")) {

        const supplierMatches = await Product.find({ "supplier": regNormal }).limit(250);
        productFound = productFound.concat(supplierMatches);
        productFound = _.uniqBy(productFound, 'id');

        if (productFound.length < 250) {
          const nameMatches = await Product.find({ "name": regExact }).limit(250 - productFound.length);
          productFound = productFound.concat(nameMatches);
        }
        productFound = _.uniqBy(productFound, 'id');
      } else {
        const supplierMatches = await Product.find({ "supplier": regNormal }).limit(250);
        productFound = productFound.concat(supplierMatches);
        productFound = _.uniqBy(productFound, 'id');

        if (productFound.length < 250) {
          const nameMatches = await Product.find({ "name": regExact }).limit(250 - productFound.length);
          productFound = productFound.concat(nameMatches);
        }
        productFound = _.uniqBy(productFound, 'id');
      }

      const filetredProducts = _.uniqBy(productFound, 'id');
      const productsPerPage = getProductsbyPage(pageNum, filetredProducts);
      const totalProductsMatch = productFound.length
      products = filetredProducts;
      totalProducts = totalProducts += totalProductsMatch
      console.log(totalProducts);

    } else if (productFound.length < 250 && query.length >= 2) {
      console.log("Test2");
      const regNormal = query.map(term => new RegExp(`${term.replace(/\s/g, '\\s*').replace(/s$/, '')}s?`, "i"));
      const regExact = query.map(term => new RegExp(`(^|[^a-zA-Z0-9])${term.replace(/\s/g, '\\s*')}([^a-zA-Z0-9]|$)s?`, "i"));
      const regExactQueries = query.map(term => new RegExp(`\\b${term.replace(/\s/g, '\\s*')}s?\\b`, "i"));
      const supplierFilters = query.map(term => (new RegExp(`^${term.replace(/\s/g, '\\s*')}$`, 'i')));

      if (req.user?.email.endsWith("@slrltd.com") ||
        req.user?.email.endsWith("@silverlakeresources.com.au") ||
        req.user?.email.endsWith("@red5limited.com.au") ||
        req.user?.email.endsWith("@ctlservices.com.au") ||
        req.user?.email.endsWith("@ctlaus.com") ||
        req.user?.email.endsWith("@focusminerals.com.au") ||
        req.user?.email.endsWith("@evolutionmining.com")) {

        const tagsMatches = await Product.find({ $and: regNormal.map(regex => ({ tags: regex })) }).limit(250);
        productFound = productFound.concat(tagsMatches);
        productFound = _.uniqBy(productFound, 'id');

      } else {
        const tagsMatches = await Product.find({ $and: regNormal.map(regex => ({ tags: regex })) }).limit(250);
        productFound = productFound.concat(tagsMatches);
        productFound = _.uniqBy(productFound, 'id');

      }

      const keywords = regNormal.map(regex => regex.source); // Get the raw keyword from the regex

      const sortedProducts = productFound.sort((a, b) => {
        // Check how many keywords occur in `category`, `name`, or `description` for each product
        const aCount = keywords.filter(keyword =>
          new RegExp(keyword, 'i').test(a.tags) ||
          new RegExp(keyword, 'i').test(a.name) ||
          new RegExp(keyword, 'i').test(a.category)
        ).length;

        const bCount = keywords.filter(keyword =>
          new RegExp(keyword, 'i').test(b.tags) ||
          new RegExp(keyword, 'i').test(a.name) ||
          new RegExp(keyword, 'i').test(a.category)
        ).length;

        // Sort by how many keywords are found (products with more matches come first)
        return bCount - aCount;
      });

      const filetredProducts = _.uniqBy(sortedProducts, 'id');
      const productsPerPage = getProductsbyPage(pageNum, sortedProducts);
      const totalProductsMatch = productFound.length
      products = filetredProducts;
      totalProducts = totalProducts += totalProductsMatch

    } else {
      console.log("query", query)
    }


    // const productsNew = products.filter((product) => (product.category !== "QUOTE") && (product.category !== "CLIENTQUOTE"));
    const productsNew = _.uniqBy(products, 'id')
      .filter((product) => product.category !== "QUOTE" && product.category !== "CLIENTQUOTE")
      .slice(offset, offset + limit);
    const hasMore = (parseInt(offset) + limit) < products.length;

    return res.json(
      {
        products: productsNew,
        hasMore: hasMore,
      }
    );

  } catch (error) {
    console.log(error);
    next(error);
  }
}

const searchProductsForVisitor = async (req, res, next) => {
  try {
    let skuSearch = true;
    const { searchQuery } = req.query;
    const limit = parseInt(req.query.limit) || 24;
    const offset = parseInt(req.query.offset) || 0;
    let query = searchQuery.split(/[\s-]+/);
    const pageNum = Number(req.query.pageNum) || 1;
    const skip = (pageNum - 1) * recordsPerPage;
    let totalProducts = 0;
    let products = [];
    let productFound = []

    const combineNumberWithNext = (keywords) => {
      const combinedKeywords = [];
      for (let i = 0; i < keywords.length; i++) {
        if (/^\d+$/.test(keywords[i]) && i + 1 < keywords.length) {
          // Combine the number-containing keyword with the next one
          combinedKeywords.push(`${keywords[i]} ${keywords[i + 1]}`);
          i++; // Skip the next keyword since it's already combined
        } else {
          combinedKeywords.push(keywords[i]);
        }
      }

      return combinedKeywords;
    };
    let modifiedKeywords = []
    if (query.length > 1) {
      modifiedKeywords = combineNumberWithNext(query)
    }

    console.log(modifiedKeywords);
    if (modifiedKeywords.length > 0) {
      query = modifiedKeywords
    }


    function sortByName(array) {
      let withQueryWordsInName = [];
      let withoutQueryWordsInName = [];

      query.map(word => {
        array.map(product => {
          let nameWords = product.name.toLowerCase().split(/\s+/);
          if (nameWords.includes(word.toLowerCase())) {
            if (!withQueryWordsInName.some(item => item.name === product.name)) {
              return withQueryWordsInName.push(product);
            }
          } else {
            return withoutQueryWordsInName.push(product);
          }
        });
      });

      const sortedWithQueryWordsInName = sortByNameArray(withQueryWordsInName);

      return [...new Set([...sortedWithQueryWordsInName, ...withoutQueryWordsInName])]
    }

    function sortByNameArray(array) {
      let lowerCaseQuery = query.map(word => word.toLowerCase());
      let productsWithCounts = array.map(product => {
        let nameWords = product.name.toLowerCase().split(/\s+/);
        let count = lowerCaseQuery.reduce((acc, word) => {
          if (nameWords.includes(word)) {
            acc++;
          }
          return acc;
        }, 0);
        return { product: product, count: count };
      });

      productsWithCounts.sort((a, b) => b.count - a.count);
      let sortedProducts = productsWithCounts.map(obj => obj.product);

      return sortedProducts;
    }

    function getProductsbyPage(pageNumber, array) {
      const startIndex = (pageNumber - 1) * recordsPerPage;
      return array.slice(startIndex, startIndex + recordsPerPage);
    }

    if (searchQuery !== "" || searchQuery !== null || searchQuery !== undefined) {
      console.log("Test");

      const spaceReplaced = searchQuery.replace(/ /g, '-')
      const escapeRegex = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
      };
      const escapedSearchQuery = escapeRegex(searchQuery);
      const regex = new RegExp(`${escapedSearchQuery}s?`, "i");
      const regExact = new RegExp(`\\b${escapedSearchQuery.replace(/\s/g, '\\s*')}s?\\b`, "i");
      const regexSpace = new RegExp(`(^|[\\/\\s])${searchQuery}s?([\\/\\s]|$)`, "i");

      const categoryMatches = await Product.find({ "category": regexSpace }).limit(250);
      productFound = productFound.concat(categoryMatches);
      productFound = _.uniqBy(productFound, 'id');

      if (productFound.length < 250) {
        const supplierMatches = await Product.find({ "supplier": regExact }).limit(250 - productFound.length);
        productFound = productFound.concat(supplierMatches);
      }
      productFound = _.uniqBy(productFound, 'id');
      if (productFound.length < 250) {
        const nameMatches = await Product.find({ "name": regExact }).limit(250 - productFound.length);
        productFound = productFound.concat(nameMatches);
      }
      productFound = _.uniqBy(productFound, 'id');
      if (productFound.length < 250) {
        const ctlskuMatches = await Product.find({ "stock.ctlsku": regex }).limit(250 - productFound.length);
        productFound = productFound.concat(ctlskuMatches);
      }
      productFound = _.uniqBy(productFound, 'id');
      if (productFound.length < 250) {
        const supplierskuMatches = await Product.find({ "stock.suppliersku": regex }).limit(250 - productFound.length);
        productFound = productFound.concat(supplierskuMatches);
      }
      productFound = _.uniqBy(productFound, 'id');
      if (productFound.length < 250) {
        const tagsMatches = await Product.find({ "tags": regex }).limit(250 - productFound.length);
        productFound = productFound.concat(tagsMatches);
      }
      productFound = _.uniqBy(productFound, 'id');

      if (productFound.length === 250) {

        const filetredProducts = _.uniqBy(productFound, 'id');
        const productMatch = filetredProducts.filter((product) => product.category !== "QUOTE" && product.category !== "CLIENTQUOTE" && !excludedSuppliers.includes(product.supplier))
        const productsNew = productMatch;
        const totalProductsMatch = productFound.length

        if (productsNew.length === 0) {
          skuSearch = false
        } else {
          products = products.concat(productsNew);
          totalProducts = totalProducts += totalProductsMatch
        }
      }
    }

    // General search by supplier, name, description depending on how many words in search.
    // Now search by tags doesn't work as field tag is not completed for a Product. It is for future. 
    if (productFound.length < 250 && query.length === 1) {
      console.log("Test1");

      const regNormal = new RegExp(`${searchQuery.replace(/\s/g, '\\s*')}s?`, "i");
      const regExact = new RegExp(`\\b${searchQuery.replace(/\s/g, '\\s*')}s?\\b`, "i");
      const supplierFilter = new RegExp(`^${searchQuery}$`, 'i')

      let searchCondition = {}

      if (req.user?.email.endsWith("@slrltd.com") ||
        req.user?.email.endsWith("@silverlakeresources.com.au") ||
        req.user?.email.endsWith("@red5limited.com.au") ||
        req.user?.email.endsWith("@ctlservices.com.au") ||
        req.user?.email.endsWith("@ctlaus.com") ||
        req.user?.email.endsWith("@focusminerals.com.au") ||
        req.user?.email.endsWith("@evolutionmining.com")) {

        const supplierMatches = await Product.find({ "supplier": regNormal }).limit(250);
        productFound = productFound.concat(supplierMatches);
        productFound = _.uniqBy(productFound, 'id');

        if (productFound.length < 250) {
          const nameMatches = await Product.find({ "name": regExact }).limit(250 - productFound.length);
          productFound = productFound.concat(nameMatches);
        }
        productFound = _.uniqBy(productFound, 'id');
      } else {
        const supplierMatches = await Product.find({ "supplier": regNormal }).limit(250);
        productFound = productFound.concat(supplierMatches);
        productFound = _.uniqBy(productFound, 'id');

        if (productFound.length < 250) {
          const nameMatches = await Product.find({ "name": regExact }).limit(250 - productFound.length);
          productFound = productFound.concat(nameMatches);
        }
        productFound = _.uniqBy(productFound, 'id');
      }

      const filetredProducts = _.uniqBy(productFound, 'id').filter((product) => !excludedSuppliers.includes(product.supplier));;
      const productsPerPage = getProductsbyPage(pageNum, filetredProducts);
      const totalProductsMatch = productFound.length
      products = filetredProducts;
      totalProducts = totalProducts += totalProductsMatch
      console.log(totalProducts);

    } else if (productFound.length < 250 && query.length >= 2) {
      console.log("Test2");
      const regNormal = query.map(term => new RegExp(`${term.replace(/\s/g, '\\s*').replace(/s$/, '')}s?`, "i"));
      //const regNormal = query.map(term => new RegExp(`${term}s?`, "i"));
      //const regNormal = query.map(term => new RegExp(`\\b${term.replace(/\s/g, '\\s*')}s?\\b`, "i"));
      const regExact = query.map(term => new RegExp(`(^|[^a-zA-Z0-9])${term.replace(/\s/g, '\\s*')}([^a-zA-Z0-9]|$)s?`, "i"));
      const regExactQueries = query.map(term => new RegExp(`\\b${term.replace(/\s/g, '\\s*')}s?\\b`, "i"));
      const supplierFilters = query.map(term => (new RegExp(`^${term.replace(/\s/g, '\\s*')}$`, 'i')));

      if (req.user?.email.endsWith("@slrltd.com") ||
        req.user?.email.endsWith("@silverlakeresources.com.au") ||
        req.user?.email.endsWith("@red5limited.com.au") ||
        req.user?.email.endsWith("@ctlservices.com.au") ||
        req.user?.email.endsWith("@ctlaus.com") ||
        req.user?.email.endsWith("@focusminerals.com.au") ||
        req.user?.email.endsWith("@evolutionmining.com")) {

        const tagsMatches = await Product.find({ $and: regNormal.map(regex => ({ tags: regex })) }).limit(250);
        productFound = productFound.concat(tagsMatches);
        productFound = _.uniqBy(productFound, 'id');

      } else {
        const tagsMatches = await Product.find({ $and: regNormal.map(regex => ({ tags: regex })) }).limit(250);
        productFound = productFound.concat(tagsMatches);
        productFound = _.uniqBy(productFound, 'id');

      }

      const keywords = regNormal.map(regex => regex.source); // Get the raw keyword from the regex

      const sortedProducts = productFound.sort((a, b) => {
        // Check how many keywords occur in `category`, `name`, or `description` for each product
        const aCount = keywords.filter(keyword =>
          new RegExp(keyword, 'i').test(a.tags) ||
          new RegExp(keyword, 'i').test(a.name) ||
          new RegExp(keyword, 'i').test(a.category)
        ).length;

        const bCount = keywords.filter(keyword =>
          new RegExp(keyword, 'i').test(b.tags) ||
          new RegExp(keyword, 'i').test(a.name) ||
          new RegExp(keyword, 'i').test(a.category)
        ).length;

        // Sort by how many keywords are found (products with more matches come first)
        return bCount - aCount;
      });

      const filetredProducts = _.uniqBy(sortedProducts, 'id').filter((product) => !excludedSuppliers.includes(product.supplier));
      const productsPerPage = getProductsbyPage(pageNum, sortedProducts);
      const totalProductsMatch = productFound.length
      products = filetredProducts;
      totalProducts = totalProducts += totalProductsMatch

    } else {
      console.log("query", query)
    }


    // const productsNew = products.filter((product) => (product.category !== "QUOTE") && (product.category !== "CLIENTQUOTE"));
    const productsNew = _.uniqBy(products, 'id')
      .filter((product) => product.category !== "QUOTE" && product.category !== "CLIENTQUOTE")
      .slice(offset, offset + limit);
    const hasMore = (parseInt(offset) + limit) < products.length;

    return res.json(
      {
        products: productsNew,
        hasMore: hasMore,
      }
    );

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  getProductByCTLSKU,
  adminGetProducts,
  adminGetCTLSKU,
  adminGetSupplierSku,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpdateSKU,
  adminUpdateImages,
  userUpdateSKU,
  adminUpdateCategory,
  adminUpload,
  adminUploadPdf,
  adminDeleteProductImage,
  adminDeleteProductPdf,
  checkStockCount,
  productsCheck,
  adminReplenishment,
  adminStockTake,
  searchProducts,
  getProductsVisitor,
  searchProductsForVisitor,
  adminUpdateTags,
  adminFindDuplicateCTLSKU
};

