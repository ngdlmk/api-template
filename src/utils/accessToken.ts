import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // No token
  const secret = process.env.JWT_SECRET_KEY
    ? process.env.JWT_SECRET_KEY
    : "my super secret key";
  jwt.verify(token, secret, (err) => {
    if (err) return res.sendStatus(403); // Invalid token
    next();
  });
}

export function generateAccessToken(userId: mongoose.Types.ObjectId) {
  const expiresIn = 100 * 365 * 24 * 60 * 60; // 100 years in seconds
  const secret = process.env.JWT_SECRET_KEY
    ? process.env.JWT_SECRET_KEY
    : "my super secret key";
  return jwt.sign({ userId }, secret, {
    expiresIn,
  });
}

export function generateTestAccessToken() {
  const expiresIn = 100 * 365 * 24 * 60 * 60; // 100 years in seconds
  const secret = process.env.JWT_SECRET_KEY
    ? process.env.JWT_SECRET_KEY
    : "my super secret key";
  return jwt.sign({ username: "hattorihanzo" }, secret, {
    expiresIn,
  });
}
