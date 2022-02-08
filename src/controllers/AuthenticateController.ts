import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserService } from "./../services/UserService";
import { ApiException } from "../exceptions/ApiException";

export class AuthenticateController {
  async login(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body;

    const result = await new UserService().login({ email, password });

    if (result instanceof Error) {
      return new ApiException(response).handle(400, result.message);
    }

    const token = jwt.sign({ id: result.user_id }, process.env.JWT_HASH_TOKEN, {
      expiresIn: "1h",
    });

    return response.json({
      user: result,
      access_token: token,
    });
  }
}
