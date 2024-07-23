const News = require("../models/NewsModel");

const adminCreateNews = async (req, res, next) => {
    try {
        const news = new News();
        const { title, details, author } = req.body;
        news.title = title;
        news.details = details;
        news.author = author;

        await news.save();
        res.json({
            message: "news created",
        });
    } catch (err) {
        next(err);
    }
};

const getNews = async (req, res, next) => {
    try {
        const news = await News.find({}).sort({ title: "asc" }).orFail();
        res.json(news);
    } catch (err) {
        next(err)
    }
};

const getNewsById = async (req, res, next) => {
    try {
        const news = await News.findById(req.params.id).orFail();
        res.json(news);
    } catch (err) {
        next(err)
    }
};

const adminRemoveNews = async (req, res, next) => {
    try {
        const news = await News.findOne({ newsId: req.params.newsId });
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        // console.log(News);
        await news.deleteOne();
        res.json({ message: "News Deleted" });
    } catch (error) {
        next(error);
    }
};

const adminUpdateNews = async (req, res, next) => {
    try {
        const news = await News.findById(req.params.id).orFail();
        const { title, author, details } = req.body;
        news.title = title || news.title;
        news.author = author || news.author;
        news.details = details || news.details;

        await news.save();
        res.json({
            message: "news updated",
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    adminCreateNews, getNews, getNewsById, adminRemoveNews, adminUpdateNews
};