const Uniform = require("../models/UniformModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const pdfValidate = require("../utils/pdfValidate");
const cron = require("node-cron");
const moment = require("moment-timezone");

const adminCreateUniform = async (req, res, next) => {
    try {
        const uniform = new Uniform();
        const { name, description, stock, brand, category, supplierCode, saleUnit } = req.body;
        uniform.name = name;
        uniform.description = description;
        uniform.brand = brand;
        uniform.category = category;
        uniform.saleUnit = saleUnit;
        if (stock.length > 0) {
            uniform.stock = [];
            stock.map((item) => {
                const { color, size, price, purchasePrice } = item;
                uniform.stock.push({
                    color: color || "",
                    size: size || "",
                    price: price || 0,
                    purchasePrice: purchasePrice || 0,
                });
            });
        } else {
            uniform.stock = [];
        }

        await uniform.save();
        res.json({
            message: "uniform created",
            uniformId: uniform._id,
        })

    } catch (err) {
        next(err);
    }
};

// const getUniforms = async (req, res, next) => {
//     try {
//         const uniforms = await Uniform.find({}).sort({ name: "asc" }).orFail();
//         res.json(uniforms);
//     } catch (err) {
//         next(err)
//     }
// };

const getUniforms = async (req, res, next) => {
    try {
        // console.log(req.user.siteSku);
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
            const results = await Uniform.find(searchCondition);
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
                        { "stock.attr": regexPattern },
                        { "stock.size": regexPattern },
                        { "stock.color": regexPattern },
                    ],
                };
            } else {
                searchCondition = {
                    $or: [
                        { name: regexPattern },
                        // { description: regexPattern },
                        { supplier: regexPattern },
                        { "stock.attr": regexPattern },
                        { "stock.size": regexPattern },
                        { "stock.color": regexPattern },
                    ],
                };
            }
            //console.log("Debug Search Condition:", searchCondition);

            const results = await Uniform.find(searchCondition);
            //console.log("Results:", results.length);
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
            //console.log("Performing individual searches for:", searchWords);
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

            const uniforms = await Uniform.find(query);
            return uniforms;
        };

        if (searchQuery) {
            queryCondition = true;
            const searchWords = searchQuery.split(" ");

            if (searchWords.length > 1) {
                const results = await performSearch({ searchQuery, uniformIds: [] });
                if (results && results.length > 0) {
                    searchQueryCondition = { _id: { $in: results.map((p) => p._id) } };
                } else {
                    let categoryMatchedUniforms = [];
                    const filteredSearchWords = searchWords.filter(
                        (word) => word.length > 1
                    );

                    for (const word of filteredSearchWords) {
                        const regex = new RegExp(`${word}`, "i");
                        const categoryMatch = await Uniform.find({
                            category: {
                                $regex: regex,
                            },
                        });
                        categoryMatchedUniforms =
                            categoryMatchedUniforms.concat(categoryMatch);
                    }

                    const uniformIds = categoryMatchedUniforms.map((p) => p._id);

                    if (categoryMatchedUniforms.length > 0) {
                        searchQueryCondition = await performSearch({
                            searchQuery,
                            uniformIds,
                        });

                        if (searchQueryCondition === null) {
                            const uniforms = await performIndividualSearches(
                                filteredSearchWords,
                                uniformIds
                            );
                            searchQueryCondition = {
                                _id: { $in: uniforms.map((p) => p._id) },
                            };
                        } else {
                            searchQueryCondition = {
                                _id: { $in: uniformIds },
                                ...searchQueryCondition,
                            };
                        }
                    } else {
                        searchQueryCondition = await performSearch({
                            searchQuery,
                            uniformIds: [],
                        });

                        if (searchQueryCondition === null) {
                            const uniforms = await performIndividualSearches(
                                filteredSearchWords,
                                []
                            );
                            searchQueryCondition = {
                                _id: { $in: uniforms.map((p) => p._id) },
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
                        uniformIds: [],
                    });
                }
            }
        }

        if (queryCondition) {
            query = {
                $and: [
                    priceQueryCondition,
                    ratingQueryCondition,
                    categoryQueryCondition,
                    brandQueryCondition,
                    searchQueryCondition,
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

        // console.log(isAdmin);

        let totaluniforms = await Uniform.countDocuments(query);

        // console.log("uniforms 1", totaluniforms.length);

        let uniforms = await Uniform.find(query)
            .select(select)
            .skip(recordsPerPage * (pageNum - 1))
            .sort(sortCriteria)
            .limit(recordsPerPage);

        // console.log("uniforms 2", uniforms.length);

        if (!isAdmin) {
            uniforms = uniforms.filter((uniform) => Uniform.category !== "QUOTE");
            // console.log("uniforms 3", uniforms.length);
            // totaluniforms = uniforms.length;
        }

        /*     console.log("totaluniforms", totaluniforms);
            console.log("recordsPerPage", recordsPerPage);
            console.log(Math.ceil(totaluniforms / recordsPerPage)); */

        res.json({
            uniforms,
            pageNum,
            paginationLinksNumber: Math.ceil(totaluniforms / recordsPerPage),
        });
    } catch (error) {
        next(error);
    }
};

const getAllUniforms = async (req, res, next) => {
    try {
        let uniforms = await Uniform.find({})
        res.json({
            uniforms
        });
    } catch (error) {
        next(error);
    }
};

const getUniformsByCategory = async (req, res, next) => {
    const categoryName = "UNIFORM/" + req.params.categoryName
    try {
        let uniforms = await Uniform.find({ category: categoryName })
        res.json({
            uniforms
        });
    } catch (error) {
        next(error);
    }
};

const getUniformById = async (req, res, next) => {
    try {
        const uniforms = await Uniform.findById(req.params.uniformId).orFail();
        res.json(uniforms);
    } catch (err) {
        next(err)
    }
};

const adminRemoveUniform = async (req, res, next) => {
    try {
        const uniform = await Uniform.findById(req.params.uniformId).orFail();
        if (!uniform) {
            return res.status(404).json({ message: "Uniform not found" });
        }
        // console.log(uniform);
        await uniform.remove();
        res.json({ message: "uniform Deleted" });
    } catch (error) {
        next(error);
    }
};

const adminUpdateUniform = async (req, res, next) => {
    try {
        const uniform = await Uniform.findById(req.params.id).orFail();
        const {
            name,
            description,
            brand,
            category,
            supplierCode,
            saleUnit,
            images,
            pdfs,
            stock,
        } = req.body;
        uniform.name = name.toUpperCase() || uniform.name;
        uniform.description = description || uniform.description;
        uniform.brand = brand || uniform.brand;
        uniform.category = category || uniform.category;
        uniform.supplierCode = supplierCode || uniform.supplierCode;
        uniform.saleUnit = saleUnit || uniform.saleUnit;
        uniform.images = images || uniform.images;
        uniform.pdfs = pdfs || uniform.pdfs;
        if (stock.length > 0) {
            uniform.stock = [];
            stock.map((item) => {
                const {
                    _id,
                    price,
                    purchasePrice,
                    size,
                    color,
                } = item;
                uniform.stock.push({
                    _id: _id,
                    price: price || 0,
                    purchasePrice: purchasePrice || 0,
                    size: size || "",
                    color: color || "",
                });
            });
        } else {
            uniform.stock = [];
        }
        await uniform.save();
        res.json({
            message: "uniform updated",
        });
    } catch (err) {
        next(err);
    }
};

const adminDeleteUniformImage = async (req, res, next) => {
    const imagePath = decodeURIComponent(req.params.imagePath);
    if (req.query.cloudinary === "true") {
        try {
            await Uniform.findOneAndUpdate(
                { _id: req.params.uniformId },
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
        await Uniform.findOneAndUpdate(
            { _id: req.params.uniformId },
            { $pull: { images: { path: imagePath } } }
        ).orFail();
        return res.end();
    } catch (err) {
        next(err);
    }
};

const adminDeleteUniformPdf = async (req, res, next) => {
    const pdfPath = decodeURIComponent(req.params.pdfPath);
    if (req.query.cloudinary === "true") {
        try {
            await Uniform.findOneAndUpdate(
                { _id: req.params.uniformId },
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
        await Uniform.findOneAndUpdate(
            { _id: req.params.uniformId },
            { $pull: { pdfs: { path: pdfPath } } }
        ).orFail();
        return res.end();
    } catch (err) {
        next(err);
    }
};

const adminUploadImg = async (req, res, next) => {
    if (req.query.cloudinary === "true") {
        try {
            let uniform = await Uniform.findById(req.query.uniformId).orFail();
            uniform.images.push({ path: req.body.url });
            await uniform.save();
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
            "uniforms"
        );

        let uniform = await Uniform.findById(req.query.uniformId).orFail();

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
            uniform.images.push({ path: "/images/uniforms/" + fileName });
            image.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        await uniform.save();
        return res.send("Files uploaded!");
    } catch (err) {
        next(err);
    }
};

// PDFs
const adminUploadPdf = async (req, res, next) => {
    if (req.query.cloudinary === "true") {
        try {
            let uniform = await Uniform.findById(req.query.uniformId).orFail();
            uniform.pdfs.push({ path: req.body.url });
            await uniform.save();
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

        let uniform = await Uniform.findById(req.query.uniformId).orFail();
        let pdfsTable = [];
        if (Array.isArray(req.files.pdfs)) {
            pdfsTable = req.files.pdfs;
        } else {
            pdfsTable.push(req.files.pdfs);
        }

        for (let pdf of pdfsTable) {
            var uploadPath = uploadDirectoryPdf + "/" + pdf.name;
            uniform.pdfs.push({ path: "/images/documents/" + pdf.name });
            pdf.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        }
        await uniform.save();
        return res.send("Files uploaded!");
    } catch (err) {
        next(err);
    }
};



module.exports = {
    getUniforms, getAllUniforms, getUniformsByCategory, adminCreateUniform, adminRemoveUniform, getUniformById, adminUpdateUniform, adminDeleteUniformImage, adminDeleteUniformPdf, adminUploadImg, adminUploadPdf
};
