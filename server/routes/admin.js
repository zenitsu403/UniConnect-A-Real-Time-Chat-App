import express from "express";
import { allChats, allMessages, allUsers, getDashboardStats } from "../controllers/adminController.js";

const app = express.Router();

app.get("/");
app.post("/verify");
app.get("/logout");

app.get("/chats",allChats);
app.get("/users",allUsers);
app.get("/messages",allMessages);

app.get("/stats",getDashboardStats);


export default app;