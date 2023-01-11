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
  const accessToken = jwt.sign(
    {
      userId: user.Id,
    },
    "SECRET_KEY",
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
  const { userId }: any = jwt.verify(accessToken, "SECRET_KEY", {
    ignoreExpiration: true,
  });
  const ret = await userModel.isValidRefreshToken(userId, refreshToken);
  if (ret === true) {
    const newAccessToken = jwt.sign({ userId }, "SECRET_KEY", {
      expiresIn: 60 * 10,
    });
    return res.json({
      accessToken: newAccessToken,
    });
  }
  res.status(400).json({
    message: "Invalid refresh token.",
  });
});
export default router;
