const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
router.post("/create-checkout-session", async (req, res) => {
    const { cartItems, cartSubtotal, userInfo, purchaseNumber } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "aud",
                    product_data: {
                        name: "Order Payment",
                    },
                    unit_amount: Math.round(cartSubtotal * 100), // in cents
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment-success?purchaseNumber=${purchaseNumber}`,
        cancel_url: `${process.env.CLIENT_URL}/user/cart`,
        metadata: {
            userId: userInfo._id,
            email: userInfo.email,
        },
    });

    res.json({ id: session.id });
});

module.exports = router;
