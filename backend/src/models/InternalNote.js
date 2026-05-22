const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    note: String,

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket"
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("InternalNote", noteSchema);