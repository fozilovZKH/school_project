import { Router } from "express";
import { TeacherSubjectController } from "./teacherSubject.controller.js";
import { TeacherSubjectService } from "./teacherSubject.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();
const authorizationMiddleware = new AuthorizationMiddleware();
const teacherSubjectService = new TeacherSubjectService();
const teacherSubjectController = new TeacherSubjectController(
  teacherSubjectService
);

router.post(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    teacherSubjectController.insert(req, res);
  }
);

router.get(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    teacherSubjectController.getAll(req, res);
  }
);

router.get(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    teacherSubjectController.getById(req, res);
  }
);

router.put(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    teacherSubjectController.update(req, res);
  }
);

router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    teacherSubjectController.delete(req, res);
  }
);

export default { router };
