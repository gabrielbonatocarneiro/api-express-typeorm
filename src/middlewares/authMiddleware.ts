import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.JWT_HASH_TOKEN);

    const { id } = data as TokenPayload;

    req.userId = BigInt(id);

    return next();
  } catch (e) {
    return res.status(400).json({
      message: "Bad request",
      error: e,
    });
  }
}
