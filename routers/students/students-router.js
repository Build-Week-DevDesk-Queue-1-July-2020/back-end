const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Students = require("./students-model");
// const restrict = require("../../middlewares/restrict");

const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
        const { name, cohort, email, password } = req.body;
        const student = await Students.findBy({ email }).first();

        if (student) {
            return res.status(409).json({
                message: "Email address is already taken",
            });
        }

        const newStudent = await Students.add({
            name,
            cohort,
            email,
            // hash the password with a time complexity of "14"
            password: await bcrypt.hash(password, 14),
        });

        res.status(201).json({
            message: "Successfully added new student.",
        });
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const student = await Students.findBy({ email }).first();

        console.log(student);

        if (!student) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        // hash the password again and see if it matches what we have in the database
        const passwordValid = await bcrypt.compare(password, student.password);

        if (!passwordValid) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        //console.log(student);

        const payload = {
            studentId: student.id,
            email: student.email,
        };

        res.json({
            student_id: student.id,
            message: `Welcome ${student.name}!`,
            token: jwt.sign(payload, process.env.JWT_SECRET),
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
