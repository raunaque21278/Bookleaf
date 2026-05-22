import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addInternalNote,
  adminReply,
  assignTicket,
  generateAIDraft,
  getAdmins,
  getTicketDetails,
  updateTicketStatus
} from "../../api/adminApi";
import AppShell from "../../components/layout/AppShell";
import PageWrapper from "../../components/ui/PageWrapper";
// import PageWrapper from "../../components/ui/PageWrapper";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const TicketDetails = () => {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [responses, setResponses] = useState([]);
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [admins, setAdmins] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    loadTicket();
    loadAdmins();
  }, []);

  useEffect(() => {
  if (chatRef.current) {
    chatRef.current.scrollTop =
      chatRef.current.scrollHeight;
  }
}, [responses]);

  const loadTicket = async () => {
    const data = await getTicketDetails(id);
    setTicket(data.ticket);
    setResponses(data.responses);
    setNotes(data.notes || []);
    setDraft(data.ticket.aiDraft || "");
  };

  const loadAdmins = async () => {
    const data = await getAdmins();
    setAdmins(data.admins);
  };

  const sendReply = async () => {
    if (!message.trim()) return;

    await adminReply(id, message);
    setMessage("");
    loadTicket();
  };

  const generateDraft = async () => {
    const data = await generateAIDraft(id);
    setDraft(data.draft);
    setMessage(data.draft);
  };

  const saveNote = async () => {
    if (!note.trim()) return;

    await addInternalNote(id, note);
    setNote("");
    loadTicket();
  };

  const assign = async (adminId) => {
    await assignTicket(id, adminId);
    loadTicket();
  };

  const changeStatus = async (status) => {
    await updateTicketStatus(id, status);
    loadTicket();
  };

  if (!ticket) return <LoadingSpinner />;

  return (
    <AppShell role="ADMIN">
      <PageWrapper>
        <div className="grid xl:grid-cols-3 gap-6">

          {/* CHAT */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {ticket.subject}
                </h1>

                <p className="text-slate-500">
                  {ticket.author?.name}
                </p>
              </div>

              <select
                onChange={(e) => changeStatus(e.target.value)}
                className="border rounded-xl px-4"
                value={ticket.status}
              >
                <option>OPEN</option>
                <option>IN_PROGRESS</option>
                <option>RESOLVED</option>
                <option>CLOSED</option>
              </select>
            </div>

            <div
  ref={chatRef}
  className="h-[600px] overflow-y-auto space-y-4"
>
              {responses.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.isAdmin
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-lg px-5 py-4 rounded-2xl ${
                      msg.isAdmin
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full border rounded-2xl p-4"
                placeholder="Type response..."
              />

              <button
                onClick={sendReply}
                className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-xl"
              >
                Send Reply
              </button>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">

            {/* AI */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-bold mb-4">
                AI Draft Assistant
              </h2>

              <button
                onClick={generateDraft}
                className="bg-purple-600 text-white px-4 py-2 rounded-xl mb-4"
              >
                Generate Draft
              </button>

              <div className="bg-slate-50 rounded-xl p-4 text-sm">
                {draft || "No draft generated yet"}
              </div>
            </div>

            {/* AUTHOR */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-bold mb-4">
                Author Details
              </h2>

              <p>Name: {ticket.author?.name}</p>
              <p>Email: {ticket.author?.email}</p>
              <p>Phone: {ticket.author?.phone}</p>
              <p>City: {ticket.author?.city}</p>
            </div>

            {/* BOOK */}
            {ticket.book && (
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-lg font-bold mb-4">
                  Book Details
                </h2>

                <p>Title: {ticket.book.title}</p>
                <p>ISBN: {ticket.book.isbn}</p>
                <p>Status: {ticket.book.status}</p>
              </div>
            )}

            {/* ASSIGN */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-bold mb-4">
                Assign Ticket
              </h2>

              <select
                onChange={(e) => assign(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option>Select Admin</option>

                {admins.map((admin) => (
                  <option key={admin._id} value={admin._id}>
                    {admin.name}
                  </option>
                ))}
              </select>
            </div>

            {/* NOTES */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-bold mb-4">
                Internal Notes
              </h2>

              <div className="space-y-2 mb-4">
                {notes.map((n) => (
                  <div
                    key={n._id}
                    className="bg-slate-100 p-3 rounded-xl text-sm"
                  >
                    {n.note}
                  </div>
                ))}
              </div>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full border rounded-xl p-3"
              />

              <button
                onClick={saveNote}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      </PageWrapper>
    </AppShell>
  );
};

export default TicketDetails;