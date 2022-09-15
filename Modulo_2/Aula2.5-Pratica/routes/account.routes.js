import express from "express";
import accountController from "../controllers/account.controller.js";

const router = express.Router();

router.post("/", accountController.createAccount);

router.get("/", accountController.getAccount)

router.get("/:id", accountController.getAccountId);

router.delete("/:id", accountController.deleteAccount);

//put substitui todo o body
router.put("/", accountController.updateAccount);

router.patch("/updateBalance", accountController.updateBalance);

router.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseUrl} ${err.message}`)
    res.status(400).send({ error: err.message });
})

export default router;