import express from "express";
import userRoute from "./routes/user.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

const app = express();

//using Middlewares here
app.use(express.json());

app.use("/user",userRoute);

app.get('/',(req,res) => {
    res.send("Home");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})