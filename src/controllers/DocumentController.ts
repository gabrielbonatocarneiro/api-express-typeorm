import { Request, Response } from "express"
import { ApiException } from "../exceptions/ApiException"
import { DocumentService } from "../services/DocumentService"

export class DocumentController {
  async index(request: Request, response: Response) {
    const userId = request.userId
    const perPage = parseInt(`${request.query.perPage}`, 10) || 20
    const page = parseInt(`${request.query.page}`, 10) || 1

    const documents = await new DocumentService().index({ perPage, page, userId })

    return response.json(documents)
  }

  async show(request: Request, response: Response) {
    const userId = request.userId
    const documentId = BigInt(request.params.id)

    const result = await new DocumentService().show(documentId, userId)

    if (result instanceof Error) {
      return new ApiException(response).handle(400, result.message)
    }

    return response.json(result)
  }

  async store(request: Request, response: Response) {
    const userId = request.userId
    const { international, name, number, complement } = request.body

    let result = await new DocumentService().store({
      userId,
      international,
      name,
      number,
      complement
    })

    if (result instanceof Error) {
      return new ApiException(response).handle(400, result.message)
    }

    return response.json({
      ...result,
      user_id: Number(result.user_id)
    })
  }

  async update(request: Request, response: Response) {
    const userId = request.userId
    const documentId = parseInt(request.params.id, 10)
    const { international, name, number, complement } = request.body

    const result = await new DocumentService().update({
      userId,
      documentId,
      international,
      name,
      number,
      complement,
    })

    if (result instanceof Error) {
      return new ApiException(response).handle(400, result.message)
    }

    return response.json(result)
  }

  async destroy(request: Request, response: Response) {
    const userId = request.userId
    const documentId = BigInt(request.params.id)

    const result = await new DocumentService().destroy(documentId, userId)

    if (result && result instanceof Error) {
      return new ApiException(response).handle(400, result.message)
    }

    return response.json({
      message: 'Document removed successfully'
    })
  }
}
