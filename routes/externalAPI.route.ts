import express from "express";
import apiauth from "../middlewares/rsa.mdw.js";
import NodeRSA from "node-rsa";
import { prisma } from "../prisma/prisma.js";
const router = express.Router();

async function rsaKeys() {
  const keys = new NodeRSA({ b: 512 });
  keys.setOptions({ encryptionScheme: "pkcs1" });
  const publicKey = keys.exportKey("public");
  const privateKey = keys.exportKey("private");
  console.log("updating private keys");
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

router.get("/GetPublicKey", function (req, res) {
  res.status(201).json({
    publickey: rsaKeys(),
  });
});

router.get("/sends", apiauth, function (req, res) {
  const data = req.body.data;
  console.log(data);
});

export default router;
