const Book = require("../models/Book");

const getMyBooks = async (req, res, next) => {
  try {
    const books = await Book.find({
      author: req.user._id
    });

    res.json({
      success: true,
      books
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyBooks
};