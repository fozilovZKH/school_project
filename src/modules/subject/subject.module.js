import { Router } from "express";
import { SubjectController } from "./subject.controller.js";
import { SubjectService } from "./subject.service.js";
import { BrandService } from "../brand/brand.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const subjectService = new SubjectService();
const brandService = new BrandService();
const subjectController = new SubjectController(subjectService, brandService);

router.get("/", (req, res) => {
  subjectController.getAll(req, res);
});
router.post("/", (req, res) => {
  subjectController.create(req, res);
});
router.get(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    subjectController.getById(req, res);
  }
);
router.put("/:id", (req, res) => {
  subjectController.updateById(req, res);
});
router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    subjectController.deleteById(req, res);
  }
);

export default { router };
