import { Router } from "express";
import { GroupController } from "./group.controller.js";
import { GroupService } from "./group.service.js";
import { UserService } from "../user/user.service.js";
import { BrandService } from "../brand/brand.service.js";
import { RoomService } from "../room/room.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const groupService = new GroupService();
const userService = new UserService();
const brandService = new BrandService();
const roomService = new RoomService()
const groupController = new GroupController(groupService, userService, brandService, roomService);

router.get("/", (req, res) => {
  groupController.getAll(req, res);
});
router.post("/", (req, res) => {
  groupController.create(req, res);
});
router.get(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    groupController.getById(req, res);
  }
);
router.put("/:id", (req, res) => {
  groupController.updateById(req, res);
});
router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    groupController.deleteById(req, res);
  }
);

export default { router };
