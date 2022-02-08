import { body, param, query } from "express-validator";
import { getCustomRepository } from "typeorm";
import { DocumentRepository } from "../repositories/DocumentRepository";

const validatorPaginateDocumentId = [
  query("page")
    .custom(async (value, { req }) => {
      if (!req.query.perPage) {
        return Promise.reject(`query 'perPage' must be any value`);
      }

      if (value <= 0) {
        return Promise.reject('Page mube be greater than zero');
      }
    }),

  query("perPage")
    .custom(async (value, { req }) => {
      if (!req.query.page && !!value) {
        return Promise.reject(`query 'page' must be any value`);
      }

      if (value <= 0) {
        return Promise.reject('Per page mube be greater than zero');
      }
    })
]

const validatorDocumentId = [
  param("id").custom(async value => {
    const repository = getCustomRepository(DocumentRepository)

    return repository.findOneById(value).then(document => {
      if (!document) {
        return Promise.reject('Document not exists');
      }
    })
  })
]

const typesOfNames = ['PASSPORT', 'RG', 'CNH', 'CPF']

const validatorCreateDocument = [
  body("international")
    .isBoolean()
    .withMessage("international must be false or true"),

  body("name")
    .custom((value) => typesOfNames.indexOf(value) >= 0)
    .exists({ checkFalsy: true })
    .withMessage(`name must contain any valid value, examples: ${typesOfNames.join(', ')}`),

  body("number")
    .custom(async value => {
      if (!value) {
        return Promise.reject('number must be contain any value')
      }

      const repository = getCustomRepository(DocumentRepository)

      return repository.findOneByNumber(value).then(document => {
        if (document) {
          return Promise.reject('Invalid number');
        }
      })
    }),

  body("complement")
    .optional({ checkFalsy: false })
];

const validatorUpdateDocument = [
  ...validatorDocumentId,
  ...validatorCreateDocument
]

export {
  validatorPaginateDocumentId,
  validatorDocumentId,
  validatorCreateDocument,
  validatorUpdateDocument
};
