const express = require('express')
const router = express.Router()
const {recordVisiting, createVisitorTrack, getVisitorTracks, getVisitorTrackById} = require("../controllers/visitorTrackController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")


router.post("/create", createVisitorTrack)
router.put("/record", recordVisiting)

router.use(verifyIsLoggedIn)
router.get("/", getVisitorTracks)
router.get("/track", getVisitorTrackById)

module.exports = router

