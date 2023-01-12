import NodeRSA from "node-rsa";
import { prisma } from "../prisma/prisma.js";
function resDecrypt(text, key) {
  const privateKey = new NodeRSA(key);

  let decrypt = privateKey.decrypt(text, "utf8");
  return decrypt;
}

export default async function validationCheck(req, res, next) {
  if (Date.now() - res.time > 10000) {
    return res.status(200).json({ message: "Request timed out" });
  }
  const key = await prisma.mykeys.findUnique({
    where: {
      id: 1,
    },
  });
  const bank = await prisma.connectedBanks.findUnique({
    where: {
      id: req.body.id,
    },
  });
  if (!bank) {
    return res.status(401).json({ message: "Invalid request" });
  }

  if (!(bank.bankName === resDecrypt(req.body.BankHash, key.myprivatekey))) {
    return res.status(200).json({
      message:
        "Your bank is not connected to our, please make a connection request",
    });
  }
  if (!req.body.signatureHash) next();

  if (
    !(
      resDecrypt(req.body.signatureHash, key.myprivatekey) ===
      req.body.signature
    )
  ) {
    return res.status(200).json({
      message: "Signature has been modified!!!",
    });
  }

  next();
}
