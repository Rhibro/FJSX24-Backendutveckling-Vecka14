import express from "express"
import dotenv from "dotenv";
import hello from "./hello.js";
import { updateVersion } from "./jsonHandler.js";

dotenv.config();

// const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const userName = process.env.USERNAME || "unknown user";
const jsonHandler = require('./jsonHandler.js');

updateVersion();

app.get("/", (req, res) => {
    res.send(hello(userName));
});

app.listen(port, () => {
    console.log(`Server runs on: http://localhost:${port}`);
});