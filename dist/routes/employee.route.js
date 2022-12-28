import { Router } from "express";
import employeeModel from "../models/employee.model.js";
const router = Router();
router.get("/all", async function (req, res) {
    const list = await employeeModel.all();
    res.status(201).json(list);
});
// router.get("/:name", async function (req, res) {
//     const userId = req.params.userId || 0;
//     const list = await userModel.findById(name);
//     res.status(201).json(list);
// });
export default router;
//# sourceMappingURL=user.route.js.map
//# sourceMappingURL=employee.route.js.map