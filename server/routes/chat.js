import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getMyChat, getMyGroups, newGroupChat } from "../controllers/chatController.js";

const app = express.Router();

//only Authenticated users can now access this routes below
app.use(isAuthenticated);

app.post("/new",newGroupChat);
app.get("/my",getMyChat);
app.get("/my/groups",getMyGroups);
app.put("/addmembers",addMembers);

export default app;