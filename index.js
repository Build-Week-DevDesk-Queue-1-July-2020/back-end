require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const port = process.env.PORT || 5000;
const cors = require("cors");

const userRouter = require("./routers/users/users-router");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", userRouter);
// server.use("/api/articles", restrict(), articlesRouter);

server.use((err, req, res, next) => {
    console.log(err);

    res.status(500).json({
        message: "Something went wrong",
    });
});

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
