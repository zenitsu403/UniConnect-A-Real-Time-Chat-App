import { adminSecretKey } from "../app.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

const isAuthenticated = (req,res,next)=> {
    const token = req.cookies["uniconnect-token"];
    if(!token) return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.userId = decodedData._id;  //custom key-value pair in request body
    next();
};

const adminOnly = (req,res,next)=> {
    const token = req.cookies["uniconnect-admin-token"];
    if(!token) return next(new ErrorHandler("Only admin can access this route", 401));

    const secretKey = jwt.verify(token,process.env.JWT_SECRET);
    
    const isMatched = secretKey === adminSecretKey;

    if(!isMatched) return next(new ErrorHandler("Only admin can access this route",401));

    next();
};

export { isAuthenticated, adminOnly };