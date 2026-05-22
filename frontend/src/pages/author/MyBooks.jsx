import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import PageWrapper from "../../components/ui/PageWrapper";
import EmptyState from "../../components/ui/EmptyState";
import { getMyBooks } from "../../api/bookApi";
import {
  FaBookOpen,
  FaMoneyBillWave,
  FaChartLine,
  FaBarcode
} from "react-icons/fa";

const MyBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await getMyBooks();
      setBooks(data.books || []);
    } catch (error) {
      console.error(error);
    }
  };

  if (!books.length) {
    return (
      <AppShell role="AUTHOR">
        <PageWrapper>
          <EmptyState
            title="No Books Found"
            subtitle="Your published books will appear here."
          />
        </PageWrapper>
      </AppShell>
    );
  }

  return (
    <AppShell role="AUTHOR">
      <PageWrapper>
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            My Books
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your published titles and royalty performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Cover */}
              <div className="h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center">
                <FaBookOpen className="text-white text-6xl opacity-90" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {book.title}
                </h2>

                <p className="text-slate-500 mb-5">
                  {book.genre}
                </p>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-700">
                    <FaBarcode className="text-blue-600" />
                    <span>ISBN: {book.isbn}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <FaChartLine className="text-emerald-600" />
                    <span>Copies Sold: {book.totalCopiesSold}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <FaMoneyBillWave className="text-purple-600" />
                    <span>
                      Royalty Earned: ₹{book.totalRoyaltyEarned}
                    </span>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-slate-500">
                        Paid
                      </p>
                      <p className="font-bold text-emerald-600">
                        ₹{book.royaltyPaid}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Pending
                      </p>
                      <p className="font-bold text-orange-500">
                        ₹{book.royaltyPending}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <span className="inline-flex px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                      {book.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageWrapper>
    </AppShell>
  );
};

export default MyBooks;