import { Router } from "express";
import { LessonController } from "./lesson.controller.js";
import { LessonService } from "./lesson.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();
const authorizationMiddleware = new AuthorizationMiddleware();
const lessonService = new LessonService();
const lessonController = new LessonController(lessonService);

router.post(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    lessonController.insert(req, res);
  }
);

router.get(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    lessonController.getAll(req, res);
  }
);

router.get(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    lessonController.getById(req, res);
  }
);

router.put(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    lessonController.update(req, res);
  }
);

router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    lessonController.delete(req, res);
  }
);

export default { router };
