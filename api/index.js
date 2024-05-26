import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Mongo_db is connected");
  })
  .catch((e) => {
    console.log(e);
  });

// Api Routing
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(3000, () => {
  console.log(` server is running in 3000`);
});
