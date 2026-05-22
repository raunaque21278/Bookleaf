const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getAllTickets,
  getTicketDetailsAdmin,
  assignTicket,
  updateTicketStatus,
  adminReply,
  addInternalNote,
  getAdmins,
  generateDraftReply
} = require("../controllers/adminController");

router.use(authMiddleware);
router.use(roleMiddleware("ADMIN"));

router.get("/tickets", getAllTickets);
router.get("/tickets/:id", getTicketDetailsAdmin);

router.patch("/tickets/:id/assign", assignTicket);
router.patch("/tickets/:id/status", updateTicketStatus);

router.post("/tickets/:id/reply", adminReply);
router.post("/tickets/:id/notes", addInternalNote);
router.post("/tickets/:id/ai-draft", generateDraftReply);

router.get("/admins", getAdmins);

module.exports = router;