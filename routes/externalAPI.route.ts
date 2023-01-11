import express from "express";
import NodeRSA from "node-rsa";
import sha256 from "sha256";
const router = express.Router();

router.get("/GetAccountInfo", async function (req, res) {
  const body = req.body;
  const encode = sha256();
});

router.get("/GenerateKey", async function (req, res) {
  const key = new NodeRSA(process.env.PUBLICKEY);
  const data = req.body;
  return res.status(201).json(key.sign("data", "base64"));
});

export default router;
