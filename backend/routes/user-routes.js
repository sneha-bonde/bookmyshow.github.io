import express from "express";
import { getAllUsers, getBookingsoOfUser } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/",getAllUsers);
userRouter.post("/signup", signup);
userRouter.put("/:id ", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsoOfUser);

export default userRouter;