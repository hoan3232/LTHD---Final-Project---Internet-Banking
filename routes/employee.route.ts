import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma.js";
import { Router } from "express";
import employeeModel, { authUser } from "../models/employee.model.js";
import { appendFile } from "fs";
const router = Router();

router.get("/all", authUser, async function (req, res) {
  const list = await employeeModel.all();
  res.status(201).json(list);
});

router.get("/:name", authUser, async function (req, res) {
  const name = req.params.name || 0;
  const list = await employeeModel.findTransByMaNgGui(name);
  res.status(201).json(list);
});

router.post("/createUser", authUser, async function (req, res) {
  const user = req.body;
  const list = await employeeModel.createUser(user);
  res.status(201).json(list);
});

router.post("/createAccount", authUser, async function (req, res) {
  const user = req.body;
  const list = await employeeModel.createUserAccount(user);
  res.status(201).json(list);
});

router.put("/:id/:amount", authUser, async function (req, res) {
  const id = req.params.id || 0;
  const amount = req.params.amount || 0;
  const list = await employeeModel.topupAccount(id, amount);
  res.status(201).json(list);
});

export async function setUser(req, res, next) {
  const userId = req.body.userId || "";
  var temp = userId.substring(0, 3);
  const verify = "emp";
  if (userId && temp === verify) {
    req.user = await prisma.dS_TK.findUnique({
      where: {
        Id: userId,
      },
    });
  }

  next();
}

export default router;
