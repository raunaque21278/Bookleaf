import { FaInbox } from "react-icons/fa";

const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-12 text-center">
      <FaInbox className="mx-auto text-5xl text-slate-400 mb-4" />

      <h2 className="text-xl font-bold">{title}</h2>

      <p className="text-slate-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default EmptyState;