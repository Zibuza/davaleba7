const {default: mongoose} = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: {type: String, require: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true}
})

const Product = mongoose.model("Product", productsSchema)

module.exports = Product