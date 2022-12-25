import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import "express-async-error";
dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(cors);
app.use(express.json());
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
//# sourceMappingURL=index.js.map