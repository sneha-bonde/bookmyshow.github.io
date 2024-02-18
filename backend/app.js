import express from "express";
import mongoose from "mongoose";
import bcypt from "bcryptjs";
import dotenv from "dotenv";
import userRouter from './routes/user-routes.js'

dotenv.config();
const app = express();


//middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", userRouter);
app.use("/movie, adminRouter");
 
mongoose
  .connect(
    `mongodb+srv://snehabonde77:${process.env.MONGODB_PASSWORD}@cluster0.uchtrmm.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("connected to database and server is running")
    )
  )
  .catch((e) => console.log(e));
