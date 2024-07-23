const Chart = require("../models/ChartModel");

const adminCreateChart = async (req, res, next) => {
  try {
    //console.log("hello");
    const chart = new Chart();
    const { name, baseUrl, chartId, adminUse } = req.body;
    chart.name = name;
    chart.baseUrl = baseUrl;
    chart.chartId = chartId;
    chart.adminUse = adminUse;

    await chart.save();
    res.json({
      message: "chart created",
      chartId: chart._id,
    });
  } catch (err) {
    next(err);
  }

};

const getCharts = async (req, res, next) => {
  try {
    if(!req.user.isAdmin && !req.user.isMarketing){
      return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    const charts = await Chart.find({}).sort({ name: "asc" }).orFail();
    res.json(charts);
  } catch (err) {
    next(err)
  }
};

const adminRemoveChart = async (req, res, next) => {
  try {
    const chart = await Chart.findOne({ chartId: req.params.chartId });
    if (!chart) {
      return res.status(404).json({ message: "Chart not found" });
    }
    // console.log(chart);
    await chart.deleteOne();
    res.json({ message: "Chart Deleted" });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  adminCreateChart, getCharts, adminRemoveChart,
};
