const mongoose = require("mongoose");

const visitorTrackSchema = mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    entryNumber: {
      type: Number,
      required: true,
    },
    visits: [
      {
        visitTime: {
          type: Date,
          required: true,
        },
        visitorType: {
          type: String,
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', 
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const VisitorTrack = mongoose.model("VisitorTrack", visitorTrackSchema);
module.exports = VisitorTrack;
