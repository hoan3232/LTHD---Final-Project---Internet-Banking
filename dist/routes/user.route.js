import { Router } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
const router = Router();
router.get("/:userId", async function (req, res) {
    const userId = req.params.userId || 0;
    const list = await userModel.findById(userId);
    res.status(201).json(list);
});
router.post("/", async function (req, res) {
    const user = req.body;
    user.Pass = bcrypt.hashSync(user.password, 10);
    user.id = await userModel.addUser(user);
    delete user.Pass;
    res.status(201).json(user);
});
export default router;
//# sourceMappingURL=user.route.js.map