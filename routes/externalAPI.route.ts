import express from "express";
const router = express.Router();

router.get("/GetPublicKey", function (req, res) {
  res.status(201).json({
    package: process.env.PUBLICKEY,
  });
});

router.put("/sends", function (req, res) {
  const body = req.body;
});

export default router;
