import * as express from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as randomstring from "randomstring";
import userModel from "../models/user.model.js";
import rfTokenSchema from "../schema/rfToken.json" assert { type: "json" };
import validate from "../middlewares/validate.mdw.js";

const router = express.Router();
router.post("/", async function (req, res) {
  const user = await userModel.findById(req.body.username);
  if (user === null) {
    return res.json({
      authenticated: false,
    });
  }
  if (!bcrypt.compareSync(req.body.password, user.Pass)) {
    return res.json({
      authenticated: false,
    });
  }
  const So_DuString = user.TK_TT.So_Du.toString();
  const accessToken = jwt.sign(
    {
      userId: user.Id,
      stk: user.TK_TT.STK,
      Name: user.Ten_Goi_Nho || user.Ten_DK,
      SoDu: So_DuString,
    },
    process.env.SECRETKEY,
    {
      expiresIn: 10 * 60, // seconds
    }
  );
  const refreshToken = randomstring.generate();
  await userModel.updateRefreshToken(user.Id, refreshToken);
  res.json({
    authenticated: true,
    accessToken,
    refreshToken,
  });
});
router.post("/emp", async function (req, res) {
  const user = await userModel.findById(req.body.username);
  if (user === null) {
    return res.json({
      authenticated: false,
    });
  }
  if (!bcrypt.compareSync(req.body.password, user.Pass)) {
    return res.json({
      authenticated: false,
    });
  }
  if (!(user.Id.substring(0, 3) === "emp")) {
    return res.json({
      authenticated: false,
    });
  }
  const accessToken = jwt.sign(
    {
      userId: user.Id,
      stk: "Không có",
      Name: user.Ten_Goi_Nho || user.Ten_DK,
      SoDu: 0,
    },
    process.env.SECRETKEY,
    {
      expiresIn: 10 * 60, // seconds
    }
  );
  const refreshToken = randomstring.generate();
  await userModel.updateRefreshToken(user.Id, refreshToken);
  res.json({
    authenticated: true,
    accessToken,
    refreshToken,
  });
});
router.post("/refresh", validate(rfTokenSchema), async function (req, res) {
  // req.body = {
  //   accessToken,
  //   refreshToken
  // }
  const { accessToken, refreshToken } = req.body;
  const { userId, stk, Name, SoDu }: any = jwt.verify(
    accessToken,
    "SECRET_KEY",
    {
      ignoreExpiration: true,
    }
  );
  const ret = await userModel.isValidRefreshToken(userId, refreshToken);
  if (ret === true) {
    const newAccessToken = jwt.sign(
      { userId, stk, Name, SoDu },
      process.env.SECRETKEY,
      {
        expiresIn: 60 * 10,
      }
    );
    return res.json({
      accessToken: newAccessToken,
    });
  }
  res.status(400).json({
    message: "Invalid refresh token.",
  });
});
export default router;
