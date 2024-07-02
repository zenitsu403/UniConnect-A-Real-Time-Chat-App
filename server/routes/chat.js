import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chatController.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIDValidator, newGroupChatValidator, removeMemberValidator, renameGroupValidator, sendAttachmentsValidator, validationResultHandler } from "../lib/validators.js";

const app = express.Router();

//only Authenticated users can now access this routes below
app.use(isAuthenticated);

app.post("/new",newGroupChatValidator(),validationResultHandler,newGroupChat);

app.get("/my",getMyChat);

app.get("/my/groups",getMyGroups);

app.put("/addmembers",addMemberValidator(),validationResultHandler,addMembers);

app.put("/removemember",removeMemberValidator(),validationResultHandler,removeMember);

app.delete("/leave/:id",chatIDValidator(),validationResultHandler,leaveGroup);

app.post("/message",attachmentsMulter,sendAttachmentsValidator(),validationResultHandler,sendAttachments);

app.get("/message/:id",chatIDValidator(),validationResultHandler,getMessages);

//route chaining for similar routes having diff functionalties
app.route("/:id")
    .get(chatIDValidator(),validationResultHandler,getChatDetails)
    .put(renameGroupValidator(),validationResultHandler,renameGroup)
    .delete(chatIDValidator(),validationResultHandler,deleteChat); 

export default app;