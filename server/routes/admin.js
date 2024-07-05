import express from "express";
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from "../controllers/adminController.js";
import { adminLoginValidator, validationResultHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js"

const app = express.Router();

app.post("/verify",adminLoginValidator(),validationResultHandler,adminLogin);
app.get("/logout",adminLogout);

// Only admin can access this routes below
app.use(adminOnly);

app.get("/",getAdminData);

app.get("/chats",allChats);
app.get("/users",allUsers);
app.get("/messages",allMessages);

app.get("/stats",getDashboardStats);


export default app;