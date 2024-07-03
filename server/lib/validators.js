import { body,validationResult,check, param } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validationResultHandler = (req,res,next) => {
    const errors = validationResult(req);
    const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
    
    if(errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages,400));
}

const registerValidator = () => [
    body("name","Please enter name").notEmpty(),
    body("username","Please enter username").notEmpty(),
    body("password","Please enter password").notEmpty(),
    body("bio","Please enter bio").notEmpty(),
    check("avatar","Please upload avatar").notEmpty(),
];

const loginValidator = () => [
    body("username","Please enter username").notEmpty(),
    body("password","Please enter password").notEmpty(),
];

const newGroupChatValidator = () => [
    body("name","Please enter name").notEmpty(),
    body("members")
        .notEmpty().withMessage("Please enter Members")
        .isArray({min: 2, max: 100}).withMessage("Members must be between 2-100"),
];

const addMemberValidator = () => [
    body("chatId","Please enter Chat ID").notEmpty(),
    body("members")
        .notEmpty().withMessage("Please enter Members")
        .isArray({min: 1, max: 97}).withMessage("Members must be between 1-97"),
];

const removeMemberValidator = () => [
    body("chatId","Please enter Chat ID").notEmpty(),
    body("userId","Please enter User ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
    body("chatId","Please enter Chat ID").notEmpty(),
    check("files")
        .notEmpty().withMessage("Please upload Attachments")
        .isArray({min: 1, max: 5}).withMessage("Attachments must be between 1-5"),
];

const chatIDValidator = () => [param("id","Please enter Chat ID").notEmpty()];

const renameGroupValidator = () => [
    param("id","Please enter Chat ID").notEmpty(),
    body("name","Please enter new name").notEmpty(),
];

const sendFriendRequestValidator = () => [
    body("receiverId","Please enter Receiver's User ID").notEmpty(),
];

const acceptFriendRequestValidator = () => [
    body("requestId","Please enter Request ID").notEmpty(),
    body("accept")
        .notEmpty().withMessage("Please add Accept")
        .isBoolean().withMessage("Accept must be Boolean"),
];

export { registerValidator, validationResultHandler, loginValidator, newGroupChatValidator, addMemberValidator, removeMemberValidator, sendAttachmentsValidator, chatIDValidator, renameGroupValidator, sendFriendRequestValidator, acceptFriendRequestValidator };

