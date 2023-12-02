import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../src/.env" });
import mongoose from "mongoose";
import { app } from "./app";

const portNumber = process.env.PORT;
const connectionStr = process.env.DATABASE_LINK!.replace(
  "<password>",
  process.env.DATABSE_PASSWORD!
);
mongoose.connect(connectionStr).then((value) => {
  console.log("Database connected successfully");
});

const server = app.listen(portNumber, () => {
  console.log("listening on port " + portNumber);
});
