import mongoose from "mongoose";

// Connection string to the MONGO-DB database
const mongoURL =
  "mongodb+srv://mysticmak:mysticmak@cluster01.p7dox0c.mongodb.net/CRUD_database?retryWrites=true&w=majority&appName=Cluster01";

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
