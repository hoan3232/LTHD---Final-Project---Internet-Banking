import { Router } from "express";
import bcrypt from "bcrypt";
import authMdw from "../middlewares/auth.mdw.js";
import userModel from "../models/user.model.js";

const router = Router();

router.get("/all", async function (req, res) {
  const list = await userModel.all();
  res.status(201).json(list);
});

router.get("/info/:id", async function (req, res) {
  const userId = req.params.id || 0;
  const list = await userModel.accountInfo(userId);
  if (list) {
    return res.status(201).json(list);
  }

  res.status(200).json({ message: "No account found" });
});

router.get("/history/:id", async function (req, res) {
  const userId = req.params.id || 0;
  const list = await userModel.transHistory(userId);
  res.status(201).json(list);
});

router.get("/receive/:id", async function (req, res) {
  const userId = req.params.id || 0;
  const list = await userModel.receiveHistory(userId);
  res.status(201).json(list);
});

router.post("/createContact", async function (req, res) {
  const contact = req.body;
  const list = await userModel.createContact(contact);
  res.status(201).json(list);
});

router.post("/status/:id", async function (req, res) {
  const userId = req.params.id || 0;
  const list = await userModel.accountStatus(userId);
  res.status(201).json(list);
});

router.post("/createNotice", async function (req, res) {
  const note = req.body;
  const list = await userModel.createNotice(note);
  res.status(201).json(list);
});

router.post("/notice/:id", async function (req, res) {
  const userId = req.params.id || 0;
  const list = await userModel.showNotice(userId);
  res.status(201).json(list);
});

router.post("/delete", async function (req, res) {
  const note = req.body;
  const list = await userModel.deleteNotice(note);
  res.status(201).json(list);
});

router.put("/payment", async function (req, res) {
  const payment = req.body;
  const temp = await userModel.payment(payment);

  if (temp) {
    const list = await userModel.noticeStatus(payment);
    res.status(201).json(list);
  }
});

router.post("/", async function (req, res) {
  const user = req.body;
  user.Pass = bcrypt.hashSync(user.password, 10);
  user.id = await userModel.addUser(user);
  delete user.Pass;
  res.status(201).json(user);
});

router.get("/savedList/:id", async function (req, res) {
  const savedList = await userModel.savedList(req.params.id);
  res.status(201).json(savedList);
});

export default router;
