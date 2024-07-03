import express from "express";
import { acceptFriendRequest, getMyFriends, getMyNotifications, getProfile, login, logout, newUser, searchUser, sendFriendRequest } from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptFriendRequestValidator, loginValidator, registerValidator, sendFriendRequestValidator, validationResultHandler } from "../lib/validators.js";

const app = express.Router();

app.post('/new',singleAvatar,registerValidator(),validationResultHandler,newUser);
app.post('/login',loginValidator(), validationResultHandler, login);

//only Authenticated users can now access this routes below
app.use(isAuthenticated);

app.get("/me",getProfile);
app.get("/logout",logout);
app.get("/search",searchUser);
app.put("/sendrequest",sendFriendRequestValidator(),validationResultHandler,sendFriendRequest);
app.put("/acceptrequest",acceptFriendRequestValidator(),validationResultHandler,acceptFriendRequest);
app.get("/notifications",getMyNotifications);
app.get("/friends",getMyFriends);

export default app;