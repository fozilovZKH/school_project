import { Router } from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { BrandService } from "../brand/brand.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const userService = new UserService();
const brandService = new BrandService();
const userController = new UserController(userService, brandService);

const authorizationMiddleware = new AuthorizationMiddleware();

router.post("/register", (req, res) => {
  userController.register(req, res);
});

router.get(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.getAll(req, res);
  }
);

router.post(
  "/login",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.login(req, res);
  }
);

router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.deleteById(req, res);
  }
)

router.put(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.updateById(req, res);
  }
)




export default { router };
