import { EntityRepository, EntityManager } from "typeorm"
import { Document } from "../entities/Document"

type CreateDocument = {
  userId: bigint
  international: boolean
  name: string
  number: string
  complement: string
}

type GetDocuments = {
  perPage: number
  page: number
  userId: bigint
}

type UpdateDocument = {
  international: boolean
  name: string
  number: string
  complement: string
}

@EntityRepository(Document)
export class DocumentRepository {
  constructor(private manager: EntityManager) {}

  async index({ perPage, page, userId }: GetDocuments) {
    let documents = await this.manager.find(Document, {
      relations: ['user'],
      where: { user_id: Number(userId) },
      take: perPage,
      skip: perPage * (page - 1),
    })

    documents = documents.map(document => {
      delete document.user.password

      return document
    })

    const qtdDocuments = await this.manager
      .createQueryBuilder(Document, "user_id")
      .getCount()

    return {
      total: qtdDocuments,
      perPage,
      page,
      lastPage: Math.round(qtdDocuments / perPage),
      data: documents,
    }
  }

  async getWithoutUser(documentId: number, userId: bigint): Promise<Document> {
    return await this.manager.findOne(Document, documentId, {
      where: { user_id: Number(userId) }
    })
  }

  async findOneById(documentId: number): Promise<Document> {
    return await this.manager.findOne(Document, documentId)
  }

  async findOneByNumber(number: number): Promise<Document> {
    return await this.manager.findOne(Document, {
      where: { number: Number(number) }
    })
  }

  async show(documentId: bigint, userId: bigint): Promise<Document> {
    let document = await this.manager.findOne(Document, Number(documentId), {
      relations: ['user'],
      where: { user_id: Number(userId) }
    })

    if (!document) return

    delete document.user.password

    return document
  }

  async store({ userId, international, name, number, complement }: CreateDocument): Promise<Document | Error> {
    try {
      const document = this.manager.create(Document, {
        user_id: userId,
        international,
        name,
        number,
        complement
      })

      await this.manager.save(document)

      return document
    } catch (e) {
      return new Error(`Error create document: ${e}`)
    }
  }

  async update({ international, name, number, complement }: UpdateDocument, document: Document): Promise<Document | Error>  {
    try {
      document.international = international
      document.name = name
      document.number = number
      document.complement = complement

      await this.manager.save(document)

      return document
    } catch (e) {
      return new Error(`Error update document: ${e}`)
    }
  }

  async destroy(documentId: bigint) {
    await this.manager.delete(Document, documentId)
  }
}
