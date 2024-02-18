import express from 'express';
import { getBookingById, newBooking } from '../controllers/booking-controller';

const bookingsRouter = express.Router();


bookingsRouter.get("/", getBookingById)
bookingsRouter.post('/',newBooking);
bookingsRouter.delete("/:id");

export default bookingsRouter;