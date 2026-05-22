import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AppShell = ({ children, role }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        role={role}
        open={open}
        setOpen={setOpen}
      />

      <div className="flex-1 p-4 md:p-8">
        <Header setOpen={setOpen} />

        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppShell;