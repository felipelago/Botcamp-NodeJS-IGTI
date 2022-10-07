import express from "express";
import ServicoController from "../controllers/servico.controller.js"
const router = express.Router();

router.post("/", ServicoController.createServico);
router.put("/", ServicoController.updateServico);
router.delete("/:id", ServicoController.deleteServico);
router.get("/", ServicoController.getServicos);
router.get("/:id", ServicoController.getServicoById);

export default router;

