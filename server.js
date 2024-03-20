import express from "express";
import cors from "cors";
import path from "path";
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

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "/client/dist")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
}

//Error handling middleware
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port: ${port}`));