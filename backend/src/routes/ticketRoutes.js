const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createTicket,
  getMyTickets,
  getTicketById,
  replyToTicket
} = require("../controllers/ticketController");

router.use(authMiddleware);
router.use(roleMiddleware("AUTHOR"));

router.post("/", createTicket);
router.get("/", getMyTickets);
router.get("/:id", getTicketById);
router.post("/:id/reply", replyToTicket);

module.exports = router;