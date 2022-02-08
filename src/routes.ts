import { Router } from "express";

import authMiddleware from "./middlewares/authMiddleware";

import { UserController } from "./controllers/UserController";
import { DocumentController } from "./controllers/DocumentController";
import { DocxTemplaterExample } from "./controllers/DocxTemplaterExample";
import { AuthenticateController } from "./controllers/AuthenticateController";

import { validatorLogin } from "./validators/validatorLogin";
import {
  validatorCreateUser,
  validatorUpdateUser,
} from "./validators/validatorUser";
import {
  validatorPaginateDocumentId,
  validatorDocumentId,
  validatorCreateDocument,
  validatorUpdateDocument
} from './validators/validatorDocument'

const routes = Router();

routes.post("/login", validatorLogin, new AuthenticateController().login);

routes.get("/user", authMiddleware, new UserController().show);
routes.post("/user", validatorCreateUser, new UserController().store);
routes.put("/user", validatorUpdateUser, authMiddleware, new UserController().update);
routes.delete("/user", authMiddleware, new UserController().destroy);

routes.get("/documents", validatorPaginateDocumentId, authMiddleware, new DocumentController().index);
routes.get("/documents/:id", validatorDocumentId, authMiddleware, new DocumentController().show);
routes.post("/documents", validatorCreateDocument, authMiddleware, new DocumentController().store);
routes.put("/documents/:id", validatorUpdateDocument, authMiddleware, new DocumentController().update);
routes.delete("/documents/:id", validatorDocumentId, authMiddleware, new DocumentController().destroy);

routes.post("/docx-templater-example1", new DocxTemplaterExample().example1);
routes.post("/docx-templater-example2", new DocxTemplaterExample().example2);

export { routes };
