import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import router from "./router/route";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");


app.get("/", (req, res) => {
  res.status(201).json("home get");
});

app.use("/api", router);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server have started to http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("some error occured", err));
