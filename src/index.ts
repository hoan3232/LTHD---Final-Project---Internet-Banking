import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import "express-async-error";
import * as bcrypt from "bcrypt";
import user from "../routes/user.route.js";
import authmdw from "../middlewares/auth.mdw.js";
import auth from "../routes/auth.route.js";
import externalAPI from "../routes/externalAPI.route.js";
import employee, { setUser } from "../routes/employee.route.js";

dotenv.config();
// Init and setup Express
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(setUser);
const hash = bcrypt.compareSync(
  "a1234",
  "$2b$10$xS.t8CqPapoWZsFfRwKjTuMmg.hjajEJa2upsa12SmJI9Xve.JNe2"
);
console.log(hash);
//Routes setup
app.use("/users", user);
app.use("/employee", employee);
app.use("/auth", auth);
app.use("/API", externalAPI);
//Miscellaneous
app.listen(process.env.PORT, function () {
  console.log("Server is running with nodemon and TS");
});

app.use(function (req, res, next) {
  res.status(404).send({
    error_message: "Endpoint not found!",
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    error_message: "Something broke!",
  });
});
