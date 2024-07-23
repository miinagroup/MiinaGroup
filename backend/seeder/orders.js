const ObjectId = require("mongodb").ObjectId

const orders = Array.from({length: 5}).map((_, idx) => {
    let day = 20
    if(idx < 2) {
        var hour = "0" + idx
        var subtotal = 100
    } else if(idx > 16 && idx < 21) {
        var hour = idx
        var subtotal = 100 + 12*idx
    } else {
        var hour = idx
        var subtotal = 100
    }
    return {
        user:ObjectId("639be87444488030633bbc7d"),
        orderTotal: {
            itemsCount: 3,
            cartSubtotal: subtotal
        },
        cartItems: [
            {
                name: "V9 HARD HAT UNVENTED PUSHLOCK HARNESS",
                price: 34,
                image: {path: "/images/categories/hardhats.jpg"},
                quantity: 3,
                count: 12
            },
        ],
        paymentMethod: "Invoice",
        purchaseNumber: `PO0000${idx+1}`,
        invoiceNumber:`SLR0000000${idx+1}`,
        orderNote: "orderNote",
        isPaid: false,
        isDelivered: false,
        createdAt: `2022-03-${day}T${hour}:12:36.490+00:00`
    }
})

module.exports = orders
