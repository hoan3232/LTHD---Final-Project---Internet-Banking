import { Router } from "express";
import bcrypt from "bcrypt";
import { json } from "stream/consumers";
import userModel from "../models/user.model.js";
import { brotliCompressSync } from "zlib";

const router = Router();
router.get("/:id", async function (req, res) {
  const userId = req.params.id || 0;
  const list = await userModel.accountInfo(userId);
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
