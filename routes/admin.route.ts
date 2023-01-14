import { prisma } from "../prisma/prisma.js";
import * as bcrypt from "bcrypt";
import { Router } from "express";
import adminModel from "../models/admin.model.js";

const router = Router();

router.get("/showEmp", async function (req, res) {
    const list = await adminModel.showEmplist();
    res.status(201).json(list);
});

router.post("/createEmp", async function (req, res) {
    const user = req.body;
    user.Pass = bcrypt.hashSync(user.Pass, 10);
    const list = await adminModel.createEmp(user);
    res.status(201).json(list);
});

router.delete("/deleteEmp", async function (req, res) {
    const user = req.body;
    const list = await adminModel.deleteEmp(user);
    res.status(201).json(list);
});

router.put("/updateEmp", async function (req, res) {
    const user = req.body;
    user.Pass = bcrypt.hashSync(user.Pass, 10);
    const list = await adminModel.updateEmp(user);
    res.status(201).json(list);
});

router.get("/showTransion", async function (req, res) {
    const list = await adminModel.showTrans();
    res.status(201).json(list);
});

router.post("/showBankTrans", async function (req, res) {
    const data = req.body;
    const list = await adminModel.showBankTrans(data);
    res.status(201).json(list);
});

router.post("/showTransTime", async function (req, res) {
    const data = req.body;
    data.time1 = new Date(data.time1);
    data.time2 = new Date(data.time2);
    const list = await adminModel.showTransTime(data);
    res.status(201).json(list);
});

export default router;