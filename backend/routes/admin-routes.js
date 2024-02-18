import express from 'express'
import { addAdmin } from '../models/Admin';

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", addAdminLogin);
adminRouter.post("/", getAdmins);

export default adminRouter;