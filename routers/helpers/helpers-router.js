const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Helpers = require("./helpers-model");
// const restrict = require("../../middlewares/restrict");

const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const helper = await Helpers.findBy({ email }).first();

        if (helper) {
            return res.status(409).json({
                message: "Email address is already taken",
            });
        }

        const newHelper = await Helpers.add({
            name,
            email,
            password: await bcrypt.hash(password, 14),
        });

        res.status(201).json({
            message: "Successfully added new helper.",
        });
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const helper = await Helpers.findBy({ email }).first();

        if (!helper) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        // hash the password again and see if it matches what we have in the database
        const passwordValid = await bcrypt.compare(password, helper.password);

        if (!passwordValid) {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }

        const payload = {
            helperId: helper.id,
            email: helper.email,
        };

        res.json({
            helper_id: helper.id,
            message: `Welcome ${helper.name}!`,
            token: jwt.sign(payload, process.env.JWT_SECRET),
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
