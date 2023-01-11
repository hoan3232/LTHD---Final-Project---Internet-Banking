import jwt from "jsonwebtoken";
export default (function (req, res, next) {
  const accessToken = req.body.token || req.headers["x-access-token"];
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.SECRETKEY);
      req.accessTokenPayload = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        message: "Invalid access token.",
      });
    }
  } else {
    return res.status(400).json({
      message: "Access token not found.",
    });
  }
});
