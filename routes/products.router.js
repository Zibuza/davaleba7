const { Router } = require("express");
const productsRouter = Router();
const Product = require("../models/product.model");
const { isValidObjectId } = require("mongoose");


productsRouter.get("/", async (req, res) => {
    try {
        let { page, limit } = req.query;

        page = parseInt(page) || 1;  
        limit = parseInt(limit) || 10; 

        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments();

        res.json({
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            products
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});


productsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    if (isValidObjectId(id)) {
        const product = await Product.findById(id)
        res.json(product)
        
    }else{
        res.status(200).json({message: "invalid ID"}) 
    }

})

productsRouter.post("/", async (req, res) => {
    const { name, price, stock } = req.body
    if (!name || !price || !stock) {
        return res.status(400).json({ message: "name, price, stock is required" })
    }

    await Product.create({ name, price, stock })
    res.status(201).json({ message: "product created successfully" })
})

productsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    if (isValidObjectId(id)) {
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({ message: "delated successfullt", product })
    } else {
        res.status(400).json({ message: "Invalid ID" })
    }

})

productsRouter.put("/:id", async (req, res) => {
    const { id } = req.params
    if (isValidObjectId(id)) {
        const updatedUser = await Product.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ message: "updated successfully", updatedUser })

    } else {
        res.status(400).json({ message: "Invalid ID" })
    }
})
module.exports = productsRouter;
