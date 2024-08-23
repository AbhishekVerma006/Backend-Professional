import { asyncHandler } from "../utils/asyncHandler";
import jsonwebtoken from "jsonwebtoken";
import {ApiError} from '../utils/ApiError';
import {User} from "../models/user.model";

export const verifyJWT = asyncHandler(async(req,_,next)=>{
    try {
        const token = res.cookies?.accessToken|| req.header("Authorization")?.replace("Bearer", "")
    
        if(!token){
            throw new ApiError(401,"Unauthorisation request")
        }
    
        const decodedToken = jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})