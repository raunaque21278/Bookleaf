import { motion } from "framer-motion";

const StatCard = ({ title, value, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className="text-3xl text-blue-600">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;