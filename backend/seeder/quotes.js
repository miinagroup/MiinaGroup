const ObjectId = require("mongodb").ObjectId

const quotes = Array.from({length: 5}).map((_, idx) => {
    return {
        // user part
        name: `quote ${idx}`,
        userDescription: Math.random().toString(36).substring(2, 15),
        images: [
            {
                path: `path ${idx}`
            }
        ],

        // admin part
        user: ObjectId("639be87444488030633bbc7d"),
        existingProduct: Math.random() < 0.5,
        expireDate: new Date(Date.now() + Math.floor(Math.random() * 1000000000)),
        status: ["received", "processing", "completed"][Math.floor(Math.random() * 3)],
        accepted: Math.random() < 0.5,
        reason: ["price", "no more needed", "other"][Math.floor(Math.random() * 3)],
        requested: Math.random() < 0.5
    }
})

module.exports = quotes
