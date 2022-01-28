import { Request, Response } from "express"
import { ApiException } from "../exceptions/ApiException"
import { UserService } from "../services/UserService"

export class UserController {
  async show(request: Request, response: Response) {
    const userId = request.userId
    const result = await new UserService().show(userId)

    if (result instanceof Error) {
      return new ApiException(response).handle(400, result.message)
    }

    return response.json(result)
  }

  async store(request: Request, response: Response) {
    const { name, email, password } = request.body

    const result = await new UserService().store({
      name,
      email,
      password,
    })

    if (result instanceof Error) {
      return new ApiException(response).handle(400, result.message)
    }

    return response.json(result)
  }

  async update(request: Request, response: Response) {
    const userId = request.userId
    const { name, email, oldPassword, newPassword } = request.body

    const result = await new UserService().update({
      userId,
      name,
      email,
      oldPassword,
      newPassword,
    })

    if (result instanceof Error) {
      return new ApiException(response).handle(400, result.message)
    }

    return response.json(result)
  }

  async destroy(request: Request, response: Response) {
    const userId = request.userId

    const result = await new UserService().destroy(userId)

    if (result && result instanceof Error) {
      return new ApiException(response).handle(400, result.message)
    }

    return response.json({
      message: 'User removed successfully'
    })
  }
}
