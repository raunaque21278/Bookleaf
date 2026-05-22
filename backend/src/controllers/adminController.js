const Ticket = require("../models/Ticket");
const TicketResponse = require("../models/TicketResponse");
const InternalNote = require("../models/InternalNote");
const User = require("../models/User");
const { regenerateDraft } = require("../services/aiService");
const { getIO } = require("../sockets/socketManager");

const getAllTickets = async (req, res, next) => {
  try {
    const { status, category, priority, assignedTo } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tickets = await Ticket.find(filter)
      .populate("author", "name email")
      .populate("book")
      .populate("assignedTo", "name email")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      tickets
    });
  } catch (error) {
    next(error);
  }
};

const getTicketDetailsAdmin = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("author", "name email phone city")
      .populate("book")
      .populate("assignedTo", "name email");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    const responses = await TicketResponse.find({
      ticket: ticket._id
    }).sort({ createdAt: 1 });

    const notes = await InternalNote.find({
      ticket: ticket._id
    }).populate("admin", "name email");

    res.json({
      success: true,
      ticket,
      responses,
      notes
    });
  } catch (error) {
    next(error);
  }
};

const assignTicket = async (req, res, next) => {
  try {
    const { adminId } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo: adminId },
      { new: true }
    ).populate("assignedTo", "name email");

    const io = getIO();

    io.to(`ticket-${ticket._id}`).emit("ticket-assigned", ticket);
    io.to("admin-room").emit("ticket-updated", ticket._id);

    res.json({
      success: true,
      ticket
    });
  } catch (error) {
    next(error);
  }
};

const updateTicketStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    const io = getIO();

    io.to(`ticket-${ticket._id}`).emit("status-updated", ticket);
    io.to("admin-room").emit("ticket-updated", ticket._id);

    res.json({
      success: true,
      ticket
    });
  } catch (error) {
    next(error);
  }
};

const adminReply = async (req, res, next) => {
  try {
    const { message } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    const response = await TicketResponse.create({
      ticket: ticket._id,
      message,
      isAdmin: true
    });

    const io = getIO();

    io.to(`ticket-${ticket._id}`).emit("new-message", response);
    io.to("admin-room").emit("ticket-updated", ticket._id);

    res.status(201).json({
      success: true,
      response
    });
  } catch (error) {
    next(error);
  }
};

const addInternalNote = async (req, res, next) => {
  try {
    const { note } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    const internalNote = await InternalNote.create({
      note,
      ticket: ticket._id,
      admin: req.user._id
    });

    res.status(201).json({
      success: true,
      note: internalNote
    });
  } catch (error) {
    next(error);
  }
};

const getAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({
      role: "ADMIN"
    }).select("name email");

    res.json({
      success: true,
      admins
    });
  } catch (error) {
    next(error);
  }
};
const generateDraftReply = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("author")
      .populate("book");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    const draft = await regenerateDraft({
  ticket,
  author: ticket.author,
  book: ticket.book
});

ticket.aiDraft = draft;
await ticket.save();

    res.json({
      success: true,
      draft
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTickets,
  getTicketDetailsAdmin,
  assignTicket,
  generateDraftReply,
  updateTicketStatus,
  adminReply,
  addInternalNote,
  getAdmins
};