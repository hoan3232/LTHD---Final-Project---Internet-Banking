import { Router } from "express";
import employeeModel from "../models/employee.model.js";
const router = Router();
router.get("/all", async function (req, res) {
    const list = await employeeModel.all();
    res.status(201).json(list);
});
router.get("/:name", async function (req, res) {
    const name = req.params.name || 0;
    const list = await employeeModel.findTransByMaNgGui(name);
    res.status(201).json(list);
});
router.post("/", async function (req, res) {
    const user = req.body;
    const list = await employeeModel.createUser(user);
    res.status(201).json(list);
});
router.put("/:id/:amount", async function (req, res) {
    const id = req.params.id || 0;
    const amount = req.params.amount || 0;
    const list = await employeeModel.topupAccount(id, amount);
    res.status(201).json(list);
});
export default router;
//# sourceMappingURL=user.route.js.map
//# sourceMappingURL=employee.route.js.map