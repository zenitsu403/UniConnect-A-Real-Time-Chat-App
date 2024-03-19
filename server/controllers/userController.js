import { compare } from "bcrypt";
import { User } from "../models/userModel.js"
import { sendToken,cookieOptions } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

const newUser = TryCatch(async (req,res) => {
    const { name,username,password,bio } = req.body;
    const avatar = {
        public_id: "asdfg",
        url: "asdfg"
    };

    const user = await User.create({
        name: name,
        username: username,
        password: password,
        bio: bio,
        avatar: avatar
    });

    sendToken(res,user,201,"User created");
});

const login = TryCatch(async (req,res,next) => {
    const { username, password } = req.body;

    const user = await User.findOne({username}).select("+password");
    if(!user) return next(new ErrorHandler("Invalid username or password",404));

    const isPasswordMatch = await compare(password,user.password);
    if(!isPasswordMatch) return next(new ErrorHandler("Invalid username or password",404));

    sendToken(res,user,200,`Welcome Back, ${user.name}`);
});

const getProfile = TryCatch(async (req,res) => {
    const user = await User.findById(req.userId).select("-password");  // by default, select is like this only

    res.status(200).json({
        success: true,
        user
    });
});

const logout = TryCatch(async (req,res) => {
    return res
        .status(200)
        .cookie("uniconnect-token","",{...cookieOptions , maxAge: 0})
        .json({
        success: true,
        message: "Logout Successfully"
    });
});

const searchUser = TryCatch(async (req,res) => {
    const {name} = req.query;

    return res
        .status(200)
        .json({
        success: true,
        message: name
    });
});

export {login, logout, newUser, getProfile, searchUser};