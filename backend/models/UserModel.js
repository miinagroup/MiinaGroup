const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    ipAddress: {
      type: String,
    },
    phone: {
      type: String,
    },
    mobile: {
      type: String,
    },
    location: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    role: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    postCode: {
      type: String,
    },
    deliveryAddress: {
      type: String,
    },
    billAddress: {
      type: String,
    },
    state: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    siteSku: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSitePerson: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSiteManager: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPD: {
      type: Boolean,
      required: true,
      default: false,
    },
    isInvoiceViwer: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSales: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSalesAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isMarketing: {
      type: Boolean,
      required: true,
      default: false,
    },
    isUniformManager: {
      type: Boolean,
      required: false,
      default: false,
    },
    accounts: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeveloper: {
      type: Boolean,
      required: true,
      default: false,
    },
    mobileNotificationToken: {
      type: String,
      required: false,
    },
    verified: { type: Boolean, default: false },
    siteVerified: { type: Boolean, default: false },
    wantWeather: { type: Boolean, default: false },
    editeHistroys: [
      {
        operator: {
          type: String,
          required: false,
        },
        editedAt: {
          type: Date,
          required: false,
        },
        function: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* userSchema.index({ ipAddress: 1 }, { unique: true, sparse: true }); */

const User = mongoose.model("User", userSchema);
module.exports = User;
