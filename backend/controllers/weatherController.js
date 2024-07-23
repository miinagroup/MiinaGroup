const Weather = require("../models/WeatherModel");
const axios = require("axios");
const cron = require("node-cron");

const getWeather = async (req, res, next) => {
  try {
    const siteLocation = new RegExp(req.params.location, 'i');
    const weathers = await Weather.find({ location: { $regex: siteLocation } }).orFail();
    res.json(weathers);
  } catch (error) {
    next(error);
  }
};

const getAdminWeather = async (req, res, next) => {
  try {
      const Weathers = await Weather.find({}).sort({ company: "asc" }).orFail();
      res.json(Weathers);
  } catch (error) {
      next(error);
  }
};

const adminCreateWeather = async (req, res, next) => {
  try {
    const { company, location, latLon } = req.body;

    const newWeather = new Weather({
      company,
      location,
      latLon,
      forecast: [
        {
          date: "17-07-2023",
          maxtemp_c: 20.7,
          mintemp_c: 9.5,
          avgtemp_c: 15.2,
          condition: [
            {
              text: "Patchy rain possible",
              icon: "//cdn.weatherapi.com/weather/64x64/day/176.png",
              code: 1000,
            },
          ],
        },
        {
          date: "18-07-2023",
          maxtemp_c: 20.7,
          mintemp_c: 9.5,
          avgtemp_c: 15.2,
          condition: [
            {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
              code: 1000,
            },
          ],
        },
        {
          date: "19-07-2023",
          maxtemp_c: 20.7,
          mintemp_c: 9.5,
          avgtemp_c: 15.2,
          condition: [
            {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
              code: 1000,
            },
          ],
        },
        {
          date: "20-07-2023",
          maxtemp_c: 20.7,
          mintemp_c: 9.5,
          avgtemp_c: 15.2,
          condition: [
            {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
              code: 1000,
            },
          ],
        },
        {
          date: "21-07-2023",
          maxtemp_c: 20.7,
          mintemp_c: 9.5,
          avgtemp_c: 15.2,
          condition: [
            {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
              code: 1000,
            },
          ],
        },
        {
          date: "22-07-2023",
          maxtemp_c: 20.7,
          mintemp_c: 9.5,
          avgtemp_c: 15.2,
          condition: [
            {
              text: "Patchy rain possible",
              icon: "//cdn.weatherapi.com/weather/64x64/day/176.png",
              code: 1000,
            },
          ],
        },
      ],
    });

    await newWeather.save();

    res.json({
      message: "weather created",
    });
  } catch (err) {
    next(err);
  }
};
const fetchWeather = async (latLon) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=1153390f6321443c89042743232807&q=${latLon}&days=6&aqi=no&alerts=no`
  );
  return response.data;
};

const updateWeather = async () => {
  try {
    const weathers = await Weather.find({});
    console.log("I am first step of updateweather!");
    for (let weather of weathers) {
      const fetchedData = await fetchWeather(weather.latLon);
      const newForecast = fetchedData.forecast.forecastday.map((day) => ({
        date: day.date,
        maxtemp_c: day.day.maxtemp_c,
        mintemp_c: day.day.mintemp_c,
        avgtemp_c: day.day.avgtemp_c,
        condition: [
          {
            text: day.day.condition.text,
            icon: day.day.condition.icon,
            code: day.day.condition.code,
          },
        ],
      }));

      weather.forecast = newForecast;
      await weather.save();
      console.log(weather.location, "weather updated successfully");
    }
  } catch (error) {
    console.error(err);
  }
};

const adminUpdateWeather = async (req, res, next) => {
  try {
    await updateWeather();
    res.status(200).send("All site weathers updated successfully");
  } catch (err) {
    next(err);
  }
};

cron.schedule('0 05 06 * * *', updateWeather, {
  scheduled: true,
  timezone: "UTC"
});

module.exports = {
  getAdminWeather,
  getWeather,
  adminCreateWeather,
  adminUpdateWeather,
};
