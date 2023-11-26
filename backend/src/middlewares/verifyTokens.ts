import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/userInterface";

dotenv.config();

export interface ExtendedUser extends Request {
  info?: User;
}

export const verifyToken = (
  req: ExtendedUser,
  res: Response,
  privilege  :false |'admin'=false
  // next: NextFunction
) => {
  try {
    const token = req.headers["token"] as string;

    if (!token) {
      return res.status(401).json({
        message: "You do not have access",
      });
    }

    const decodedUserData = jwt.verify(token, process.env.SECRET_KEY as string) as User;

    req.info = decodedUserData;
    if(privilege&&decodedUserData.role !==privilege){
      return res.status(401).json({message:"Unauthorised"})
    }
  } catch (error:any) {
    return res.json({
      message: error.message,
    });
  }
  return false

  
};

export const accountRequired =(req:ExtendedUser, res:Response, next:NextFunction)=>{
  const error = verifyToken(req, res)
  if (error) {return error}
  next()
}

export const adminPrivilege=(req:ExtendedUser,res:Response,next:NextFunction)=>{
  const error=verifyToken(req,res,'admin')
  if (error) {return error}
  next()

}