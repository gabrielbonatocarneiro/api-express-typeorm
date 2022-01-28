import { UserService } from './../services/UserService';
import { Request, Response } from "express"
import { ApiException } from "../exceptions/ApiException"
import jwt from 'jsonwebtoken';

export class AuthenticateController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const result = await new UserService().login({ email, password })

    if (result instanceof Error) {
      return new ApiException(response).handle(400, result.message)
    }

    const token = jwt.sign({ id: result.user_id }, process.env.JWT_HASH_TOKEN, { expiresIn: '1h' })

    delete result.password

    return response.json({
      user: result,
      access_token: token
    })
  }
}
