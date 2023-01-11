import { Router } from "express";
import bcrypt from "bcrypt";
import authMdw from "../middlewares/auth.mdw.js";
import userModel from "../models/user.model.js";

const router = Router();

router.get("/all", async function (req, res) {
  const list = await userModel.all();
  res.status(201).json(list);
});

router.get("/:id", async function (req, res) {
  const userId = req.params.id || 0;
  const list = await userModel.accountInfo(userId);
  if (list) {
    return res.status(201).json(list);
  }

  res.status(200).json({ message: "No account found" });
});

router.post("/", async function (req, res) {
  const user = req.body;
  user.Pass = bcrypt.hashSync(user.password, 10);
  user.id = await userModel.addUser(user);
  delete user.Pass;
  res.status(201).json(user);
});

export default router;
