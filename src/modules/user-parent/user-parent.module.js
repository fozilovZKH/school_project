import { Router } from "express";
import { UserParentController } from "./user-parent.controller.js";
import { UserParentService } from "./user-parent.service.js";
import { UserService } from "../user/user.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const subjectService = new UserParentService();
const userService = new UserService();
const userParentController = new UserParentController(subjectService, userService);

router.get("/", (req, res) => {
  userParentController.getAll(req, res);
});
router.post("/", (req, res) => {
  userParentController.create(req, res);
});
router.get(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userParentController.getById(req, res);
  }
);
router.put("/:id", (req, res) => {
  userParentController.updateById(req, res);
});
router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userParentController.deleteById(req, res);
  }
);

export default { router };
