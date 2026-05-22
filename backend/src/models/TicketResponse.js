const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    message: String,

    isAdmin: Boolean,

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("TicketResponse", responseSchema);