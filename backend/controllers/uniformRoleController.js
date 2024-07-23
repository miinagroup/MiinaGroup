const UniformRole = require("../models/UniformRoleModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const pdfValidate = require("../utils/pdfValidate");
const cron = require("node-cron");
const moment = require("moment-timezone");

const getUniformRole = async (req, res, next) => {
    try {
        const uniformRole = await UniformRole.find({}).sort({ role: "asc" }).orFail();
        res.json(uniformRole);
    } catch (err) {
        next(err)
    }
};

const getUniformRoleByRole = async (req, res, next) => {
    try {
        const uniformRole = await UniformRole.findOne({ role: req.params.userRole }).orFail();
        res.json(uniformRole);
    } catch (err) {
        next(err)
    }
};

const adminCreateUniformRole = async (req, res, next) => {
    try {
        const uniformRole = new uniformRoles();
        const { role, maxShirtQuantity, maxpantQuantity, maxOverallQuantity, maxJacketQuantity, maxBootQuantity } = req.body;
        uniformRole.role = role;
        uniformRole.maxShirtQuantity = maxShirtQuantity;
        uniformRole.maxpantQuantity = maxpantQuantity;
        uniformRole.maxOverallQuantity = maxOverallQuantity;
        uniformRole.maxJacketQuantity = maxJacketQuantity;
        uniformRole.maxBootQuantity = maxBootQuantity;
        await uniformRole.save();
        res.json({
            message: "uniformRole created",
            uniformRoleId: uniformRole._id,
        })

    } catch (err) {
        next(err);
    }
};

const adminRemoveUniformRole = async (req, res, next) => {
    try {
        const uniformRole = await UniformRole.findOne({ uniformRoleId: req.params.uniformRoleId });
        if (!uniformRole) {
            return res.status(404).json({ message: "uniformRole not found" });
        }
        // console.log(uniformRole);
        await uniformRole.deleteOne();
        res.json({ message: "uniformRole Deleted" });
    } catch (error) {
        next(error);
    }
};

const adminUpdateUniformRole = async (req, res, next) => {
    try {
        const uniformRole = await UniformRole.findById(req.params.id).orFail();
        const { role, maxShirtQuantity, maxpantQuantity, maxOverallQuantity, maxJacketQuantity, maxBootQuantity } = req.body;
        uniformRole.role = role || uniformRole.role;
        uniformRole.maxShirtQuantity = maxShirtQuantity || uniformRole.maxShirtQuantity;
        uniformRole.maxpantQuantity = maxpantQuantity || uniformRole.maxpantQuantity;
        uniformRole.maxOverallQuantity = maxOverallQuantity || uniformRole.maxOverallQuantity;
        uniformRole.maxJacketQuantity = maxJacketQuantity || uniformRole.maxJacketQuantity;
        uniformRole.maxBootQuantity = maxBootQuantity || uniformRole.maxBootQuantity;
        await uniformRole.save();
        res.json({
            message: "uniformRole updated",
        });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    getUniformRole, getUniformRoleByRole, adminRemoveUniformRole, adminUpdateUniformRole, adminCreateUniformRole,
};