require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const port = process.env.PORT || 5000;

const restrict = require("./middlewares/restrict");
const studentsAuthRouter = require("./routers/students/students-router");
const helpersAuthRouter = require("./routers/helpers/helpers-router");
const categoriesRouter = require("./routers/categories/categories-router");
const studentTicketsRouter = require("./routers/tickets/student-router");
const helperTicketsRouter = require("./routers/tickets/helper-router");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/auth/students", studentsAuthRouter);
server.use("/auth/helpers", helpersAuthRouter);
//server.use("/categories", restrict(), categoriesRouter);
server.use("/students", restrict(), studentTicketsRouter);
server.use("/helpers", restrict(), helperTicketsRouter);

server.use((err, req, res, next) => {
    console.log(err);

    res.status(500).json({
        message: "Something went wrong",
    });
});

if (!module.parent) {
    server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`);
    });
}

module.exports = server;
