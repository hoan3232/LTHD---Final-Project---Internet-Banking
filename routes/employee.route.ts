import { prisma } from "../prisma/prisma.js";
import * as bcrypt from "bcrypt";
import { Router } from "express";
import employeeModel, { authUser } from "../models/employee.model.js";
import { randomInt } from "crypto";

const router = Router();

router.post("/all", authUser, async function (req, res) {
  const list = await employeeModel.all();
  res.status(201).json(list);
});

router.post("/trans", authUser, async function (req, res) {
  const data = req.body
  const list = await employeeModel.findTransByMaNgGui(data);
  res.status(201).json(list);
});

router.post("/createUser", authUser, async function (req, res) {
  const user = req.body;
  user.Pass = bcrypt.hashSync(user.Pass, 10);
  await employeeModel.createUser(user);
  user.STK = randomInt(100000, 1000000).toString();
  const list = await employeeModel.createUserAccount(user);
  res.status(201).json(list);
});

// router.post("/createAccount", authUser, async function (req, res) {
//   const user = req.body;
//   const list = await employeeModel.createUserAccount(user);
//   res.status(201).json(list);
// });

router.put("/topupAccount", authUser, async function (req, res) {
  const data = req.body;
  const list = await employeeModel.topupAccount(data);
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
