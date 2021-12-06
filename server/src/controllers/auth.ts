import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';

dotenv.config();

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("authtoken");
  if (!token || token === "null") {
    return res.status(401).send("Restricted Area");
  }

  try {
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET as string);
    req.user = userVerified;
    next();
  } catch (err) {
    return res.status(401).send("Restricted Area");
  }
};

export default auth;
