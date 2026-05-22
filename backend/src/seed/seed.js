const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const User = require("../models/User");
const Book = require("../models/Book");

const sampleData = require("../../bookleaf_sample_data.json");

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Book.deleteMany();

    const adminPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "BookLeaf Admin",
      email: "admin@bookleaf.com",
      password: adminPassword,
      role: "ADMIN"
    });

    for (const author of sampleData.authors) {
      const hashedPassword = await bcrypt.hash("author123", 10);

      const createdAuthor = await User.create({
        name: author.name,
        email: author.email,
        password: hashedPassword,
        role: "AUTHOR",
        phone: author.phone,
        city: author.city,
        joinedDate: author.joined_date
      });

      for (const book of author.books) {
        await Book.create({
          bookId: book.book_id,
          title: book.title,
          isbn: book.isbn,
          genre: book.genre,
          publicationDate: book.publication_date,
          status: book.status,
          mrp: book.mrp,
          authorRoyaltyPerCopy: book.author_royalty_per_copy,
          totalCopiesSold: book.total_copies_sold,
          totalRoyaltyEarned: book.total_royalty_earned,
          royaltyPaid: book.royalty_paid,
          royaltyPending: book.royalty_pending,
          lastRoyaltyPayoutDate: book.last_royalty_payout_date,
          printPartner: book.print_partner,
          availableOn: book.available_on,
          author: createdAuthor._id
        });
      }
    }

    console.log("Seed complete");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();