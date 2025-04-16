require("dotenv").config();

const port = process.env.PORT || 3000;
const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

// import and use the orders router
const ordersRouter = require("./routes/orders");
app.use("/orders", ordersRouter);


app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
})
