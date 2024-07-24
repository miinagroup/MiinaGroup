const DeliveryBook = require("../models/DeliveryBookModel");

function formatString(string) {
    let words = string.split(' ');
    let formattedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    let formattedString = formattedWords.join('');
    
    return formattedString;
}

const getClientSkuNamesList = async (req, res, next) => {
    try {
        let skuList = [];
        const deliveryBook = await DeliveryBook.find();

        deliveryBook.map(item => {
            const prefix = item.companyAccount.slice(0,3).toLowerCase();
            
            item.sites.map((site) => {
                const sku = prefix.concat(formatString(site.name));
                skuList.push({sku, _id: site._id});
            })
        })

        res.json(skuList);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getClientSkuNamesList
};
  