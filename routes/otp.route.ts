import express from "express";
import * as otpGenerator from "otp-generator";
import crypto from "crypto";
import checkOTP from "../middlewares/checkOTP.mdw.js";
import nodemailer from "nodemailer";
const router = express.Router();

function sendEmail(otp, mail) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "anhhoanp@gmail.com",
      pass: "hqbvaokbjeroswhn",
    },
  });
  var body =
    "HTD Bank: OTP: " +
    otp +
    ". This code will be expireed in 1 minute. Please use the verification code to confirm your transaction, DO NOT share your otp with others";
  var mailOptions = {
    from: "anhhoanp@gmail.com",
    to: mail,
    subject: "Sending Email using Node.js",
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

router.post("/sendOTP/:email", async function (req, res) {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  //send OTP to email
  sendEmail(otp, req.params.email);
  const ttl = 60 * 1000; //5 Minutes in miliseconds
  const expires = Date.now() + ttl;
  const data = `${req.params.email}.${otp}.${expires}`;
  const hash = crypto
    .createHmac("sha256", process.env.SECRETKEY)
    .update(data)
    .digest("hex");
  const fullHash = `${hash}.${expires}`;
  res.status(201).json({
    message: "OTP has been sent to your email!",
    hash: fullHash,
  });
});

router.post("/test", checkOTP, function (req, res) {
  res.status(201);
  return res.json({
    message: "OTP test passed !!!",
  });
});

export default router;
