import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import RefreshModel from "../models/refreshToken.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const allowedOrigins = [
  "https://teacher-student-db.netlify.app/", // Your actual frontend URL
  "http://localhost:3000", // Local development URL
];

// Use CORS middleware with options
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allows cookies to be sent with requests
    preflightContinue: false,
    optionsSuccessStatus: 204, // Some legacy browsers choke on 204
  })
);

const User = mongoose.model("usersinfo");

//To Register User
export const handleRegister = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, async (error, user) => {
    if (user) {
      res.send({ status: "user already exist" });
    } else {
      try {
        await User.create({
          type: "user",
          name,
          email,
          password,
        });

        res.send({ status: "registered successfully" });
      } catch (error) {
        res.send({ status: "something wrong occured" });
      }
    }
  });
};

//To Login User
export const handleLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        const accessToken = jwt.sign(
          {
            name: user.name,
            email: user.email,
            _id: user._id,
            createdAt: Date.now(),
          },
          JWT_ACCESS_SECRET,
          { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
          {
            name: user.name,
            email: user.email,
            _id: user._id,
            createdAt: Date.now(),
          },
          JWT_REFRESH_SECRET,
          { expiresIn: "1d" }
        );
        RefreshModel.create({ token: refreshToken }).then((result, error) => {
          if (error) return res.send({ status: "incorrect password" });
        });

        // Set cookies for accessToken and refreshToken
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true, // Ensure cookies are only sent over HTTPS
          sameSite: "None", // Required for cross-site cookies
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });

        res.send({ status: "login successful", accessToken, refreshToken });
      } else {
        res.send({ status: "incorrect password" });
      }
    } else {
      res.send({ status: "user not found" });
    }
  });
};

//To Logout the user
export const handleLogout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).send({ status: "No refresh token provided" });
  }

  try {
    await RefreshModel.findOneAndDelete({ token: refreshToken });

    // Clear the cookies
    res.clearCookie("accessToken", { sameSite: "None", secure: true });
    res.clearCookie("refreshToken", { sameSite: "None", secure: true });

    // Set CORS headers correctly for cross-origin requests
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://teacher-student-db.netlify.app"
    );
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.send({ status: "logout successful" });
  } catch (err) {
    res.status(500).send({ status: "Error logging out", message: err.message });
  }
};

//To handle refresh of cookies after expiration
export const handleRefresh = async (req, res) => {
  let refreshToken;
  try {
    refreshToken = await RefreshModel.findOne({ token: req.body.refreshToken });
    if (!refreshToken) {
      return res.status(400).json({ status: "error" });
    }
    const decoded = jwt.verify(req.body.refreshToken, JWT_REFRESH_SECRET);
    const payload = {
      _id: decoded._id,
      name: decoded.name,
      email: decoded.email,
      createdAt: Date.now(),
    };
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "1d" });
    await RefreshModel.create({ token: refreshToken });
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    return res.status(400).json({ status: "error" });
  }
};
