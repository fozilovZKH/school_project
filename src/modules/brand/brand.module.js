import { Router } from "express";
import { BrandController } from "./brand.controller.js";
import { BrandService } from "./brand.service.js";
import {AuthorizationMiddleware} from "../../middleware/authorization.js"

const router = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const brandService = new BrandService();
const brandController = new BrandController(brandService);

router.get("/", (req, res) => {
  brandController.getAll(req, res);
});
router.post("/",
(req, res) => {
  brandController.create(req, res);
});
router.get("/:id", (req, res) => {
  brandController.getBrandById(req, res);
});
router.put("/:id", (req, res) => {
  brandController.updateBrandById(req, res);
});
router.delete("/:id", (req, res) => {
  brandController.deleteBrandById(req, res);
});

export default { router };
