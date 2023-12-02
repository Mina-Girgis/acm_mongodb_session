const express = require("express");
export const app = express();
const userRoute = require("./routes/userRoutes");

app.use(express.json());
app.use("/", userRoute);
