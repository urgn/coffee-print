import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import config from "./config";
import { PORT_START } from "../src/config";
//import {secretCodeMiddleware} from './middlewares';

import imageRoute from "./routes/imageRoute";
import drinkRoute from "./routes/drinkRoute";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import storeRoute from "./routes/storeRoute";
import {getClientIP} from "./utils";

// Init app express
const app = express();
//CORS middleware
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Cache-Control, Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
mongoose.connect(config.MONGODB_OPTIONS.database);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
}
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

app.get('/client-ip', (req, res) => {
  res.json({ip: getClientIP(req)})
})

app.use("/drink", drinkRoute);
app.use("/image", imageRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/store", storeRoute);

app.get("*", (req ,res) => {
  console.log(__dirname);
  console.log(getClientIP(req));
  res.sendFile(path.join(__dirname,"../build/index.html"));
});

app.listen(PORT_START, () => {
  console.log(`listen on ${PORT_START}`);
});
