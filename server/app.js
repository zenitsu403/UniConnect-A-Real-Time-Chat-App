import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import {v4 as uuid} from "uuid"
import { getSockets } from "./lib/helper.js"
import { Message } from "./models/messageModel.js";
import cors from "cors";
import { createUser } from "./seeders/userSeed.js";


import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";


dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const mongoURI = process.env.MONGO_URI;
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "mukund";
const userSocketIDs = new Map();

connectDB(mongoURI);

//Seeds for populating database
//createUser(10);

const app = express();
const server = createServer(app);
const io = new Server(server,{});

//using Middlewares here
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.CLIENT_URL,
    ],
    credentials: true,
}));

// Routes here
app.use("/api/v1/user",userRoute);
app.use("/api/v1/chat",chatRoute);
app.use("/api/v1/admin",adminRoute);

app.get('/',(req,res) => {
    res.send("Home");
});

io.use((socket,next) => {});

io.on("connection",(socket) => {
    const user = {
        _id: "65fb50acf5958a76d389d65d",
        name: "Mukund"
    }
    userSocketIDs.set(user._id.toString(),socket.id);
    console.log("User Connected",socket.id);

    socket.on(NEW_MESSAGE,async({chatId,members,message}) => {
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        }

        const meassageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        }

        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(NEW_MESSAGE,{
            chatId,
            message: messageForRealTime,
        });
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{chatId});

        try {
            await Message.create(meassageForDB);
        } catch (err) {
            console.log(err);
        }
    })

    socket.on("disconnect",() => {
        console.log("User Disconnected");
        userSocketIDs.delete(user._id.toString());
    })
});

app.use(errorMiddleware);

server.listen(port, () => {
    console.log(`Server is running on port ${port} in ${envMode} MODE`);
});

export { envMode, adminSecretKey, userSocketIDs };