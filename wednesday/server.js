import express from "express"
import dotenv from "dotenv";
import hello from "./hello.js";
// import greetings from "./greetings";
// import {config} from './node_modules/dotenv/lib/main.d.ts';

dotenv.config();

// const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const userName = process.env.USERNAME || "unknown user";

app.get("/", (req, res) => {
    res.send(hello(userName));
});

app.listen(port, () => {
    console.log(`Server runs on: http://localhost:${port}`);
});