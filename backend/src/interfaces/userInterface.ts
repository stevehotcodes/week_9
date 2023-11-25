import { Request } from "express";

export interface User {
  customer_id: string;
  firstname: string;
  email: string;
  password: string;
  role: string;
}
export interface LoginUser extends Request {
  email: string;
  password: string;
}
