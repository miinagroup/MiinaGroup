const express = require("express")
const app = express()
const productRoutes = require("./productRoutes")
const categoryRoutes = require("./categoryRoutes")
const userRoutes = require("./userRoutes")
const orderRoutes = require("./orderRoutes")
const sendEmailRoutes = require("./sendEmailRoutes")
const cartRoutes = require("./cartRoutes")
const poCartRoutes = require("./poCartRoutes")
const deliveryBookRoutes = require("./deliveryBookRoutes")
const mineralSharePriceRoutes = require("./mineralSharePriceRoutes")
const weatherRoutes = require("./weatherRoutes")
const promotionRoutes = require("./promotionRoutes")
const quickBooksRoutes = require("./quickBooksRoutes")
const quoteRoutes = require("./quoteRoutes")
const chartRoutes = require("./chartRoutes")
const trackRoutes = require("./trackRoutes")
const newsRoutes = require("./newsRoutes")
const visitorTrackRoutes = require("./visitorTrackRoutes")
const uniformRoutes = require("./uniformRoutes")
const uniformCartRoutes = require("./uniformCartRoutes")
const uniformCategoryRoutes = require("./uniformCategoryRoutes")
const supplierRoutes = require("./supplierRoutes")
const uniformRoleRoutes = require("./uniformRoleRoutes")
const purchaseOrderRoutes = require("./purchaseOrderRoutes")
const uniformSupplierRoutes = require("./UniformSuppliersRoute")
const uniformSelectedSuppliersRoutes = require("./UniformSelectedSuppliersRoute")

const jwt = require("jsonwebtoken");
/* logout */
app.get("/logout", (req, res) => {
    return res.clearCookie("access_token").send("access token cleared");
});
/* login */
app.get("/get-token", (req, res) => {
    try {
        const accessToken = req.cookies["access_token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        return res.json({ token: decoded.name, isAdmin: decoded.isAdmin, isSuperAdmin: decoded.isSuperAdmin, isMarketing: decoded.isMarketing, isSales: decoded.isSales, isSalesAdmin: decoded.isSalesAdmin, accounts: decoded.accounts, isDeveloper: decoded.isDeveloper });
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
app.use("/poCart", poCartRoutes)
app.use("/deliveryBooks", deliveryBookRoutes)
app.use("/mineralSharePrice", mineralSharePriceRoutes)
app.use("/weather", weatherRoutes)
app.use("/promotion", promotionRoutes)
app.use("/quickBooks", quickBooksRoutes)
app.use("/quotes", quoteRoutes)
app.use("/charts", chartRoutes)
app.use("/tracks", trackRoutes)
app.use("/news", newsRoutes)
app.use("/visitorTracks", visitorTrackRoutes)
app.use("/uniforms", uniformRoutes)
app.use("/uniformCarts", uniformCartRoutes)
app.use("/uniformCategories", uniformCategoryRoutes)
app.use("/suppliers", supplierRoutes)
app.use("/uniformRoles", uniformRoleRoutes)
app.use("/purchaseOrders", purchaseOrderRoutes)
app.use("/uniformSuppliers", uniformSupplierRoutes)
app.use("/uniformSelectedSuppliers", uniformSelectedSuppliersRoutes)

module.exports = app
