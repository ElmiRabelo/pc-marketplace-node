import { Router } from "express";

//middlewares
import authMiddleware from "./app/middlewares/auth";

//controllers
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import AdController from "./app/controllers/AdController";

const routes = Router();

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

/////////////////////////////////////////////////////////////////
// ADS

routes.get("/ads", AdController.index);
routes.get("/ads/:id", AdController.show);
routes.post("/ads", AdController.store);
routes.put("/ads/:id", AdController.update);
routes.delete("/ads/:id", AdController.destroy);

export default routes;
