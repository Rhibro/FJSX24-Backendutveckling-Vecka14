require("dotenv").config();

const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const categoriesRouter = require("./routes/categories");
const ordersRouter = require("./routes/orders");
const authenticate = require("./middleware/auth");
const productsRouter = require("./routes/products");

// middleware for parsing JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

// global auth for POST/PUT/DELETE
app.use("/authenticate",(req, res, next) => {
    const method = req.method.toLocaleLowerCase();
    if (["post", "put", "delete"].includes(method)) {
        return authenticate(req, res, next);
    }
    next();
});

// import products
app.use("/products", productsRouter);

// import and use categories router
app.use("/categories", categoriesRouter);

// import and use the orders router
app.use("/orders", ordersRouter);

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
})
