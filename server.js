import express from "express";
import cors from "cors";
import connectDB from "./config/mongoose.js";

connectDB();

const app = express();

//Root Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running...");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port: ${port}`));