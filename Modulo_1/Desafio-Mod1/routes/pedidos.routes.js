import express from "express";
import pedidosController from "../controllers/pedidos.controller.js";

const router = express.Router();

router.get("/", pedidosController.getPedidos);
router.post("/", pedidosController.criarPedido);
router.patch("/updatePedido", pedidosController.updatePedido);
router.patch("/updateStatus", pedidosController.updateStatus);
router.delete("/:id", pedidosController.deletarPedido);
router.get("/:id", pedidosController.getPedidoId);
router.get("/totalCliente", pedidosController.totalCliente);
router.get("/totalPedidosProduto", pedidosController.getValorTotalPedidos);
router.get("/maisVendido", pedidosController.getMaisVendidos);

router.use((error, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseUrl} ${error.message}`)
    res.status(400).send({ error: error.message });
})

export default router;