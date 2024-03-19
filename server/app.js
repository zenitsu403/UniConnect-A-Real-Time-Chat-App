import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createUser } from "./seeders/userSeed.js";


import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";


dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

//Seeds for populating database
//createUser(10);

const app = express();

//using Middlewares here
app.use(express.json());
app.use(cookieParser());

// Routes here
app.use("/user",userRoute);
app.use("/chat",chatRoute);

app.get('/',(req,res) => {
    res.send("Home");
});

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});