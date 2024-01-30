import { Router } from "express";
import { RoomController } from "./room.controller.js";
import { RoomService } from "./room.service.js";
import { SchoolService } from "../school/school.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const roomService = new RoomService();
const schoolService = new SchoolService();
const roomController = new RoomController(roomService, schoolService);

router.get("/", (req, res) => {
  roomController.getAll(req, res);
});
router.post("/", (req, res) => {
  roomController.create(req, res);
});
router.get(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    roomController.getRoomById(req, res);
  }
);
router.put("/:id", (req, res) => {
  roomController.updateRoomById(req, res);
});
router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    roomController.deleteRoomById(req, res);
  }
);

export default { router };
