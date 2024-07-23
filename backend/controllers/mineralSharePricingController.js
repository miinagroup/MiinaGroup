const MineralSharePrice = require("../models/MineralSharePricingModel");
const axios = require("axios");
const cron = require("node-cron");

const getMineralPrice = async (req, res, next) => {
  try {
    const mineralPrice = await MineralSharePrice.find({ category: "Minerals" })
      .sort({ name: "asc" })
      .orFail();
    res.json(mineralPrice);
  } catch (error) {
    next(error);
  }
};

const getStockPrice = async (req, res, next) => {
  try {
    const stocklPrice = await MineralSharePrice.find({ category: "Stock" })
      .sort({ name: "asc" })
      .orFail();
    res.json(stocklPrice);
  } catch (error) {
    next(error);
  }
};

const adminCreatePrice = async (req, res, next) => {
  try {
    const { name, symbolsCode, category, latestPrice, updateDate, difference } =
      req.body;
    if (
      !(
        name &&
        symbolsCode &&
        category &&
        latestPrice &&
        updateDate &&
        difference
      )
    ) {
      console.log("I am here");

      return res.status(400).send("All inputs are required");
    }

    const symbolExists = await MineralSharePrice.findOne({ symbolsCode });
    if (symbolExists) {
      return res.status(400).send("symbol exists");
    } else {
      const mineralSharePrice = await MineralSharePrice.create({
        name,
        symbolsCode,
        category,
        latestPrice,
        updateDate,
        difference,
      });
      res.status(201).send({ priceCreated: mineralSharePrice });
    }
  } catch (err) {
    next(err);
  }
};

/* const updateMineralPrices = async () => {
  try {
    const response = await axios.get('https://metals-api.com/api/latest?access_key=8k681h1l6p7sh81nsl8ja22dj7914d7665putqbc7dnyupec7e1420no7w3q&base=AUD&symbols=XAU%2CXAG%2CXPT%2CXPD%2CIRON%2CALU%2CLCO%2CXCU%2CLEAD%2CNI%2CTIN%2CZNC');
    const data = response.data.rates;
    let date = new Date(response.data.date);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    date = `${day}-${month}-${year}`;

    for (let symbol in data) {
      let price = data[symbol];

      price = Number(price).toFixed(2);
    
      await MineralSharePrice.findOneAndUpdate(
          { symbolsCode: symbol }, 
          { 
              latestPrice: price, 
              updateDate: date 
          }, 
          { new: true },  
      )
      .catch(err => console.error(`Failed to find and update document with symbol ${symbol}: ${err}`));
    }
    console.log("Minerals Price Has Been Updated");
  } catch(err) {
    console.error(err);
  }
} */
const updateMineralPrices = async () => {
  try {
    const symbolGroups = [
      "XAU%2CXAG%2CXPT%2CXPD%2CIRON",
      "ALU%2CLCO%2CXCU%2CLEAD%2CNI",
      "TIN%2CZNC%2CLITHIUM",
    ];

    for (let group of symbolGroups) {
      const response = await axios.get(
        `https://metals-api.com/api/latest?access_key=8k681h1l6p7sh81nsl8ja22dj7914d7665putqbc7dnyupec7e1420no7w3q&base=AUD&symbols=${group}`
      );
      const data = response.data.rates;
      let date = new Date(response.data.date);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      date = `${day}-${month}-${year}`;

      for (let symbol in data) {
        let price = data[symbol];
        price = Number(price).toFixed(2);

        await MineralSharePrice.findOneAndUpdate(
          { symbolsCode: symbol },
          {
            latestPrice: price,
            updateDate: date,
          },
          { new: true }
        ).catch((err) =>
          console.error(
            `Failed to find and update document with symbol ${symbol}: ${err}`
          )
        );
      }
    }
    console.log("Minerals Price Has Been Updated");
  } catch (err) {
    console.error(err);
  }
};
const adminUpdateMineralsPrice = async (req, res, next) => {
  try {
    await updateMineralPrices();
    res.status(200).send("Minerals Prices and dates updated successfully");
  } catch (err) {
    next(err);
  }
};

const autoUpdateMineralPrices = async () => {
  if (process.env.NODE_ENV === "production") {
    try {
      const symbolGroups = [
        "XAU%2CXAG%2CXPT%2CXPD%2CIRON",
        "ALU%2CLCO%2CXCU%2CLEAD%2CNI",
        "TIN%2CZNC",
      ];

      for (let group of symbolGroups) {
        const response = await axios.get(
          `https://metals-api.com/api/latest?access_key=8k681h1l6p7sh81nsl8ja22dj7914d7665putqbc7dnyupec7e1420no7w3q&base=AUD&symbols=${group}`
        );
        const data = response.data.rates;
        let date = new Date(response.data.date);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        date = `${day}-${month}-${year}`;

        for (let symbol in data) {
          let price = data[symbol];
          price = Number(price).toFixed(2);

          await MineralSharePrice.findOneAndUpdate(
            { symbolsCode: symbol },
            {
              latestPrice: price,
              updateDate: date,
            },
            { new: true }
          ).catch((err) =>
            console.error(
              `Failed to find and update document with symbol ${symbol}: ${err}`
            )
          );
        }
      }
      console.log("Minerals Price Has Been Updated");
    } catch (err) {
      console.error(err);
    }
  }
};

cron.schedule("0 */2 * * *", autoUpdateMineralPrices, {
  scheduled: true,
  timezone: "Australia/Perth",
});
// cron.schedule("*/40 * * * *", autoUpdateMineralPrices, {
//   scheduled: true,
//   timezone: "UTC",
// });

