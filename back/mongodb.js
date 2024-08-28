import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Connection string to the MONGO-DB database
const mongoURL = process.env.MONGO_URL;

const mongodb = () => {
  mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("conncted to db");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default mongodb;
