import { Response } from "express"

export class ApiException extends Error {
  private response: Response

  constructor(response: Response) {
    super()
    this.response = response
  }

  handle(statusCode = 400, message = "", error = null) {
    console.error(`${statusCode} ERROR`, message)

    const obj = error ? { message, statusCode, error } : { message, statusCode }

    return this.response.status(statusCode).json(obj)
  }
}
