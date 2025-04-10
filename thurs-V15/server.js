import express from "express";
import morgan from "morgan";

import { logRequests } from "./logger.js";
import errorHandler from "./errorHandling.js";
import requestCounter from "./requestCounter.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("hello!");
})

app.use(morgan("dev"));

app.use(logRequests);

app.use(requestCounter);

app.get("/error", (req, res) => {
    throw new Error("Simulate Error")
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})