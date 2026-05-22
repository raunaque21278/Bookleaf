import { useEffect, useState } from "react";
import { getMyBooks } from "../../api/bookApi";
import { createTicket } from "../../api/ticketApi";
import AppShell from "../../components/layout/AppShell";
import PageWrapper from "../../components/ui/PageWrapper";
import toast from "react-hot-toast";

const CreateTicket = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    description: "",
    bookId: ""
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await getMyBooks();
    setBooks(data.books);
  };

  const submit = async (e) => {
    e.preventDefault();

    await createTicket(form);

    toast.success("Ticket created successfully");

    setForm({
      subject: "",
      description: "",
      bookId: ""
    });
  };

  return (
    <AppShell role="AUTHOR">
      <PageWrapper>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
          <h1 className="text-3xl font-bold mb-6">
            Raise Support Ticket
          </h1>

          <form onSubmit={submit}>
            <select
              value={form.bookId}
              onChange={(e) =>
                setForm({ ...form, bookId: e.target.value })
              }
              className="w-full border p-4 rounded-xl mb-4"
            >
              <option value="">General Inquiry</option>

              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              ))}
            </select>

            <input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              className="w-full border p-4 rounded-xl mb-4"
            />

            <textarea
              placeholder="Describe your issue"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
              className="w-full border p-4 rounded-xl h-40 mb-4"
            />

            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl">
              Submit Ticket
            </button>
          </form>
        </div>
      </PageWrapper>
    </AppShell>
  );
};

export default CreateTicket;