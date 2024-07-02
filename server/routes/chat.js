import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chatController.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const app = express.Router();

//only Authenticated users can now access this routes below
app.use(isAuthenticated);

app.post("/new",newGroupChat);
app.get("/my",getMyChat);
app.get("/my/groups",getMyGroups);
app.put("/addmembers",addMembers);
app.put("/removemember",removeMember);
app.delete("/leave/:id",leaveGroup);
app.post("/message",attachmentsMulter,sendAttachments);
app.get("/message/:id",getMessages);
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat); //route chaining for similar routes having diff functionalties

export default app;