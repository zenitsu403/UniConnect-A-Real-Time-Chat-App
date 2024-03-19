import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat } from "../controllers/chatController.js";

const app = express.Router();

//only Authenticated users can now access this routes below
app.use(isAuthenticated);

app.post("/new",newGroupChat);

export default app;