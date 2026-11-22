import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: number };
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in .env");
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Access denied. No valid token provided."
        })
    }

  const token = authHeader.split(" ")[1]

  try { 
       const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
       req.user = { id: decoded.id };
       next();
} catch { 
    return res.status(401).json( "Invalid or expired token" )}
};