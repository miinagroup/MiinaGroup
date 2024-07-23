import React from "react";
import chroma from "chroma-js";

const WeatherCard = ({
  date,
  maxTemp,
  minTemp,
  icon,
  highestTem,
  lowestTem,
  isAdmin,
}) => {
  const colorRange = chroma.scale(["orange", "#9bbffa"]);

  const barHeight = 100;
  const barWidth = 10;

  const weeklyDifference = highestTem - lowestTem;
  const lineHeight = ((maxTemp - minTemp) / weeklyDifference) * barHeight;
  const topGap = (highestTem - maxTemp) / weeklyDifference;
  const topColor = colorRange(topGap).hex();
  const bottomGap = (highestTem - minTemp) / weeklyDifference;
  const bottomColor = colorRange(bottomGap).hex();
  const color = `linear-gradient(to top, ${bottomColor}, ${topColor})`;

  const [year, month, day] = date.split("-");

  const forecastDate = new Date(year, month - 1, day);

  const weekdays = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ];

  const dayOfWeek = weekdays[forecastDate.getDay()];

  // console.log("====================================");
  // console.log("date", date);
  // console.log("weekday", forecastDate.getDay());
  // console.log("maxTemp", maxTemp);
  // console.log("minTemp", minTemp);
  // console.log(bottomGap);
  // console.log(colorRange(bottomGap).hex());
  // console.log("====================================");

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h6 className="mt-2">
        {day}/{month}
      </h6>

      <div
        className="colorLine"
        style={{
          height: `${barHeight}px`,
          width: `${barWidth}px`,
          background: "gray",
          margin: "0 0",
          position: "relative",
          borderRadius: `${barWidth / 2}px`,
        }}
      >
        <div
          style={{
            height: `${lineHeight}px`,
            width: `${barWidth}px`,
            background: color,
            position: "absolute",
            top: `${topGap * barHeight}px`,
            borderRadius: `${barWidth / 2}px`,
          }}
        />
        <span
          style={{
            position: "absolute",
            top: `${topGap * 100 - 10}%`,
            right: `${barWidth * 1.2}px`,
          }}
        >
          {maxTemp}°
        </span>
        <span
          style={{
            position: "absolute",
            top: `${bottomGap * 100 - 10}%`,
            right: `${barWidth * 1.2}px`,
          }}
        >
          {minTemp}°
        </span>
      </div>

      <img id="weather_forecast" className="mb-2 w-50" src={icon} alt="" />

      <h6 className="mb-2" hidden={isAdmin === false}>
        {dayOfWeek}
      </h6>
    </div>
  );
};

export default WeatherCard;
