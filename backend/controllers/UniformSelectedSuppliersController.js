const UniformSelectedSupplier = require("../models/UniformSelectedSuppliersModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const pdfValidate = require("../utils/pdfValidate");
const cron = require("node-cron");
const moment = require("moment-timezone");
const UniformSelectedSuppliers = require("../models/UniformSelectedSuppliersModel");


const getSelectedSuppliers = async (req, res, next) => {
    try {
        const selectedSuppliers = await UniformSelectedSupplier.find({}).orFail();
        res.json(selectedSuppliers);
    } catch (error) {
        next(error);
    }
};
const getSelectedSuppliersByCompanyName = async (req, res, next) => {
    try {
        const companyName = req.params.userCompany;
        const selectedSuppliers = await UniformSelectedSupplier.find({ companyName: companyName });
        res.json(selectedSuppliers);
    } catch (error) {
        next(error);
    }
};

const createSelectedSuppliers = async (req, res, next) => {
    try {
        const selectedData = req.body;
        const userData = selectedData.userData;
        const brandData = selectedData.selectedBrands;
        const uniformSelectedSupplier = new UniformSelectedSuppliers({
            companyName: userData.userCompany,
            companySite: userData.userSite,
            stock: brandData,
        });

        const createdSelectedSuppliers = await uniformSelectedSupplier.save();
        res.status(201).send(createdSelectedSuppliers)

    } catch (err) {
        next(err);
    }
}

const updateSelectedSuppliers = async (req, res, next) => {
    try {
        const selectedData = req.body;
        const userData = selectedData.userData;
        const brandData = selectedData.selectedBrands;
        const uniformSelectedSupplier = await UniformSelectedSuppliers.findById(req.params.id).orFail();
        if (uniformSelectedSupplier) {
            uniformSelectedSupplier.stock = brandData
        }
        const updatedsuppliers = await uniformSelectedSupplier.save();
        res.send(updatedsuppliers)

    } catch (err) {
        next(err);
    }
}

module.exports = { getSelectedSuppliersByCompanyName, getSelectedSuppliers, createSelectedSuppliers, updateSelectedSuppliers };