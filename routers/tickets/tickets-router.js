const express = require("express");
const Tickets = require("./tickets-model.js");
const Categories = require("../categories/categories-model.js");
const router = express.Router();

router.post("/:id/tickets", (req, res) => {
    const { title, description, what_ive_tried, category_id } = req.body;

    if (!title || !description || !what_ive_tried) {
        return res.status(404).json({
            message: "Missing required fields.",
        });
    }

    Tickets.add({
        student_id: req.params.id,
        title,
        description,
        what_ive_tried,
        category_id: category_id ? category_id : 0,
        helper_id: 0,
        status: "open",
    })
        .then((ticket) => {
            res.status(201).json({
                message: "Successfully added new ticket.",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Failed to create new ticket" });
        });
});

// router.get("/", (req, res) => {
//     Tickets.find()
//         .then((categories) => {
//             res.json(categories);
//         })
//         .catch((err) => {
//             res.status(500).json({ message: "Failed to get schemes" });
//         });
// });

router.put("/:id/tickets/:ticketId", (req, res) => {
    const changes = req.body;

    if (!changes.title || !changes.description || !changes.what_ive_tried) {
        return res.status(404).json({
            message: "Missing required fields.",
        });
    }

    Tickets.findById(req.params.ticketId)
        .then((ticket) => {
            if (ticket) {
                Tickets.update(changes, req.params.ticketId).then((ticket) => {
                    res.json({
                        message: `Successfully updated ticket.`,
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

// router.delete("/:id", (req, res) => {
//     const { id } = req.params;

//     Categories.remove(id)
//         .then((deleted) => {
//             if (deleted) {
//                 res.json({ message: "Successfully deleted category." });
//             } else {
//                 res.status(404).json({
//                     message: "Could not find category with given id",
//                 });
//             }
//         })
//         .catch((err) => {
//             res.status(500).json({ message: "Failed to delete category" });
//         });
// });

module.exports = router;
