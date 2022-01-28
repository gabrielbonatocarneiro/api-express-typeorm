import { Router } from "express"
import { UserController } from "./controllers/UserController"
import { DocumentController } from "./controllers/DocumentController"
import { AuthenticateController } from "./controllers/AuthenticateController"
import authMiddleware from "./middlewares/authMiddleware"

const routes = Router()

routes.post("/login", new AuthenticateController().login)

routes.get("/user", authMiddleware, new UserController().show)
routes.post("/user", new UserController().store)
routes.put("/user", authMiddleware, new UserController().update)
routes.delete("/user", authMiddleware, new UserController().destroy)

routes.get("/documents", authMiddleware, new DocumentController().index)
routes.get("/documents/:id", authMiddleware, new DocumentController().show)
routes.post("/documents", authMiddleware, new DocumentController().store)
routes.put("/documents/:id", authMiddleware, new DocumentController().update)
routes.delete("/documents/:id", authMiddleware, new DocumentController().destroy)

export { routes }
