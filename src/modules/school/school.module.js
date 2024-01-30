import { Router } from "express";
import { SchoolController } from "./school.controller.js";
import { SchoolService } from "./school.service.js";
import { BrandService } from "../brand/brand.service.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const schoolService = new SchoolService();
const brandService = new BrandService();
const schoolController = new SchoolController(schoolService, brandService);

router.get("/", (req, res) => {
  schoolController.getAll(req, res);
});
router.get("/:id", (req, res) => {
  schoolController.getSchoolById(req, res);
});
router.post("/", (req, res) => {
  schoolController.create(req, res);
});
router.put("/:id", (req, res) => {
  schoolController.updateById(req, res);
});
router.delete("/:id", (req, res) => {
  schoolController.deleteById(req, res);
});

export default { router };
