const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;