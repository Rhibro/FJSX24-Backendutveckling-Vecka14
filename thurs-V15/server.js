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

//Lätta Övningar:
//1: /api/welcome – Returnera en hälsning med res.header():
app.get("/api/welcome", (req, res) => {
    res.header("Hello from the server!");
    res.send("Hello from api!");
});

//2: /api/headers – Returnera alla inkommande headers.
app.get("/api/header", (req, res) => {
    console.log(req.headers);
    res.json(req.headers)
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