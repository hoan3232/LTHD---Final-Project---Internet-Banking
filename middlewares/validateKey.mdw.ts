import sha256 from "sha256";
export default function (req, res, next) {
  const accessToken = req.body.token;
  const time = req.body.time;

  const key = time + req.baseUrl + process.env.SECRETKEY;
  if (sha256(key) === accessToken) {
    next();
  }
  return res.status(200).json({ message: "Invalid Scecret Key" });
}