const updateStocksPrices = async () => {
  try {
    const response = await axios.get(
      "https://eodhistoricaldata.com/api/real-time/BHP.AU,FMG.AU,RIO.AU,NCM.AU,S32.AU,PLS.AU,NST.AU,MIN.AU,IGO.AU,AKE.AU,BSL.AU,LYC.AU,EVN.AU,LTR.AU,ILU.AU,AWC.AU,CIA.AU,SGM.AU,AVZ.AU,SFR.AU,ZIM.AU,NIC.AU,CRN.AU,DRR.AU,DEG.AU,PRU.AU,CHN.AU,SMR.AU,SYA.AU,CXO.AU,BGL.AU,CMM.AU,GOR.AU,RRL.AU,EMR.AU,RMS.AU,GMD.AU,LLL.AU,VSL.AU,SLR.AU,IMD.AU,LRS.AU,WAF.AU,RSG.AU,ADT.AU,WGX.AU,PRN.AU,MCR.AU,VUL.AU,RED.AU,INR.AU,ARU.AU,DVP.AU,GRR.AU,AZS.AU,SYR.AU,PMT.AU,TIE.AU,AGY.AU,TLG.AU?fmt=json&&api_token=64c092c1153d18.61518510"
    );
    const externalData = response.data;

    let now = new Date();
    let timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
    let perthOffset = 8 * 60 * 60 * 1000;
    let perthTime = new Date(now.getTime() + timezoneOffset + perthOffset);
    let formattedDate = new Intl.DateTimeFormat("en-GB").format(perthTime);

    let bulkOps = externalData.map((item) => {
      let difference =
        typeof item.change_p === "number" ? item.change_p.toFixed(2) : "0";
      let companySize =
        item.volume === "NA" ? "0" : (item.volume * item.close).toFixed(2);
      return {
        updateOne: {
          filter: {
            symbolsCode: item.code,
            category: "Stock",
          },
          update: {
            latestPrice: item.close.toString(),
            difference: difference,
            companySize: companySize,
            updateDate: formattedDate.split("/").join("-"),
          },
        },
      };
    });

    let result = await MineralSharePrice.bulkWrite(bulkOps);

    console.log("Stocks Price Updated successful");
  } catch (error) {
    console.log({ message: "An error occurred", error: error.toString() });
  }
};

const adminUpdateStocksPrice = async (req, res, next) => {
  try {
    await updateStocksPrices();
    res.status(200).send("Stocks Prices and dates updated successfully");
  } catch (err) {
    next(err);
  }
};

const autoUpdateStocksPrices = async () => {
  if (process.env.NODE_ENV !== "development") {
    try {
      const response = await axios.get(
        "https://eodhistoricaldata.com/api/real-time/BHP.AU,FMG.AU,RIO.AU,NCM.AU,S32.AU,PLS.AU,NST.AU,MIN.AU,IGO.AU,AKE.AU,BSL.AU,LYC.AU,EVN.AU,LTR.AU,ILU.AU,AWC.AU,CIA.AU,SGM.AU,AVZ.AU,SFR.AU,ZIM.AU,NIC.AU,CRN.AU,DRR.AU,DEG.AU,PRU.AU,CHN.AU,SMR.AU,SYA.AU,CXO.AU,BGL.AU,CMM.AU,GOR.AU,RRL.AU,EMR.AU,RMS.AU,GMD.AU,LLL.AU,VSL.AU,SLR.AU,IMD.AU,LRS.AU,WAF.AU,RSG.AU,ADT.AU,WGX.AU,PRN.AU,MCR.AU,VUL.AU,RED.AU,INR.AU,ARU.AU,DVP.AU,GRR.AU,AZS.AU,SYR.AU,PMT.AU,TIE.AU,AGY.AU,TLG.AU?fmt=json&&api_token=64c092c1153d18.61518510"
      );
      const externalData = response.data;

      let now = new Date();
      let timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
      let perthOffset = 8 * 60 * 60 * 1000;
      let perthTime = new Date(now.getTime() + timezoneOffset + perthOffset);
      let formattedDate = new Intl.DateTimeFormat("en-GB").format(perthTime);

      let bulkOps = externalData.map((item) => {
        let difference =
          typeof item.change_p === "number" ? item.change_p.toFixed(2) : "0";
        let companySize =
          item.volume === "NA" ? "0" : (item.volume * item.close).toFixed(2);
        return {
          updateOne: {
            filter: {
              symbolsCode: item.code,
              category: "Stock",
            },
            update: {
              latestPrice: item.close.toString(),
              difference: difference,
              companySize: companySize,
              updateDate: formattedDate.split("/").join("-"),
            },
          },
        };
      });

      let result = await MineralSharePrice.bulkWrite(bulkOps);

      console.log("Stocks Price Updated successful");
    } catch (error) {
      console.log({ message: "An error occurred", error: error.toString() });
    }
  }
};

cron.schedule("0 5 0 * * *", autoUpdateStocksPrices, {
  scheduled: true,
  timezone: "UTC",
});

/* cron.schedule('19 12 * * *', autoUpdateMineralPrices, {
  scheduled: true,
  timezone: "Australia/Perth"
}); */

module.exports = {
  getMineralPrice,
  getStockPrice,
  adminCreatePrice,
  adminUpdateMineralsPrice,
  adminUpdateStocksPrice,
};

/* 
api.openweathermap.org/data/2.5/forecast/daily?lat={维度}&lon={经度}&cnt={天}&appid=2661e8453a0019c38576fec6d7649d24
*/

// weather api
// http://api.weatherapi.com/v1/forecast.json?key=3e572308a2a646d0b5c82751231307&q=-31.106598, 122.031713&days=4
