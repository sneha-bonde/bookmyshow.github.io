import mongoose from "mongoose";
import Booking from "../models/Booking";

export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await user.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given Id " });
  }
  if (!user) {
    return res.status(404).json({ message: "user not found with given id" });
  }

  let booking;

  try {
    booking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.booking.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({ session });
    await existingUser.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!newBooking) {
    return res.status(500).json({ message: "unable to create booking" });
  }
  return res.status(201).json({ booking: newBooking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};

export  const deleteBooking = async () =>{
const id = req.params.id;
let booking;
try {
  booking = await Bookings.findByIdAndRemove(id).populate("user movie");
  const id = req.params.id;
  session.startTranscation();
  await booking.user.bookings.pull(booking);
  await booking.movie.bookings.pull(booking);
  await booking .user.save({ session })
  session.console.log(err);
} catch (err) {
  return console.log(err);
}
if (!booking) {
  return res.status(500).json({ message: "Unexpected Error" });
}
return res.status(200).json({ booking });
}

// export const deleteBooking = async () => {
//   const id = req.params.id;
//   let booking;
//   try {
//     booking = await Bookings.findByAndRemove().populate("user movie")
//     const session = await mongoose.startSession();
//     session.startTranscation();
//    await booking.user.bookings.pull(booking);
//     await booking.movie.booking.pull(booking)
//     await booking.movie.save({ session })
//     await booking.user.save({ session })
//     session.commitTransaction();
//   } catch (err) {
//     return console.log(err)
//   }
//   if (!booking) {
//     return res.status(500).json({ message: "Unexpected Error" });
//   }
//   return res.status(200).json({ booking });
// }