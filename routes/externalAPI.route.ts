import express from "express";
import apiauth from "../middlewares/rsa.mdw.js";
import NodeRSA from "node-rsa";
import { prisma } from "../prisma/prisma.js";
const router = express.Router();

async function rsaKeys() {
  const keys = new NodeRSA({ b: 512 });
  const publicKey = keys.exportKey("public");
  const privateKey = keys.exportKey("private");
  await prisma.mykeys.update({
    where: {
      id: 1,
    },
    data: {
      myprivatekey: privateKey,
    },
  });
  return publicKey;
}

router.get("/GetPublicKey", async function (req, res) {
  const key = await rsaKeys();

  res.status(201).json({
    publickey: key,
  });
});

router.post("/sends", apiauth, function (req, res) {
  const data = req.body.data;
  console.log(data);
  res.status(200).json({
    message: "Valid data",
  });
});

export default router;
