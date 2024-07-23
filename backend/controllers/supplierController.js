const Supplier = require("../models/SupplierModel");

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json({
      status: "success",
      data: {
        suppliers,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to retrieve suppliers",
    });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        supplier,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to retrieve supplier",
    });
  }
};

const createSupplier = async (req, res) => {
  try {
    const supplier = new Supplier();
    const {
      supplierName,
      supplierSalesEmail,
      supplierSalesPhone,
      supplierAddress,
      supplierCity,
      supplierState,
      supplierPostcode,
      supplierCountry,
      supplierBillingEmail,
      supplierBillingPhone,
      ctlCreditAccount,
      supplierABN,
    } = req.body;
    supplier.supplierName = supplierName;
    supplier.supplierSalesEmail = supplierSalesEmail;
    supplier.supplierSalesPhone = supplierSalesPhone;
    supplier.supplierAddress = supplierAddress;
    supplier.supplierCity = supplierCity;
    supplier.supplierState = supplierState;
    supplier.supplierPostcode = supplierPostcode;
    supplier.supplierCountry = supplierCountry;
    supplier.supplierBillingEmail = supplierBillingEmail;
    supplier.supplierBillingPhone = supplierBillingPhone;
    supplier.ctlCreditAccount = ctlCreditAccount;
    supplier.supplierABN = supplierABN;

    await supplier.save();
    res.status(201).json({
      status: "success",
      message: "Supplier Created",
      data: {
        supplier,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to create supplier",
    });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const { isAdmin, isSuperAdmin, email } = req.user;

    const supplier = await Supplier.findById(req.params.id).orFail();
    
    if (isAdmin && !isSuperAdmin) {
      const editHistoryEntry = {
        operator: email, 
        editedAt: new Date(), 
        function: 'update supplier'
      };
      
      supplier.editeHistroys.push(editHistoryEntry);
      await supplier.save();
      
      return res.status(403).json({ message: "You do not have permission to update supplier." });
    }

    const {
      supplierName,
      supplierSalesEmail,
      supplierSalesPhone,
      supplierAddress,
      supplierCity,
      supplierState,
      supplierPostcode,
      supplierCountry,
      supplierBillingEmail,
      supplierBillingPhone,
      ctlCreditAccount,
      supplierABN,
    } = req.body;
    supplier.supplierName = supplierName;
    supplier.supplierSalesEmail = supplierSalesEmail;
    supplier.supplierSalesPhone = supplierSalesPhone;
    supplier.supplierAddress = supplierAddress;
    supplier.supplierCity = supplierCity;
    supplier.supplierState = supplierState;
    supplier.supplierPostcode = supplierPostcode;
    supplier.supplierCountry = supplierCountry;
    supplier.supplierBillingEmail = supplierBillingEmail;
    supplier.supplierBillingPhone = supplierBillingPhone;
    supplier.ctlCreditAccount = ctlCreditAccount;
    supplier.supplierABN = supplierABN;

    await supplier.save();
    res.status(200).json({
      status: "success",
      message: "Supplier Updated",
      data: {
        supplier,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Unable to update supplier",
    });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { isAdmin, isSuperAdmin, email } = req.user;

    const supplierId = req.params.id;
    const supplier = await Supplier.findById(supplierId).orFail();

    if (isAdmin && !isSuperAdmin) {
      const editHistoryEntry = {
        operator: email, 
        editedAt: new Date(), 
        function: 'delete supplier'
      };
      
      supplier.editeHistroys.push(editHistoryEntry);
      await supplier.save();
      
      return res.status(403).json({ message: "You do not have permission to delete supplier. Please contact your manager." });
    }

    await supplier.remove();

    res.json({ message: "Supplier Deleted" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to delete supplier",
    });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
