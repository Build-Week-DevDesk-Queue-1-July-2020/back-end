const express = require("express");
const Tickets = require("./student-model.js");
// const Categories = require("../categories/categories-model.js");
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

router.delete("/:id/tickets/:ticketId", (req, res) => {
    Tickets.remove(req.params.ticketId)
        .then((deleted) => {
            if (deleted) {
                res.json({ message: "Successfully deleted ticket." });
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

router.get("/:id/tickets", (req, res) => {
    Tickets.findBy({
        student_id: req.params.id,
        status: "open",
    }).then((tickets) => {
        if (tickets) {
            res.json(tickets);
        } else {
            res.status(404).json({
                message: "Could not find any tickets with given id",
            });
        }
    });
});

router.get("/:id/tickets/:ticketId", (req, res) => {
    Tickets.findByIdParam(req.params.ticketId, req.params.id).then(
        (tickets) => {
            if (tickets) {
                res.json(tickets);
            } else {
                res.status(404).json({
                    message: "Could not find any tickets with given id",
                });
            }
        }
    );
});

router.get("/:id/tickets/category/:categoryId", (req, res) => {
    Tickets.findBy({
        student_id: req.params.id,
        category_id: req.params.categoryId,
        status: "open",
    }).then((tickets) => {
        if (tickets) {
            res.json(tickets);
        } else {
            res.status(404).json({
                message: "Could not find any tickets with given id",
            });
        }
    });
});

module.exports = router;
