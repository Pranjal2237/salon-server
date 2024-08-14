import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      password:passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ user,token });
  } catch (error) {
    console.log(error);
  }
};

export const getUser=async(req,res)=>{
  try {
    const user=await User.findById({_id:req.user.id});
    if(!user)
    {
      res.status(404).json({message:"Access Denied!"})
    }
    res.status(200).json({user});

  } catch (error) {
    console.log(error);
  }
}
