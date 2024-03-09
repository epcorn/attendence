import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import rootRouter from "./routes/index.js";
import connectDB from "./config/mongoose.js";
import errorMiddleware from './middleware/errorMiddleware.js';

connectDB();

const app = express();

//Root Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", rootRouter);

//Error handling middleware
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port: ${port}`));