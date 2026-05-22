const colors = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700"
};

const PriorityPill = ({ priority }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[priority]}`}
    >
      {priority}
    </span>
  );
};

export default PriorityPill;