import crypto from "crypto";

export default function (req, res, next) {
  let [hashValue, expires] = req.body.hash.split(".");
  // Check if expiry time has passed
  let now = Date.now();
  if (now > parseInt(expires))
    return res.status(200).json({
      status: false,
      Message: "Your OTP has expired, please try again",
    });
  // Calculate new hash with the same key and the same algorithm
  let data = `${req.body.email}.${req.body.otp}.${expires}`;
  let newCalculatedHash = crypto
    .createHmac("sha256", process.env.SECRETKEY)
    .update(data)
    .digest("hex");
  // Match the hashes
  if (!(newCalculatedHash === hashValue)) {
    return res.status(200).json({
      status: false,
      Message: "Invalid OTP, please try again",
    });
  }
  next();
}
