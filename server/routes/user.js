import express from "express";
import { getProfile, login, logout, newUser, searchUser } from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post('/new',singleAvatar,newUser);
app.post('/login', login);

//only Authenticated users can now access this routes below
app.use(isAuthenticated);

app.get("/me",getProfile);
app.get("/logout",logout);
app.get("/search",searchUser);

export default app;