import { Router } from "express";
import userModel from "../models/user.model.js";
const router = Router();
router.get("/:userId", async function (req, res) {
    const userId = req.params.userId || 0;
    const list = await userModel.findById(userId);
    res.status(201).json(list);
});
router.get("/:name", async function (req, res) {
    const userId = req.params.userId || 0;
    const list = await userModel.findById(name);
    res.status(201).json(list);
});
export default router;
//# sourceMappingURL=user.route.js.map