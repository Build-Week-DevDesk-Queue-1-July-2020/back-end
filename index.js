require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const port = process.env.PORT || 5000;
const cors = require("cors");

const restrict = require("./middlewares/restrict");
const studentsRouter = require("./routers/students/students-router");
const helpersRouter = require("./routers/helpers/helpers-router");
const categoriesRouter = require("./routers/categories/categories-router");
const ticketsRouter = require("./routers/tickets/tickets-router");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/auth/students", studentsRouter);
server.use("/auth/helpers", helpersRouter);
server.use("/categories", restrict(), categoriesRouter);
server.use("/students", restrict(), ticketsRouter);

server.use((err, req, res, next) => {
    console.log(err);

    res.status(500).json({
        message: "Something went wrong",
    });
});

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
