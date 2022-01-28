import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface TokenPayload {
  id: string,
  iat: number,
  exp: number
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, process.env.JWT_HASH_TOKEN)

    const { id } = data as TokenPayload

    req.userId = BigInt(id)

    return next()
  } catch (e) {
    return res.status(400).json({
      message: "Bad request",
      error: e
    })
  }
}
