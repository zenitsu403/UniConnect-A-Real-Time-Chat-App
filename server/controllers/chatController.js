import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

const newGroupChat = TryCatch(async (req,res,next)=> {
    const {name,members} = req.body;

    if(members.length<2){
        return next(
            new ErrorHandler("Group Chat must have atleast 3 members",400)
        );
    }

    const allMembers = [...members,req.userId];

    await Chat.create({
        name: name,
        groupChat: true,
        creator: req.userId,
        members: allMembers
    });

    emitEvent(req,ALERT,allMembers,`Welcome to ${name} group!`);
    emitEvent(req,REFETCH_CHATS,members);

    return res.status(201).json({
        success: true,
        message: "Group Created"
    });

});

const getMyChat = TryCatch(async (req,res,next)=> {

    const chats = await Chat.find({ members: req.userId }).populate(
        "members",
        "name avatar"
    );

    const transformedChats = chats.map(({ _id,name,members,groupChat})=>{
        const otherMember = getOtherMember(members,req.userId);

        return {
            _id,
            groupChat,
            avatar: groupChat 
                ? members.slice(0,3).map(({avatar})=>avatar.url) 
                : [otherMember.avatar.url],
            name: groupChat ? name : otherMember.name,
            members: members.reduce((prev,curr) => {
                
                if(curr._id.toString() !== req.userId.toString()){
                    prev.push(curr._id);
                }
                return prev;
            },[])
        }
    });

    return res.status(200).json({
        success: true,
        chats: transformedChats
    });

});

const getMyGroups = TryCatch(async (req,res,next) => {

    const chats = await Chat.find({
        members: req.userId,
        groupChat: true,
        creator: req.userId
    }).populate("members","name avatar");

    const groups = chats.map(({_id,name,groupChat,members}) => ({
        _id,
        name,
        groupChat,
        avatar: members.slice(0,3).map(({avatar}) => avatar.url)
    }));

    res.status(200).json({
        success: true,
        groups
    });

});

const addMembers = TryCatch(async (req,res,next) => {

    const { chatId, members } = req.body;

    if(!members || members.length < 1)
        return next(new ErrorHandler("Please provide Members",400));

    const chat = await Chat.findById(chatId);
    if(!chat) return next(new ErrorHandler("Chat Not Found",404));

    if(!chat.groupChat) return next(new ErrorHandler("This is not a Group Chat",400));

    if(chat.creator.toString() !== req.userId.toString())
        return next(ErrorHandler("You are not allowed to add members",403));

    const allNewMembersPromise = members.map((i)=>User.findById(i,"name"));
    const allNewMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembers = allNewMembers
        .filter((i) => !chat.members.includes(i._id.toString()))
        .map((i) => i._id);

    chat.members.push(...uniqueMembers);

    if(chat.members.length > 100)
        return next(new ErrorHandler("Group Members limit reached"),400);

    await chat.save();

    const allUsersName = allNewMembers.map((i) => i.name).join(",");

    emitEvent(
        req,
        ALERT,
        chat.members,
        `${allUsersName} have been added in the group by ${req.userId.name}`
    );

    emitEvent(req,REFETCH_CHATS,chat.members);

    res.status(200).json({
        success: true,
        message: "Members added Successfully"
    });

});

export {newGroupChat, getMyChat, getMyGroups, addMembers};