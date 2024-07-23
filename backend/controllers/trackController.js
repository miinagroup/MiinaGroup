const Track = require("../models/TrackModel");

const saveTrackData = async (req, res, next) => {
  try {
    const trackData = new Track();
    const { userId, userName, userCompany, loginTime, logoutTime, trackActivity } = req.body;

    trackData.userId = userId;
    trackData.userName = userName;
    trackData.userCompany = userCompany;
    trackData.loginTime = new Date(loginTime);
    trackData.logoutTime = new Date(logoutTime);
    if (trackActivity.length > 0) {
      trackData.trackActivity = [];
      trackActivity.map((activity) => {
        const {
          event,
          targetType,
          targetId,
          targetContent,
          location,
          timeSpend,
          timeFired,
        } = activity;
        trackData.trackActivity.push({
          event: event || "",
          targetType: targetType || "",
          targetId: targetId || "",
          targetContent: targetContent || "",
          location: location || "",
          timeSpend: timeSpend || "",
          timeFired: new Date(timeFired) || loginTime,
        });
      });
    } else {
      trackData.trackActivity = [];
    }
    //console.log(trackData);
    await trackData.save();
    res.json({
      message: "Track Data Saved",
    });
  } catch (error) {
    next(error);
  }
};

const getUserTrackData = async (req, res, next) => {
  try {
    if (!req.user.isAdmin && !req.user.isMarketing) {
      return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    const userData = await Track.find({})
      .sort({ createdAt: "desc" });
    res.send(userData);
  } catch (err) {
    next(err);
  }
};

const getUserEventTrackData = async (req, res, next) => {
  try {
    const userData = await Track.findById(req.params.id)
      .orFail();
    res.send(userData);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  saveTrackData, getUserTrackData, getUserEventTrackData
};
