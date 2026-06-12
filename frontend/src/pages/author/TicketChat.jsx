import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicketById, replyToTicket } from "../../api/ticketApi";
import AppShell from "../../components/layout/AppShell";
import PageWrapper from "../../components/ui/PageWrapper";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const TicketChat = () => {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [responses, setResponses] = useState([]);
  const [message, setMessage] = useState("");

  const chatRef = useRef(null);

  useEffect(() => {
    loadTicket();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [responses]);

  const loadTicket = async () => {
    const data = await getTicketById(id);
    setTicket(data.ticket);
    setResponses(data.responses);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    await replyToTicket(id, message);
    setMessage("");
    loadTicket();
  };

  if (!ticket) return <LoadingSpinner />;

  return (
    <AppShell role="AUTHOR">
      <PageWrapper>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <h1 className="text-2xl font-bold mb-6">
              {ticket.subject}
            </h1>

            <div
              ref={chatRef}
              className="h-[500px] overflow-y-auto space-y-4"
            >
              {responses.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.isAdmin
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-md px-5 py-4 rounded-2xl ${
                      msg.isAdmin
                        ? "bg-slate-200"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border p-4 rounded-xl"
                placeholder="Type your message..."
              />

              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-8 rounded-xl"
              >
                Send
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
              Ticket Insights
            </h2>

            {/* <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Category: {ticket.category}</p>

            {ticket.aiDraft && (
              <div className="mt-6 bg-blue-50 p-4 rounded-xl">
                <h3 className="font-bold mb-2">
                  AI Suggestion
                </h3>

                <p>{ticket.aiDraft}</p>
              </div>
            )} */}
          </div>
        </div>
      </PageWrapper>
    </AppShell>
  );
};

export default TicketChat;
