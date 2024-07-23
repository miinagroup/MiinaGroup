const VisitorTrack = require("../models/VisitorTrackModel");

const recordVisiting = async (req, res, next) => {
  try {
    // console.log("I am here to track visitors", req.query);
    const source = req.query.source;
    const userId = req.query.userId;
    const visitorTrack = await VisitorTrack.findOne({
      source: source,
    }).orFail();

    if (!visitorTrack) {
      return res.status(404).json({ message: "Visitor Track not found" });
    }

    const isValidObjectId = (id) => {
      return /^[0-9a-fA-F]{24}$/.test(id);
    };

    if (userId && isValidObjectId(userId)) {
      const newVisit = {
        visitTime: new Date(),
        visitorType: "Existing User",
        userId: userId,
      };
      visitorTrack.visits.push(newVisit);
    } else {
      const newVisit = {
        visitTime: new Date(),
        visitorType: "New Visitor",
      };
      visitorTrack.visits.push(newVisit);
    }

    visitorTrack.entryNumber += 1;

    await visitorTrack.save();

    res.json(visitorTrack);
  } catch (error) {
    next(error);
  }
};

const createVisitorTrack = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { from, source, link } = req.body;

    const newVisitorTrack = new VisitorTrack({
      from,
      source,
      link,
      entryNumber: "0",
      visits: [],
    });

    await newVisitorTrack.save();
    // console.log(newVisitorTrack);
    res.json(newVisitorTrack);
  } catch (error) {
    next(error);
  }
};

const getVisitorTracks = async (req, res, next) => {
  try {
    const visitorTracks = await VisitorTrack.find({});
    res.json(visitorTracks);
  } catch (error) {
    next(error);
  }
};

const getVisitorTrackById = async (req, res, next) => {
  try {
    const visitorTrack = await VisitorTrack.findById(req.query.id)
      .populate('visits.userId', 'name lastName email company')
      .exec();
    if (!visitorTrack) {
      return res.status(404).json({ message: "Visitor Track not found" });
    }
    res.json(visitorTrack);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  recordVisiting,
  createVisitorTrack,
  getVisitorTracks,
  getVisitorTrackById
};
