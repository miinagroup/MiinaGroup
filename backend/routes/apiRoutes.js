const express = require("express")
const app = express()
const productRoutes = require("./productRoutes")
const categoryRoutes = require("./categoryRoutes")
const userRoutes = require("./userRoutes")
const orderRoutes = require("./orderRoutes")
const sendEmailRoutes = require("./sendEmailRoutes")
const cartRoutes = require("./cartRoutes")
const deliveryBookRoutes = require("./deliveryBookRoutes")

const jwt = require("jsonwebtoken");
app.get("/logout", (req, res) => {
    return res.clearCookie("access_token").send("access token cleared");
});
app.get("/get-token", (req, res) => {
    try {
        const accessToken = req.cookies["access_token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        return res.json({ token: decoded.name, isAdmin: decoded.isAdmin, isSuperAdmin: decoded.isSuperAdmin, isMarketing: decoded.isMarketing, isSales: decoded.isSales, isSalesAdmin: decoded.isSalesAdmin, accounts: decoded.accounts });
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized. Invalid Token"
        });
    }
})

app.use("/products", productRoutes)
app.use("/categories", categoryRoutes)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)
app.use("/sendemail", sendEmailRoutes)
app.use("/cart", cartRoutes)
app.use("/deliveryBooks", deliveryBookRoutes)

module.exports = app
