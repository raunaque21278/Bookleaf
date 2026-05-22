const Ticket = require("../models/Ticket");
const TicketResponse = require("../models/TicketResponse");
const Book = require("../models/Book");
const { analyzeTicket } = require("../services/aiService");
const { getIO } = require("../sockets/socketManager");

const createTicket = async (req, res, next) => {
  try {
    const { subject, description, bookId } = req.body;

    let selectedBook = null;

    if (bookId) {
      selectedBook = await Book.findOne({
        _id: bookId,
        author: req.user._id
      });

      if (!selectedBook) {
        return res.status(404).json({
          success: false,
          message: "Book not found"
        });
      }
    }

    const aiResult = await analyzeTicket({
      subject,
      description,
      author: req.user,
      book: selectedBook
    });

    const ticket = await Ticket.create({
      subject,
      description,
      author: req.user._id,
      book: selectedBook ? selectedBook._id : null,
      category: aiResult.category,
      priority: aiResult.priority,
      aiDraft: aiResult.draftResponse
    });

    await TicketResponse.create({
      ticket: ticket._id,
      message: description,
      isAdmin: false
    });

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate("author", "name email")
      .populate("book");

    const io = getIO();

    io.to("admin-room").emit("new-ticket", populatedTicket);

    res.status(201).json({
      success: true,
      ticket: populatedTicket
    });
  } catch (error) {
    next(error);
  }
};

const getMyTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({
      author: req.user._id
    })
      .populate("book")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      tickets
    });
  } catch (error) {
    next(error);
  }
};

const getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      author: req.user._id
    }).populate("book assignedTo");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    const responses = await TicketResponse.find({
      ticket: ticket._id
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      ticket,
      responses
    });
  } catch (error) {
    next(error);
  }
};

const replyToTicket = async (req, res, next) => {
  try {
    const { message } = req.body;

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      author: req.user._id
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    const response = await TicketResponse.create({
      ticket: ticket._id,
      message,
      isAdmin: false
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

module.exports = {
  createTicket,
  getMyTickets,
  getTicketById,
  replyToTicket
};