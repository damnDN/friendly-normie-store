//packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

//Files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

//configuration?
dotenv.config();
connectDB();

const app = express();

//middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//Routes
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend connected",
    well: "well well well",
  });
});
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
