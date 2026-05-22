const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getMyBooks } = require("../controllers/bookController");

router.get(
  "/my-books",
  authMiddleware,
  roleMiddleware("AUTHOR"),
  getMyBooks
);

module.exports = router;