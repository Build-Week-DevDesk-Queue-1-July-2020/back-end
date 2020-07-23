const express = require("express");
const Categories = require("./categories-model.js");
const router = express.Router();

router.get("/", (req, res) => {
    Categories.find()
        .then((categories) => {
            res.json(categories);
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to get schemes" });
        });
});

router.post("/", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(404).json({
            message: "Missing required fields.",
        });
    }

    Categories.add({ name })
        .then((category) => {
            res.status(201).json({
                message: "Successfully added new category.",
            });
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to create new category" });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (!changes.name || !id) {
        return res.status(404).json({
            message: "Missing required fields.",
        });
    }

    Categories.findById(id)
        .then((category) => {
            if (category) {
                Categories.update(changes, id).then((category) => {
                    res.json({
                        message: `Successfully updated category.`,
                    });
                });
            } else {
                res.status(404).json({
                    message: "Could not find category with given id",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to update category" });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Categories.remove(id)
        .then((deleted) => {
            if (deleted) {
                res.json({ message: "Successfully deleted category." });
            } else {
                res.status(404).json({
                    message: "Could not find category with given id",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to delete category" });
        });
});

module.exports = router;
