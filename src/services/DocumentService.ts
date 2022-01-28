import { DocumentRepository } from './../repositories/DocumentRepository';
import { getCustomRepository } from "typeorm"
import { Document } from '../entities/Document';
import { UserRepository } from '../repositories/UserRepository';

type CreateDocumentRequest = {
  userId: bigint
  international: boolean
  name: string
  number: string
  complement: string
}

type GetDocumentsRequest = {
  perPage: number
  page: number
  userId: bigint
}

type UpdateDocumentRequest = {
  userId: bigint
  documentId: number
  international: boolean
  name: string
  number: string
  complement: string
}

export class DocumentService {
  private repository = getCustomRepository(DocumentRepository)
  private userRepository = getCustomRepository(UserRepository)

  async index({ perPage, page, userId }: GetDocumentsRequest) {
    return await this.repository.index({ perPage, page, userId })
  }

  async show(documentId: bigint, userId: bigint): Promise<Document | Error> {
    const document = await this.repository.show(documentId, userId)

    if (!document) {
      return new Error("Document not exists")
    }

    return document
  }

  async store({ userId, international, name, number, complement }: CreateDocumentRequest): Promise<Document | Error> {
    const user = await this.userRepository.show(userId)

    if (!user) {
      return new Error("User not exists")
    }

    const result = await this.repository.store({
      userId,
      international,
      name,
      number,
      complement
    })

    return result
  }

  async update({ userId, documentId, international, name, number, complement }: UpdateDocumentRequest): Promise<Document | Error> {
    const document = await this.repository.getWithoutUser(documentId, userId)

    if (!document) {
      return new Error("Document not exists")
    }

    const user = await this.userRepository.show(document.user_id)

    if (!user) {
      return new Error("User not exists")
    }

    const result = await this.repository.update({
      international,
      name,
      number,
      complement
    }, document)

    if (result instanceof Error) {
      return result
    }

    return result
  }

  async destroy(documentId: bigint, userId: bigint) {
    const document =  await this.repository.show(documentId, userId)

    if (!document) {
      return new Error("Document not exists")
    }

    await this.repository.destroy(documentId)
  }
}
