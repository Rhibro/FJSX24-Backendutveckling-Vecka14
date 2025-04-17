const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");

let products = [
    {id: 1, name: "t-shirt", category: "top", price: 100},
    {id: 2, name: "sweater", category: "top", price: 200},
    {id: 3, name: "pants", category: "bottom", price: 4100},
    {id: 4, name: "shorts", category: "bottom", price: 32},
    {id: 5, name: "shoes", category: "accessory", price: 10},
    {id: 6, name: "backpack", category: "accessory", price: 1},
    {id: 7, name: "purse", category: "accessory", price: 90},
]

// get all products
router.get("/", (req, res) => {
    res.json(products);
})

// find a specfic product
router.get("/:id/categories", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            message: " Product not Found"
        });
    }
    res.json({
        category: product.category
    });
});

// create a product
router.post("/", (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1; // id creation
    products.push(newProduct);
    res.status(201)
    .json({
        message: "Product created", product: newProduct
    });
});

// update a product
router.put("/", (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found!"
        });
    }

    products[index] = {...products[index], ...req.body};
    res.json({
        message: `Product ${productId} updated`, product: products[index]
    });
});

// delete a product
router.delete("/:id", (req,res) => {
    res.json({
        message: `Product ${req.params.id} deleted`
    });
});

module.exports = router;