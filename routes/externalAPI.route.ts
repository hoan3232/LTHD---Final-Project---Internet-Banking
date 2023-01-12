import express from "express";
import apiauth from "../middlewares/rsa.mdw.js";
import NodeRSA from "node-rsa";
import { prisma } from "../prisma/prisma.js";
import userModel from "../models/user.model.js";
import crypto from "crypto";
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

router.post("/AccountInfo/:phone", apiauth, async function (req, res) {
  const account = await prisma.dS_TK.findUnique({
    where: {
      Phone: req.params.phone,
    },
    include: {
      TK_TT: {
        select: {
          STK: true,
        },
      },
    },
  });

  if (account)
    return res.status(200).json({
      message: account,
    });
});

router.post("/deposite/:phone/:amount", apiauth, async function (req, res) {
  const hash = crypto
    .createHash("sha256")
    .update(req.body.time + req.baseUrl + process.env.SECRETKEY)
    .digest("base64");
  if (!(hash === req.body.hmac)) {
    return res.status(401).json({
      message: "Access denied, data has been modified!!!!",
    });
  }

  if (parseInt(req.params.amount) < 0)
    return res.status(402).json({
      messsage: "Invalid Amount!",
    });

  const account = await userModel.accountInfoPhone(req.params.phone);
  if (!account)
    return res.status(402).json({
      messsage: "Account not found!",
    });

  userModel.depositViaPhone(req.params.phone, parseInt(req.params.amount));
});

router.post("/deposite/:stk/:amount", apiauth, async function (req, res) {
  const hash = crypto
    .createHash("sha256")
    .update(req.body.time + req.baseUrl + process.env.SECRETKEY)
    .digest("base64");
  if (!(hash === req.body.hmac)) {
    return res.status(401).json({
      message: "Access denied, data has been modified!!!!",
    });
  }

  if (parseInt(req.params.amount) < 0)
    return res.status(402).json({
      messsage: "Invalid Amount!",
    });

  const account = await userModel.accountInfoSTK(req.params.stk);
  if (!account)
    return res.status(402).json({
      messsage: "Account not found!",
    });

  userModel.depositViaSTK(req.params.stk, parseInt(req.params.amount));
});

// router.post("/RequestConnection", async function (req, res) {

// })
export default router;
