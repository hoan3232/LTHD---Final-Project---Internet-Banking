import NodeRSA from "node-rsa";
import { prisma } from "../prisma/prisma.js";
function resDecrypt(text, key) {
  const privateKey = new NodeRSA(key);
  let decrypt = privateKey.decrypt(text, "utf8");
  return decrypt;
}

export default async function validationCheck(req, res, next) {
  // if (Date.now() - res.time > 1000)
  //   return res.status(200).json({ message: "Request timed out" });
  const key = await prisma.mykeys.findUnique({
    where: {
      id: 1,
    },
  });
  console.log(key.myprivatekey);
  console.log(resDecrypt(req.body.BankHash, key.myprivatekey));
  const bank = await prisma.connectedBanks.findUnique({
    where: {
      id: req.body.id,
    },
  });
  if (!bank) return res.status(200).json({ message: "Invalid request" });

  // if (!(bank.bankName === resDecrypt(res.body.BankHash)))
  //   return res.status(200).json({ message: "Bank is not connected" });
  // req.body.data = resDecrypt(req.body.data);
  next();
}
