import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
//OKlp61KcizLvveTC

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Mongo_db is connected");
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(3000, () => {
  console.log(` server is running in 3000`);
});
