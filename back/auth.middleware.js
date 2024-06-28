import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//JSON web token secret key from environment variable
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

//middleware function to check authentication
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader); // Log auth header
  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1]; //splits in array as ['bearer',token]
  console.log("Token:", token); // Log token
  if (!token) {
    return res.status(401).json({ msg: "Token not provided" });
  }

  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET); // verifying token and known secret key
    console.log("Payload:", payload); // Log payload
    req.user = payload;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default auth;
