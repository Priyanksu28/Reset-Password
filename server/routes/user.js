import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });
  await newUser.save();
  res.json({ status: true, message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: false, message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ status: false, message: "Invalid password" });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { maxAge: 360000, httpOnly: true });
  return res.json({ status: true, message: "Login successful", token });
});

router.post("/forgot-Password", async (req, res) => {
  console.log("📩 Forgot password request received", req.body);
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '15m' });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "t06983606@gmail.com",
        pass: "ejgg bool cawb hfmm",
      },
    });

    let mailOptions = {
      from: "t06983606@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ status: false, message: "Error sending email" });
      } else {
        return res.json({ status: true, message: "Password reset link sent to your email" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/reset-Password/:token", async (req, res) => {
  const {token} = req.params;
  const {password} = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({_id: id}, { password: hashpassword });
    return res.json({ status: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ status: false, message: "Invalid or expired token" });
    
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ status: true, message: "Logged out successfully" });
})
export { router as UserRouter };
