import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";
import { Message } from "../models/messageModel.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

const newGroupChat = TryCatch(async (req,res,next)=> {
    const {name,members} = req.body;

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

const removeMember = TryCatch(async (req,res,next) => {
    const {userId, chatId} = req.body;
    const [chat,userToRemove] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId,"name")
    ]);

    if(!chat) return next(new ErrorHandler("Chat Not Found",404));

    if(!chat.groupChat) return next(new ErrorHandler("This is not a Group Chat",400));

    if(chat.creator.toString() !== req.userId.toString())
        return next(ErrorHandler("You are not allowed to remove members",403));

    if(chat.members.length<=3){
        return next(
            new ErrorHandler("Group Chat must have atleast 3 members",400)
        );
    }

    chat.members = chat.members.filter(
        (member) => member.toString() !== userId.toString()
    );

    await chat.save();

    emitEvent(
        req,
        ALERT,
        chat.members,
        `${userToRemove} has been removed from the group`
    );

    emitEvent(req,REFETCH_CHATS,chat.members);

    return res.status(200).json({
        success: true,
        message: "Member Removed Successfully!"
    });

});

const leaveGroup = TryCatch(async (req,res,next) => {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);


    if(!chat) return next(new ErrorHandler("Chat Not Found",404));

    if(!chat.groupChat) return next(new ErrorHandler("This is not a Group Chat",400));

    const remainingMembers = chat.members.filter(
        (member) => member.toString() !== req.userId.toString()
    );
    
    if(remainingMembers.length<3){
        return next(
            new ErrorHandler("Group must have atleast 3 members!",400)
        );
    }

    if(chat.creator.toString() === req.userId.toString()){
        const randomElement = Math.floor(Math.random()*remainingMembers.length);
        const newCreator = remainingMembers[randomElement];
        chat.creator = newCreator;
    }

    chat.members = remainingMembers;

    const [user] = await Promise.all([User.findById(req.userId,"name"),chat.save()]);

    emitEvent(
        req,
        ALERT,
        chat.members,
        `${user.name} has left the group!`
    );

    emitEvent(req,REFETCH_CHATS,chat.members);

    return res.status(200).json({
        success: true,
        message: "Member Removed Successfully!"
    });

});

const sendAttachments = TryCatch(async (req,res,next)=> {

    const {chatId} = req.body;

    const [chat,me] = await Promise.all([
        Chat.findById(chatId),
        User.findById(req.userId,"name")
    ]);

    if(!chat) return next(new ErrorHandler("Chat not Found!",404));

    const files = req.files || [];

    if(files.length<1) return next(new ErrorHandler("Please provide attachments",400));

    // upload files here

    const attachments = [];

    const messageForRealTime = {
        content: "",
        attachments,
        sender:{
            _id: me._id,
            name: me.name,
        },
        chat: chatId,
    };

    const messageForDB = {content: "", attachments, sender: me._id, chat: chatId};

    const message = await Message.create(messageForDB);

    emitEvent(req,NEW_ATTACHMENT,chat.members,{
        message: messageForRealTime,
        chatId,
    });

    emitEvent(req,NEW_MESSAGE_ALERT,chat.members,{chatId});
    
    return res.status(200).json({
        success: true,
        message
    });

});

const getChatDetails = TryCatch(async (req,res,next)=> {
    
    if(req.query.populate === "true"){
        const chat = await Chat.findById(req.params.id).populate("members","name avatar").lean();
        // lean() will treat chat object as normal js object rather than a mongoose obj and will not save changes in database

        if(!chat) return next(new ErrorHandler("Chat not Found!",404));

        //this modification will not be reflected in database
        chat.members = chat.members.map(({_id,name,avatar}) => ({_id,name,avatar: avatar.url}));

        return res.status(200).json({
            success: true,
            chat,
        });
    }
    else{
        const chat = await Chat.findById(req.params.id);

        if(!chat) return next(new ErrorHandler("Chat not Found!",404));

        return res.status(200).json({
            success: true,
            chat,
        });
    }

});

const renameGroup = TryCatch(async (req,res,next) => {

    const chatId = req.params.id;
    const {name} = req.body;

    const chat = await Chat.findById(chatId);
    if(!chat) return next(new ErrorHandler("Chat not Found!",404));

    if(!chat.groupChat) return next(new ErrorHandler("This is Not a Group Chat",400));

    if(chat.creator.toString() !== req.userId.toString()){
        return next(new ErrorHandler("Forbidden! Only Group Admin can rename ",403));
    }

    chat.name = name;

    await chat.save();

    emitEvent(req,REFETCH_CHATS,chat.members);

    res.status(200).json({
        success: true,
        message: "Group renamed succesfully!"
    });

});

const deleteChat = TryCatch(async (req,res,next) => {

    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if(!chat) return next(new ErrorHandler("Chat not Found!",404));

    const members = chat.members;

    if(chat.groupChat && chat.creator.toString() !== req.userId.toString()){
        return next(new ErrorHandler("Forbidden! Only Group Admin can delete group ",403));
    }

    if(!chat.groupChat && !chat.members.includes(req.userId.toString())){
        return next(new ErrorHandler("Forbidden! You are not allowed to delete the chat ",403));
    }

    // delete all messages and all attachments from cloudinary
    
    const messageWithAttachments = await Message.find({chat: chatId,attachments: {$exists: true, $ne: []}});

    const public_ids = [];

    messageWithAttachments.forEach(({attachments}) => 
        attachments.forEach(({public_id}) => public_ids.push(public_id))
    );

    await Promise.all([
        deleteFilesFromCloudinary(public_ids),
        chat.deleteOne(),
        Message.deleteMany({chat: chatId}),
    ]);

    emitEvent(req,REFETCH_CHATS,members);

    res.status(200).json({
        success: true,
        message: "Chat Deleted succesfully!"
    });

});

const getMessages = TryCatch(async (req,res,next)=> {
    const chatId = req.params.id;
    const { page=1 } = req.query;
    const resultPerPage = 20;
    const skip = (page-1)*resultPerPage;

    const [ messages,totalMsgCnt ] = await Promise.all([
        Message.find({chat: chatId})
            .sort({createdAt: -1})   // sorting in descending order on basis of createdAt field
            .skip(skip)
            .limit(resultPerPage)
            .populate("sender","name")
            .lean(),
        Message.countDocuments({chat: chatId}),
    ]);

    const totalPages = Math.ceil(totalMsgCnt/resultPerPage);

    return res.status(200).json({
        success: true,
        messages: messages.reverse(),
        totalPages
    });
});

export {newGroupChat, getMyChat, getMyGroups, addMembers, removeMember, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat,getMessages};