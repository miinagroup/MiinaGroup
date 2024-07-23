const DeliveryBook = require("../models/DeliveryBookModel");

function formatString(input) {
    let words = input.split(' ');
    let formattedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    let formattedString = formattedWords.join('');
    
    return formattedString;
}

const getClientSkuNamesList = async (req, res, next) => {
    try {
        let skuList = [];
        const books = await DeliveryBook.find();

        books.map(book => {
            const result = book.companyAccount.slice(0,3).toLowerCase();
            

            book.sites.map((site) => {
                const client = formatString(site.name)
                const sku = result.concat(formatString(site.name));
                skuList.push({sku, _id: site._id});
            })
        })

        console.log(skuList)
        res.json(skuList); 

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getClientSkuNamesList
};
  