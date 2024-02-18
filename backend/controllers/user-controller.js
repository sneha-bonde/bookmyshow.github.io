import User from "../models/User";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ users });
};

export const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  const hashPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = new User({ name, email, password: hashPassword });
    user = await user.save();
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "unexpected Error Occured" });
  }
  return res.status(201).json({ user });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
let user;
try {
  user = await User.findByIdAndUpdate(id, {
    name,
    email,
    password,
  });
} catch (err) {
  return console.log(err);
}
if (!user){
return res.status(500).json({ message: "Something went wrong"})
}
res.status(200).json({ message: "Updated Sucessfully"});
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try{
    user = await User.findByIdAndRemove(id);
  }catch (err){
  console.log(err)  
  }
  if(!user){
    return res.status(500).json({ message: "Something went wrong"})
  }
  return res.status(200).json({message:"Delet Succesfully"});
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try{
  existingUser = await User.findOne({ email})
  } catch (err){
    return console.log(err);
  }

  if(!existingUser){
    return res
    .status(404)
    .json({ message: "Unable to find user from this Id"})
  }

  const isPasswordCorrect = bcyrpt.compareSync(password, existingUser.password);

  if(!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password"})
  }
  return res.status(200).json({message:"Login Succesfull"})
};

export const getBookingsoOfUser = async (req, res, next) => {
 const id = req.params.id;
 let bookings;
try{
  bookings = await bookings.find({ user: d })
}catch (err) {
return console.log(err);
}
if(!bookings) {
  return res.status(500).json({message:"unable to get booking"})
}
return res.status(200).json({ bookings })
}