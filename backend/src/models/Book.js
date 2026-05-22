const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookId: String,
    title: String,
    isbn: String,
    genre: String,
    publicationDate: Date,
    status: String,
    mrp: Number,
    authorRoyaltyPerCopy: Number,
    totalCopiesSold: Number,
    totalRoyaltyEarned: Number,
    royaltyPaid: Number,
    royaltyPending: Number,
    lastRoyaltyPayoutDate: Date,
    printPartner: String,
    availableOn: [String],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Book", bookSchema);