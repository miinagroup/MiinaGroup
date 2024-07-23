const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    latLon: { 
        type: String, 
        required: true 
    },
    forecast:[{
        date: {
            type: String,
            required: true,
        },
        maxtemp_c: {
            type: Number,
            required: true,
        },
    
        mintemp_c: {
            type: Number,
            required: true,
        },
        avgtemp_c: {
            type: Number,
            required: true,
        },
        condition: [{
            text: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                required: true,
            },
            code: {
                type: Number,
                required: true,
            },
        }],
    }]
});

const Weather = mongoose.model("Weather", WeatherSchema);
module.exports = Weather;
