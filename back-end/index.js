import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "../back-end/lib/db.js";
import signUpRoute from "../back-end/routes/signUpRoute.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

const port = process.env.PORT || 4090;
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(fileUpload({ useTempFiles: true }));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETE,
});
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "server is live" });
});
app.use("/api/users", signUpRoute);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`http://localhost:${port}`);
      });
    } catch (error) {
      console.log("can not connect to server" + error.message);
    }
  })
  .catch((error) => {
    console.log("invalid database connection" + error.message);
  });
