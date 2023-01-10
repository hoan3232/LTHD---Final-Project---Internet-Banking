import express from "express";
import RSA from "../middlewares/rsa.mdw.js";
const router = express.Router();

router.get("/keys", function (req, res) {
  const rsa = RSA.resKey();
  const dbSecretKey = rsa.privateKey;
  res.status(201).json({
    package: rsa.publicKey,
  });
});

router.put("/sends", function (req, res) {
  const body = req.body;
});
