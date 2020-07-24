const express = require("express");
const Tickets = require("./helper-model.js");
const router = express.Router();

router.put("/:id/tickets/:ticketId/:status", (req, res, next) => {
    Tickets.findById(req.params.ticketId)
        .then((ticket) => {
            if (ticket) {
                let statusText = "",
                    helper_id;

                switch (req.params.status) {
                    case "completed":
                        statusText = "completed";
                        helper_id = req.params.id;
                        break;
                    case "assigned":
                        statusText = "inprogress";
                        helper_id = req.params.id;
                        break;
                    case "open":
                        statusText = "open";
                        helper_id = 0;
                        break;
                    default:
                        statusText = ticket.status;
                        helper_id = ticket.helper_id;
                        break;
                }

                Tickets.update(
                    {
                        helper_id: helper_id,
                        status: statusText,
                    },
                    req.params.ticketId
                ).then((ticket) => {
                    res.json({
                        message: `Successfully updated ticket.`,
                    });
                });
            } else {
                res.status(404).json({
                    message: "Could not assigned ticket",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to update category" });
        });
});

router.get("/tickets", (req, res) => {
    Tickets.findBy({ status: "open" }).then((tickets) => {
        if (tickets) {
            res.json(tickets);
        } else {
            res.status(404).json({
                message: "Could not retrieve tickets",
            });
        }
    });
});

router.get("/tickets/:ticketId", (req, res) => {
    Tickets.findByIdParam(req.params.ticketId).then((tickets) => {
        if (tickets) {
            res.json(tickets);
        } else {
            res.status(404).json({
                message: "Could not find any tickets with given id",
            });
        }
    });
});

router.get("/tickets/status/:status", (req, res) => {
    Tickets.findBy({ status: req.params.status }).then((tickets) => {
        if (tickets) {
            res.json(tickets);
        } else {
            res.status(404).json({
                message: "Could not retrieve tickets",
            });
        }
    });
});

router.get("/tickets/category/:categoryId", (req, res) => {
    Tickets.findBy({
        category_id: req.params.categoryId,
        status: "open",
    }).then((tickets) => {
        if (tickets) {
            res.json(tickets);
        } else {
            res.status(404).json({
                message: "Could not find any tickets with category id",
            });
        }
    });
});

module.exports = router;
