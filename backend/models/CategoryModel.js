const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  display: { type: Boolean, required: false},
  description: { type: String, default: "default category description" },
  image: { type: String, default: "/images/tablets-category.png" },
  attrs: [{ key: { type: String }, value: [{ type: String }] }],
});

categorySchema.index({name:1})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
