import { Request } from "express";

export interface User {
  id: string;
  firstname: string;
  email: string;
  password: string;
  role: string;
}
export interface LoginUser extends Request {
  email: string;
  password: string;
}

export interface IUserDetails{
  id: string;
  firstname: string;
  email: string;
  password: string;
  role: string;
  isDeleted: 0 | 1
  
}
