const mongoose = require("mongoose");

const trackSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userCompany: {
      type: String,
      required: true,
    },
    loginTime: {
      type: Date,
      required: true,
    },
    logoutTime: {
      type: Date,
      required: true,
    },
    trackActivity: [
      {
        event: {
          type: String,
          required: true,
        },
        targetType: {
          type: String,
          required: false,
        },
        targetId: {
          type: String,
          required: false,
        },
        targetContent: {
          type: String,
          required: false,
        },
        location: {
          type: String,
          required: false,
        },
        timeSpend: {
          type: String,
          required: false,
        },
        timeFired: {
          type: Date,
          required: false,
        },
      },
    ],

  },
  { timestamps: true }
);

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
