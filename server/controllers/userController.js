import { compare } from "bcrypt";
import { User } from "../models/userModel.js"
import { Chat } from "../models/chatModel.js";
import { Request } from "../models/requestModel.js";
import { sendToken,cookieOptions } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { emitEvent } from "../utils/features.js";
import { getOtherMember } from "../lib/helper.js";

const newUser = TryCatch(async (req,res) => {
    const { name,username,password,bio } = req.body;

    const file = req.file;

    if(!file) return next(new ErrorHandler("Please Upload Avatar",400));

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

const getProfile = TryCatch(async (req,res,next) => {
    const user = await User.findById(req.userId).select("-password");  // by default, select is like this only

    if(!user) return next(new ErrorHandler("User not Found!",404));

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
    // by default, name will be empty if not given
    const { name = "" } = req.query;

    const myChats = await Chat.find({groupChat: false, members: req.userId });

    // similar functions flatMap() and map().flat()
    // myChat.map((chat) => chat.members).flat();
    const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

    const allUsersExceptMeAndFriends = await User.find({
        _id: {$nin: allUsersFromMyChats},
        name: {$regex: name, $options: "i"},  // i means case insensitive and regex for pattern matching
    });

    const users = allUsersExceptMeAndFriends.map(({_id, name, avatar}) => ({
        _id,
        name,
        avatar: avatar.url,
    }));

    return res.status(200).json({
        success: true,
        users,
    });
});

const sendFriendRequest = TryCatch(async (req,res,next) => {

    const { receiverId } = req.body;

    const request = await Request.findOne({
        $or: [
            {sender: req.userId, receiver: receiverId},
            {sender: receiverId, receiver: req.userId},
        ]
    });

    if(request) return next(new ErrorHandler("Request already sent!",400));

    await Request.create({
        sender: req.userId,
        receiver: receiverId,
    });

    emitEvent(req,NEW_REQUEST,[receiverId]);

    return res.status(200).json({
        success: true,
        message: "Friend Request Sent",
    });
});

const acceptFriendRequest = TryCatch(async (req,res,next) => {

    const { requestId,accept } = req.body;
    const request = await Request.findById(requestId)
        .populate("sender","name")
        .populate("receiver","name");

    if(!request) return next(new ErrorHandler("Request Not Found",404));

    if(request.receiver._id.toString() !== req.userId.toString())
        return next(new ErrorHandler("You are not authorized to accept this request", 401));

    if(!accept){
        await request.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Friend Request Rejected!"
        });
    }

    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
        Chat.create({
            members,
            name: `${request.sender.name}-${request.receiver.name}`,
        }),
        request.deleteOne()
    ]);

    emitEvent(req,REFETCH_CHATS,members);

    return res.status(200).json({
        success: true,
        message: "Friend Request Accepted!",
        senderId: request.sender._id,
    });
});

const getMyNotifications = TryCatch(async (req,res) => {
    
    const requests = await Request.find({receiver: req.userId}).populate("sender","name avatar");

    const allRequests = requests.map(({_id,sender}) => ({
        _id,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
        },
    }));

    return res.status(200).json({
        success: true,
        allRequests,
    });
});

const getMyFriends = TryCatch(async (req,res,next) => {
    
    const chatId = req.query.chatId;
    const myChats = await Chat.find({
        members: req.userId,
        groupChat: false,
    }).populate("members","name avatar");

    const myFriends = myChats.map(({ members }) => {
        const otherUser = getOtherMember(members,req.userId);
        return{
            _id: otherUser._id,
            name: otherUser.name,
            avatar: otherUser.avatar.url,
        }
    });

    if(chatId){
        const chat = await Chat.findById(chatId);
        const availableFriends = myFriends.filter(
            (friend) => !chat.members.includes(friend._id)
        );
        return res.status(200).json({
            success: true,
            friends: availableFriends,
        });
    }
    else{
        return res.status(200).json({
            success: true,
            myFriends,
        });
    }
});

export {login, logout, newUser, getProfile, searchUser, sendFriendRequest, acceptFriendRequest, getMyNotifications, getMyFriends };