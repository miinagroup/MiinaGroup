const mongoose = require("mongoose");

const uniformCategorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    display: { type: Boolean, required: false },
    description: { type: String, default: "default category description" },
    image: { type: String, default: "/images/tablets-category.png" },
    attrs: [{ key: { type: String }, value: [{ type: String }] }],
});

uniformCategorySchema.index({ name: 1 })

const UniformCategory = mongoose.model("UniformCategory", uniformCategorySchema);
module.exports = UniformCategory;