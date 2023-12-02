"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
exports.app = express();
const userRoute = require("./routes/userRoutes");
exports.app.use(express.json());
exports.app.use("/", userRoute);
